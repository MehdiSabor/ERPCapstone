const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a Reglement
const createReglement = async (data) => {
    const transaction = await prisma.$transaction(async (tx) => {
      // Create the Reglement and set the registration date to current
      const reglement = await tx.reglement.create({
        data: {
          ...data,
          DATE_REG: new Date(), // Set the registration date to the current date
        },
      });
  
      // Update client's balance by decrementing the MNT_REGLER from SOLDE
      if (reglement) {
        await tx.client.update({
          where: { code_clt: reglement.CODE_CLT },
          data: { SOLDE: { decrement: reglement.MNT_REGLER } }
        });
      }
  
      return reglement;
    });
  
    return transaction;
  };
  

// Get a Reglement by its ID
const getReglementById = async (id) => {
  return await prisma.reglement.findUnique({
    where: { REF_REGV: id },
    include: { reglementdetails: true },
  });
};

// Update a Reglement
const updateReglement = async (id, data) => {
  return await prisma.reglement.update({
    where: { REF_REGV: id },
    data,
  });
};

// Delete a Reglement
const deleteReglement = async (id) => {
  const reglement = await prisma.reglement.findUnique({
    where: { REF_REGV: id },
    include: { reglementdetails: true },
  });
  
  // Update client's balance upon reglement deletion
  if (reglement) {
    await prisma.client.update({
      where: { code_clt: reglement.CODE_CLT },
      data: { SOLDE: { increment: reglement.MNT_REGLER } }
    });

    // Deleting reglement details
    await prisma.reglementDetail.deleteMany({ where: { REF_REGV: id } });
  }

  return await prisma.reglement.delete({ where: { REF_REGV: id } });
};

// List all Reglements
const getAllReglements = async () => {
  return await prisma.reglement.findMany({
    include: { reglementdetails: true },
  });
};

const createReglementDetailsBatch = async (regDetailsArray) => {
    const transaction = await prisma.$transaction(async (tx) => {
      const reglementDetails = [];
  
      for (const regDetailData of regDetailsArray) {
        const unified = await tx.unifiedFactureAvoir.findUnique({
          where: { REF_AV_FAC: regDetailData.REF_AV_FAC },
        });
  
        if (!unified) {
          throw new Error('UnifiedFactureAvoir not found for REF_AV_FAC: ' + regDetailData.REF_AV_FAC);
        }
  
        // Calculate remaining balance to be paid on the UnifiedFactureAvoir
        const remainingBalance = unified.MNT_TTC - unified.MNT_REGLER;
        
        // Determine the amount to register as paid
        let paymentAmount = regDetailData.MNT_REGLER;
        if (unified.TYPE === 'Facture' && paymentAmount > remainingBalance) {
          // If it's a facture and the payment amount exceeds the remaining balance,
          // adjust the payment amount to just clear the remaining balance
          paymentAmount = remainingBalance;
        }
  
        // Update UnifiedFactureAvoir MNT_REGLER
        await tx.unifiedFactureAvoir.update({
          where: { REF_AV_FAC: regDetailData.REF_AV_FAC },
          data: { MNT_REGLER: { increment: paymentAmount } },
        });
  
        // Create the ReglementDetail with the adjusted payment amount
        const regDetail = await tx.reglementDetail.create({
          data: {
            ...regDetailData,
            MNT_REGLER: paymentAmount, // Use the adjusted payment amount
          },
        });
  
        reglementDetails.push(regDetail);
      }
  
      return reglementDetails;
    });
  
    return transaction;
  };
  

module.exports = {
  createReglement,
  getReglementById,
  updateReglement,
  deleteReglement,
  getAllReglements,
  createReglementDetailsBatch,
};

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a Reglement
const createReglement = async (data) => {
    const transaction = await prisma.$transaction(async (tx) => {
        // Get the last reglement to determine the next REF_REGV
        const lastReglement = await tx.reglement.findFirst({
            orderBy: { DATE_REG: 'desc' },
        });

        let nextRefRegv;
        if (lastReglement) {
            const lastRefNumber = parseInt(lastReglement.REF_REGV.replace('REG', '')) || 0;
            nextRefRegv = `REG${(lastRefNumber + 1).toString().padStart(5, '0')}`;
        } else {
            nextRefRegv = 'REG00001'; // Default start if no reglement exists
        }

        // Create the Reglement with the new REF_REGV and set the registration date to current
        const reglement = await tx.reglement.create({
            data: {
                ...data,
                REF_REGV: nextRefRegv,
                DATE_REG: new Date(),
                remainingAmount:data.MNT_REGLER // Set the registration date to the current date
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
            MNT_REGLER: paymentAmount, 
            // Use the adjusted payment amount
          },
        });
  
        reglementDetails.push(regDetail);
      }
  
      return reglementDetails;
    });
  
    return transaction;
  };
  

  // Get all UnifiedFactureAvoir records
const getAllUnifiedFactureAvoir = async () => {
    return await prisma.unifiedFactureAvoir.findMany({
      include: {
        reglementDetails: true,  // Optionally include related reglement details
        client: true             // Optionally include related client data
      }
    });
  };

 
  const addDetailReglement = async (regDetailData) => {
    const transaction = await prisma.$transaction(async (tx) => {
      const unified = await tx.unifiedFactureAvoir.findUnique({
        where: { REF_AV_FAC: regDetailData.REF_AV_FAC },
      });
  
      if (!unified) {
        throw new Error('UnifiedFactureAvoir not found for REF_AV_FAC: ' + regDetailData.REF_AV_FAC);
      }
  
      const remainingAmountToRegister = unified.MNT_TTC - unified.MNT_REGLER;
  
      const reglement = await tx.reglement.findUnique({
        where: { REF_REGV: regDetailData.REF_REGV },
        include: { reglementdetails: true }
      });
  
      if (!reglement) {
        throw new Error('Reglement not found for REF_REGV: ' + regDetailData.REF_REGV);
      }
  
      const totalRegistered = reglement.reglementdetails.reduce((acc, detail) => acc + detail.MNT_REGLER, 0);
      const remainingReglementBalance = reglement.MNT_REGLER - totalRegistered;
  
      // Determine the actual amount to register, which is the lesser of the remaining amounts on both the reglement and the unified.
      const actualAmountToRegister = Math.min(remainingAmountToRegister, remainingReglementBalance, regDetailData.MNT_REGLER);
  
      
  
      // Update the UnifiedFactureAvoir MNT_REGLER
      await tx.unifiedFactureAvoir.update({
        where: { REF_AV_FAC: regDetailData.REF_AV_FAC },
        data: { MNT_REGLER: { increment: actualAmountToRegister } },
      });
  
      // Create the ReglementDetail with the adjusted MNT_REGLER
      const regDetail = await tx.reglementDetail.create({
        data: {
          ...regDetailData,
          MNT_REGLER: actualAmountToRegister,
          MNT_ORIGINAL: unified.MNT_TTC
        },
      });
  
      // Update remaining amount after adding the detail
      await updateRemainingAmount(tx, regDetailData.REF_REGV);
  
      return regDetail;
    });
  
    return transaction;
  };
  

 
const deleteReglementDetail = async (refRegV, refAvFac) => {
    const transaction = await prisma.$transaction(async (tx) => {
        // Correctly structure the compound unique query
        const regDetail = await tx.reglementDetail.findUnique({
            where: {
                REF_REGV_REF_AV_FAC: {
                    REF_REGV: refRegV,
                    REF_AV_FAC: refAvFac,
                }
            },
            include: {
                unifiedFactureAvoir: true // Only if needed for further operations
            }
        });

        if (!regDetail) {
            throw new Error('Reglement detail not found');
        }

        // If found, perform the deduction of the registered amount from the unified facture avoir
        await tx.unifiedFactureAvoir.update({
            where: { REF_AV_FAC: regDetail.REF_AV_FAC },
            data: { MNT_REGLER: { decrement: regDetail.MNT_REGLER } }
        });

        // Delete the reglement detail after adjusting the registered amount
        await tx.reglementDetail.delete({
            where: {
        REF_REGV_REF_AV_FAC: {
            REF_REGV: refRegV,
            REF_AV_FAC: refAvFac,
        }
    }
    });

    // Update remaining amount after deleting the detail
    await updateRemainingAmount(tx, refRegV);

    return { message: "Deleted successfully" };
  });

  return transaction;
};


async function updateRemainingAmount(tx, refRegv) {
    const reglement = await tx.reglement.findUnique({
      where: { REF_REGV: refRegv },
      include: { reglementdetails: true }
    });
  
    const totalRegistered = reglement.reglementdetails.reduce((acc, detail) => acc + detail.MNT_REGLER, 0);
    console.log(totalRegistered);
    const remainingAmount = reglement.MNT_REGLER - totalRegistered;
  
    await tx.reglement.update({
      where: { REF_REGV: refRegv },
      data: { remainingAmount }
    });
  }
  

  

module.exports = {
  createReglement,
  getReglementById,
  updateReglement,
  deleteReglement,
  getAllReglements,
  createReglementDetailsBatch,
  getAllUnifiedFactureAvoir ,
  addDetailReglement,
  deleteReglementDetail
};

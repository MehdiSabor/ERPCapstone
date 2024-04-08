const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createDevis = async (data) => {
  // Step 1: Create the Devis record without REF_DEV
  const devis = await prisma.devis.create({
    data: {
      ...data,
      REF_DEV: "", // Temporarily set to an empty string or some placeholder if required
    },
  });

  // Step 2: Generate the REF_DEV value based on the autoincremented id
  const refDevValue = `DV${String(devis.id).padStart(5, '0')}`; // Formats as DV00001, DV00002,...

  // Step 3: Update the record with the generated REF_DEV value
  const updatedDevis = await prisma.devis.update({
    where: { id: devis.id },
    data: { REF_DEV: refDevValue },
  });

  return updatedDevis;
};


const getDevisById = async (id) => {
    return await prisma.devis.findUnique({ where: { REF_DEV : id }});
  };

  const updateDevis = async (id, data) => {
    return await prisma.devis.update({
      where: { REF_DEV : id },
      data,
    });
  };

  const deleteDevis = async (id) => {
    return await prisma.devis.delete({ where: { REF_DEV : id } });
  };
  
  

  const validateDevis = async (refDevis) => {
    
      // Start the transaction
      const result = await prisma.$transaction(async (tx) => {
        // Fetch Devis including its details
        const devis = await tx.devis.findUnique({
          where: { REF_DEV: refDevis },
          include: { devisDetails: true },
        });
  
        if (!devis) {
          throw new Error('Devis not found');
        }
  
        // Update Devis as validated
        await tx.devis.update({
          where: { REF_DEV: refDevis },
          data: { VALIDER: true, DATEVALID: new Date() },
        });
  
        // Create Bonliv based on the Devis
        const bonliv = await tx.bonliv.create({
          data: {
            REF_BL: `BL${devis.id}`,
            REF_DEV: devis.REF_DEV,
            DATE_BL: new Date(),
            CODE_CLT: devis.CODE_CLT,
            CLIENT: devis.CLIENT,
            MNT_HT: devis.MNT_HT,
            MNT_TTC: devis.MNT_TTC,
            VALIDER: false,
            MODELIV: devis.MODELIV,
            MODE_PAIE: devis.MODE_PAIE,
            REMARQUE: devis.REMARQUE,
            EN_FACTURE: true,
            // Add additional Bonliv specific data here
          },
        });
  
        // Create DetailBonliv for each DevisDetail
        const detailBonlivs = devis.devisDetails.map(detail => ({
          REF_BL: bonliv.REF_BL,
          CODE_ART: detail.CODE_ART,
          ARTICLE: detail.ARTICLE,
          QTE: detail.QTE,
          PA_HT: detail.PA_HT,
          PV_HT: detail.PV_HT,
          PV_TTC: detail.PV_TTC,
          REMISE: detail.REMISE,
          TVA: detail.TVA,
          TotalHT: detail.TotalHT,
          TotalTTC: detail.TotalTTC
          // Add other fields as needed
        }));
  
        // Bulk create DetailBonlivs
        await tx.detailBonliv.createMany({
          data: detailBonlivs,
        });
  
        return bonliv;
      });
  
      // Transaction has been committed successfully
      console.log('Bonliv and DetailBonlivs created successfully:', result);
      return result;
    
  };
  
  

  const getAllDevis = async () => {
  return await prisma.devis.findMany();
};

const getDevisByClient = async (clientId) => {
    return await prisma.devis.findMany({ where: { CODE_CLT: clientId } });
  };
  const getDevisByCommercial = async (commercialId) => {
    return await prisma.devis.findMany({ where: { CODE_COM: commercialId } });
  };


  const addItemToDevis = async (refDevis, itemData) => {
    const { CODE_ART, PV_HT, TVA, ...restOfItemData } = itemData;
  
    console.log(itemData);
    // Check if the item already exists for the given Devis
    const existingItem = await prisma.devisDetail.findUnique({
      where: {
        REF_DEV_CODE_ART: { REF_DEV: refDevis, CODE_ART: CODE_ART },
      },
    });
  
    // If item exists, decide to update or delete and create based on your criteria
    if (existingItem) {

      const TotalTTC = itemData.PV_TTC*itemData.QTE;

      const TotalHT = PV_HT*itemData.QTE;

      // Example decision: Update the existing item
      const devisDetail = await prisma.devisDetail.update({
        where: {
          REF_DEV_CODE_ART: { REF_DEV: refDevis, CODE_ART: CODE_ART },
        },
        data: {
          ...restOfItemData,
          TotalHT,
        TotalTTC
        },
      });
      await updateDevisTotal(refDevis);
    return devisDetail;
  
      
    }
   const TotalTTC = itemData.PV_TTC*itemData.QTE;

   const TotalHT = PV_HT*itemData.QTE;
    // If the item does not exist, create a new item
    const devisDetail = await prisma.devisDetail.create({
      data: {
        CODE_ART,
        ...restOfItemData,
        REF_DEV: refDevis,
        REF_DEV: refDevis,
        PV_HT,
        TVA,
        TotalHT,
        TotalTTC
      },
    });
    await updateDevisTotal(refDevis);
    return devisDetail;
    
  };
  
  
  const deleteItemFromDevis = async (refDevis, codeArt) => {
    
    return await prisma.devisDetail.deleteMany({
      
      where: {
        REF_DEV: refDevis,
        CODE_ART: codeArt,
      },
    });
  };
  

  const updateItemInDevis = async (refDevis, codeArt, updatedData) => {
    const { PV_HT, TVA, ...otherDetails } = updatedData;
  
    // Calculate PV_TTC if PV_HT or TVA is updated
    let updateFields = { ...otherDetails };
    if (PV_HT !== undefined && TVA !== undefined) {
      const PV_TTC = PV_HT + (PV_HT * TVA / 100);
      updateFields.PV_HT = PV_HT;
      updateFields.TVA = TVA;
      updateFields.PV_TTC = PV_TTC;
    }
  
    // Update the DevisDetail
    const devisDetail = await prisma.devisDetail.updateMany({
      where: {
        REF_DEV: refDevis,
        CODE_ART: codeArt,
      },
      data: updateFields,
    });
  
    // Update the total MNT_TTC in the Devis
    await updateDevisTotal(refDevis);
  
    return devisDetail;
  };
  


  const getItemsInDevis = async (refDevis) => {
    return await prisma.devisDetail.findMany({
      where: { REF_DEV: refDevis },
    });
  };

  const updateDevisTotal = async (refDevis) => {
    // Sum up all PV_TTC values of the DevisDetails
    const aggregate = await prisma.devisDetail.aggregate({
      _sum: {
        TotalTTC: true,
      },
      where: {
        REF_DEV: refDevis,
      },
    });

    const aggregateHT = await prisma.devisDetail.aggregate({
      _sum: {
        TotalHT: true,
      },
      where: {
        REF_DEV: refDevis,
      },
    });
  
    const totalTTC = aggregate._sum.TotalTTC;
    const totalHT = aggregateHT._sum.TotalHT;
    // Update the Devis with the new total
    await prisma.devis.update({
      where: {
        REF_DEV: refDevis,
      },
      data: {
        MNT_TTC: totalTTC,
        MNT_HT: totalHT 
      },
    });
  };
  
  
  module.exports = {
    createDevis,
    getDevisById,
    updateDevis,
    deleteDevis,
    validateDevis,
    getAllDevis,
    getDevisByClient,
    getDevisByCommercial,
    addItemToDevis,
    deleteItemFromDevis,
    updateItemInDevis,
    getItemsInDevis,
  };
  
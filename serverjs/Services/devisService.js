const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createDevis = async (data) => {
  return await prisma.devis.create({ data });
};

const getDevisById = async (id) => {
    return await prisma.devis.findUnique({ where: { id } });
  };

  const updateDevis = async (id, data) => {
    return await prisma.devis.update({
      where: { id },
      data,
    });
  };

  const deleteDevis = async (id) => {
    return await prisma.devis.delete({ where: { id } });
  };
  
  const validateDevis = async (refDevis) => {
    const devis = await prisma.devis.findUnique({
      where: { REF_DEV: refDevis },
      include: { devisDetails: true },
    });
  
    if (!devis) throw new Error('Devis not found');
  
    // Validate Devis
    await prisma.devis.update({
      where: { REF_DEV: refDevis },
      data: { VALIDER: true ,DATEVALID: new Date()},
    });
  
    // Create Bonliv based on Devis
    const bonliv = await prisma.bonliv.create({
      data: {
        REF_BL: `BL-${devis.REF_DEV}`, // Example of generating REF_BL
        // Assuming current date for simplicity
        REF_DEV: devis.REF_DEV,
        DATE_BL: new Date(), // Assuming current date for simplicity
        CODE_CLT: devis.CODE_CLT,
        CLIENT: devis.CLIENT,
        MNT_HT: devis.MNT_HT,
        MNT_TTC: devis.MNT_TTC,
        VALIDER: false, // Initially, Bonliv is not validated
        CODE_ENT: devis.CODE_ENT,
        MODELIV: devis.MODELIV,
        MODE_PAIE: devis.MODE_PAIE,
        REMARQUE: devis.REMARQUE,
        detailBonlivs: {
          create: devis.devisDetails.map(detail => ({
            CODE_ART: detail.CODE_ART,
            ARTICLE: detail.ARTICLE,
            QTECMD: detail.QTE,
            QTE: detail.QTE, // Assuming QTE in Bonliv is same as in Devis
            PA_HT: detail.PA_HT,
            PV_HT: detail.PV_HT,
            PV_TTC: detail.PV_TTC,
            REMISE: detail.REMISE,
            TVA: detail.TVA,
          })),
        },
      },
    });
  
    return bonliv;
  }

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
  
    // Check if the item already exists for the given Devis
    const existingItem = await prisma.devisDetail.findUnique({
      where: {
        REF_DEV_CODE_ART: { REF_DEV: refDevis, CODE_ART: CODE_ART },
      },
    });
  
    // If item exists, decide to update or delete and create based on your criteria
    if (existingItem) {
      // Example decision: Update the existing item
      return await prisma.devisDetail.update({
        where: {
          REF_DEV_CODE_ART: { REF_DEV: refDevis, CODE_ART: CODE_ART },
        },
        data: {
          ...restOfItemData,
        },
      });
  
      /*
      // If you decide to delete and recreate instead, you could do:
      await prisma.devisDetail.delete({
        where: {
          REF_DEV_CODE_ART: { REF_DEV: refDevis, CODE_ART: CODE_ART },
        },
      });
      // Then recreate the item as new
      */
    }
    const PV_TTC = PV_HT + (PV_HT * TVA / 100);
    // If the item does not exist, create a new item
    const devisDetail = await prisma.devisDetail.create({
      data: {
        CODE_ART,
        ...restOfItemData,
        REF_DEV: refDevis,
        REF_DEV: refDevis,
        PV_HT,
        TVA,
        PV_TTC,
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
        PV_TTC: true,
      },
      where: {
        REF_DEV: refDevis,
      },
    });
  
    const totalTTC = aggregate._sum.PV_TTC;
  
    // Update the Devis with the new total
    await prisma.devis.update({
      where: {
        REF_DEV: refDevis,
      },
      data: {
        MNT_TTC: totalTTC,
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
  
// services/avService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createAvoir = async (data) => {
  const avoir = await prisma.avoirs.create({
    data: {
      ...data,
      REF_AVR: "", // Initially set to an empty string
    },
  });

  const refAvoirValue = `AV${String(avoir.id).padStart(5, '0')}`;
  const updatedAvoir = await prisma.avoirs.update({
    where: { id: avoir.id },
    data: { REF_AVR: refAvoirValue },
  });

  return updatedAvoir;
};

const getAvoirById = async (id) => {
  return await prisma.avoirs.findUnique({
    where: { REF_AVR: id },
    include: { detailAvoirs: true },
  });
};

const updateAvoir = async (id, data) => {
  return await prisma.avoirs.update({
    where: { REF_AVR: id },
    data,
  });
};

const deleteAvoir = async (id) => {
  const transaction = await prisma.$transaction(async (prisma) => {
      // Retrieve the Avoir to check its VALIDER status
      const avoir = await prisma.avoirs.findUnique({
          where: { REF_AVR: id },
          select: { REF_AVR: true, VALIDER: true } // Only select necessary fields
      });

      if (!avoir) {
          throw new Error('Avoir not found');
      }

      if (avoir.VALIDER) {
          // Check if a corresponding record exists in UnifiedFactureAvoir
          const unifiedEntry = await prisma.unifiedFactureAvoir.findUnique({
              where: { REF_AV_FAC: avoir.REF_AVR },
              select: { REF_AV_FAC: true } // Only select necessary field
          });

          // If a corresponding record exists, delete it
          if (unifiedEntry) {
              await prisma.unifiedFactureAvoir.delete({
                  where: { REF_AV_FAC: unifiedEntry.REF_AV_FAC }
              });
          }
      }

      // Proceed to delete the Avoir
      await prisma.avoirs.delete({
          where: { REF_AVR: id },
      });

      return 'Avoir and corresponding UnifiedFactureAvoir deleted successfully';
  });

  return transaction;
};

const validateAvoir = async (refAvoir) => {
    const result = await prisma.$transaction(async (tx) => {
      const avoir = await tx.avoirs.findUnique({
        where: { REF_AVR: refAvoir },
        include: { detailAvoirs: true, client: true },
      });
  
      if (!avoir) {
        throw new Error('Avoir not found');
      }
  
      // Validate the Avoir
      await tx.avoirs.update({
        where: { REF_AVR: refAvoir },
        data: { VALIDER: true, DATEVALID: new Date() },
      });
  
      // Iterate over each DetailAvoir to update Article stock and calculate total amount
      
      const updates = avoir.detailAvoirs.map(async (detail) => {
        // Update Article stock by adding back the quantity if MAJ_STK is not already true
        if (!detail.MAJ_STK) {
          await tx.article.update({
            where: { code_art: detail.CODE_ART },
            data: { qte_stk: { increment: detail.QTE } }
          });
  
          // Set MAJ_STK to true after updating stock
          await tx.detailAvoirs.update({
            where: { REF_AVR_CODE_ART: { REF_AVR: detail.REF_AVR, CODE_ART: detail.CODE_ART } },
            data: { MAJ_STK: true }
          });
        }
  
        
        return detail;
      });
  
      await Promise.all(updates);
  
      // Decrement client's solde
      if (avoir.client) {
        await tx.client.update({
          where: { code_clt: avoir.CODE_CLT },
          data: { SOLDE: { increment: avoir.MNT_TTC } }
        });
      }
  
      // Create an entry in UnifiedFactureAvoir
      const unifiedAvoirFacture = await tx.unifiedFactureAvoir.create({
        data: {
          REF_AV_FAC: avoir.REF_AVR,
          DATE_DOC: new Date(),
          MNT_TTC: avoir.MNT_TTC,
          MNT_REGLER: 0,  // Assuming no payment is made at validation
          code_clt: avoir.CODE_CLT,
        }
      });
  
      return { unifiedAvoirFacture, validatedAvoir: avoir };
    });
  
    return result;
  };
  

const getAllAvoirs = async () => {
  return await prisma.avoirs.findMany();
};

const getAvoirsByClient = async (clientId) => {
  return await prisma.avoirs.findMany({
    where: { CODE_CLT: clientId },
  });
};

const addItemToAvoir = async (refAvoir, itemData) => {
    const { CODE_ART, PV_HT, TVA, ...restOfItemData } = itemData;
  
    console.log(itemData);
    // Check if the item already exists for the given Avoir
    const existingItem = await prisma.detailAvoirs.findUnique({
      where: {
        REF_AVR_CODE_ART: { REF_AVR: refAvoir, CODE_ART: CODE_ART },
      },
    });
  
    // If item exists, decide to update or delete and create based on your criteria
    if (existingItem) {

      const TotalTTC = itemData.PV_TTC*itemData.QTE;

      const TotalHT = PV_HT*itemData.QTE;

      // Example decision: Update the existing item
      const detailAvoirs = await prisma.detailAvoirs.update({
        where: {
          REF_AVR_CODE_ART: { REF_AVR: refAvoir, CODE_ART: CODE_ART },
        },
        data: {
          ...restOfItemData,
          TotalHT,
        TotalTTC
        },
      });
      await updateAvoirTotal(refAvoir);
    return detailAvoirs;
  
      
    }
   const TotalTTC = itemData.PV_TTC*itemData.QTE;

   const TotalHT = PV_HT*itemData.QTE;
    // If the item does not exist, create a new item
    const detailAvoirs = await prisma.detailAvoirs.create({
      data: {
        CODE_ART,
        ...restOfItemData,
        REF_AVR: refAvoir,
        REF_AVR: refAvoir,
        PV_HT,
        TVA,
        TotalHT,
        TotalTTC
      },
    });
    await updateAvoirTotal(refAvoir);
    return detailAvoirs;
    
  };

const deleteItemFromAvoir = async (refAvoir, codeArt) => {
  await prisma.detailAvoirs.deleteMany({
    where: {
      REF_AVR: refAvoir,
      CODE_ART: codeArt,
    },
  });
};
const updateItemInAvoir = async (refAvoir, codeArt, updatedData) => {
    const { PV_HT, TVA, QTE, ...otherDetails } = updatedData;
  
    // Calculate new total prices if necessary
    let updateFields = { ...otherDetails };
    if (PV_HT !== undefined && TVA !== undefined) {
        const PV_TTC = (PV_HT + (PV_HT * TVA / 100) );
        const TotalTTC = PV_TTC*QTE;
  
        const TotalHT = PV_HT*QTE;
        // Calculate based on quantity
        updateFields = {
          ...updateFields,
          PV_HT,
          QTE,
          TVA,
          PV_TTC,
          TotalHT,
          TotalTTC // Update to calculated PV_TTC // Update to calculated PV_TTC
      };
    }
  
    // Update the item details
    const detailAvoirs = await prisma.detailAvoirs.updateMany({
      where: {
        REF_AVR: refAvoir,
        CODE_ART: codeArt,
      },
      data: updateFields,
    });
  
    // Update total amounts in the avoir
    await updateAvoirTotal(refAvoir);
  
    return detailAvoirs;
  };
  
  
const getItemsInAvoir = async (refAvoir) => {
    console.log(refAvoir);
  return await prisma.detailAvoirs.findMany({
    where: { REF_AVR: refAvoir },
  });
};



const updateAvoirTotal = async (refAvoir) => {
    // Sum up all PV_TTC values of the detailAvoirss
    const aggregate = await prisma.detailAvoirs.aggregate({
      _sum: {
        TotalTTC: true,
      },
      where: {
        REF_AVR: refAvoir,
      },
    });

    const aggregateHT = await prisma.detailAvoirs.aggregate({
      _sum: {
        TotalHT: true,
      },
      where: {
        REF_AVR: refAvoir,
      },
    });
  
    const totalTTC = aggregate._sum.TotalTTC;
    const totalHT = aggregateHT._sum.TotalHT;
    // Update the Avoir with the new total
    await prisma.Avoirs.update({
      where: {
        REF_AVR: refAvoir,
      },
      data: {
        MNT_TTC: -totalTTC,
        MNT_HT: -totalHT 
      },
    });
  };

module.exports = {
  createAvoir,
  getAvoirById,
  updateAvoir,
  deleteAvoir,
  validateAvoir,
  getAllAvoirs,
  getAvoirsByClient,
  addItemToAvoir,
  deleteItemFromAvoir,
  updateItemInAvoir,
  getItemsInAvoir,
};

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create BonLiv
const createBonLiv = async (data) => {
  return await prisma.bonliv.create({ data });
};

// Get BonLiv by ID
const getBonLivById = async (id) => {
  return await prisma.bonliv.findUnique({ where: { REF_BL: id }, include: { detailBonlivs: true } });
};

// Update BonLiv
const updateBonLiv = async (id, data) => {
  return await prisma.bonliv.update({ where: { REF_BL: id }, data });
};

// Delete BonLiv
const deleteBonLiv = async (id) => {
  return await prisma.bonliv.delete({ where: { REF_BL: id } });
};

// List all BonLivs
const getAllBonLivs = async () => {
  return await prisma.bonliv.findMany({ include: { detailBonlivs: true } });
};

// Validate BonLiv
const validateBonLiv = async (refBL) => {
    const transaction = await prisma.$transaction(async (prisma) => {
      // Validate the BonLiv
      const validatedBonLiv = await prisma.bonliv.update({
        where: { REF_BL: refBL },
        data: { VALIDER: true, DATEVALID: new Date() },
        include: { detailBonlivs: true }, // Include details to use in Facture creation
      });
  
      // Create Facture based on validated BonLiv
      const newFacture = await prisma.facture.create({
        data: {
          REF_FAC: `FA-${validatedBonLiv.REF_BL}`, // Generate REF_FAC based on REF_BL
          DATE_FAC: new Date(),
          REF_BL: refBL,
          COMPTE: validatedBonLiv.COMPTE,
          CODE_CLT: validatedBonLiv.CODE_CLT,
          CLIENT: validatedBonLiv.CLIENT,
          MNT_HT: validatedBonLiv.MNT_HTliv || validatedBonLiv.MNT_HT, // Use MNT_HTliv if available
          MNT_TTC: validatedBonLiv.MNT_TTCliv || validatedBonLiv.MNT_TTC, // Use MNT_TTCliv if available
          CODE_COM: validatedBonLiv.CODE_COM,
          MODELIV: validatedBonLiv.MODELIV,
          MODE_PAIE: validatedBonLiv.MODE_PAIE,
          REMARQUE: validatedBonLiv.REMARQUE,
          VALIDER: false, // Initially not validated
          IMPRIMER: false,
        }
      });
  
      // Create DetailFacture entries and update Article stock
      const detailFactures = validatedBonLiv.detailBonlivs.map(async detail => {
        // Create DetailFacture
        await prisma.detailFacture.create({
          data: {
            REF_FAC: newFacture.REF_FAC,
            CODE_ART: detail.CODE_ART,
            ARTICLE: detail.ARTICLE,
            QTE: detail.qteliv || detail.QTE, // Use qteliv if available
            GRATUIT: detail.GRATUIT,
            PA_HT: detail.PA_HT,
            PV_HT: detail.PV_HT,
            PV_TTC: detail.PV_TTC,
            PD_HT: detail.PV_HT, // Assuming PD_HT is the same as PV_HT
            REMISE: detail.REMISE,
            TVA: detail.TVA,
            TotalHT:detail.TotalHTliv,
            TotalTTC:detail.TotalTTCliv
          }
        });
  
        // Update stock in Article
        if (detail.qteliv !== null) {
          await prisma.article.update({
            where: { code_art: detail.CODE_ART },
            data: { qte_stk: { decrement: detail.qteliv || detail.QTE } } // Decrement stock by qteliv if available
          });
        }
      });
  
      await Promise.all(detailFactures); // Ensure all operations are completed
      return newFacture;
    });
  
    return transaction;
  };
  
    
    




// Get all DetailBonliv for a specific BonLiv
const getAllDetailBonlivsByBonliv = async (refBL) => {
  return await prisma.detailBonliv.findMany({ where: { REF_BL: refBL } });
};

// Get a single DetailBonliv by REF_BL and CODE_ART
const getDetailBonlivById = async (refBL, codeArt) => {
  return await prisma.detailBonliv.findUnique({
    where: {
      REF_BL_CODE_ART: { REF_BL: refBL, CODE_ART: codeArt },
    },
  });
};

// Update DetailBonliv
const updateDetailBonliv = async (refBL, codeArt, data) => {
    // First, update the specific DetailBonliv
    await prisma.detailBonliv.update({
      where: {
        REF_BL_CODE_ART: { REF_BL: refBL, CODE_ART: codeArt },
      },
      data,
    });
    
    // Then, recalculate and update totals for the Bonliv
    await updateBonlivTotal(refBL);
  };

  const updateBonlivTotal = async (refBL) => {
    // Fetch all DetailBonliv for the given REF_BL to calculate totals based on qteliv or QTE
    const bonlivDetails = await prisma.detailBonliv.findMany({
      where: {
        REF_BL: refBL,
      },
    });
  
    let totalTTCliv = 0;
    let totalHTliv = 0;

    // Use Promise.all to ensure all asynchronous operations complete
    await Promise.all(bonlivDetails.map(async (detail) => {
      const quantityLiv = detail.qteliv !== null ? detail.qteliv : detail.QTE; // Use qteliv if not null, otherwise QTE
      const detailTotalTTC = detail.PV_TTC * quantityLiv;
      const detailTotalHT = detail.PV_HT * quantityLiv;

      // Accumulate totals for the Bonliv
      totalTTCliv += detailTotalTTC;
      totalHTliv += detailTotalHT;

      // Update DetailBonliv with the calculated TotalTTCliv and TotalHTliv
      await prisma.detailBonliv.update({
        where: {
          // Assuming REF_BL_CODE_ART is a composite key
          REF_BL_CODE_ART: { REF_BL: refBL, CODE_ART: detail.CODE_ART },
        },
        data: {
          TotalTTCliv: detailTotalTTC, // Assuming this field exists and you want to update it
          // Optional: Update TotalHTliv if you're tracking it
          TotalHTliv: detailTotalHT,
        },
      });
    }));

    // Update the Bonliv with the new totals
    await prisma.bonliv.update({
      where: {
        REF_BL: refBL,
      },
      data: {
        MNT_TTCliv: totalTTCliv,
        MNT_HTliv: totalHTliv,
      },
    });
};

const bulkUpdateDetailBonliv = async (updates) => {
    return await prisma.$transaction(
      updates.map(update => {
        return prisma.detailBonliv.update({
          where: {
            REF_BL_CODE_ART: { REF_BL: update.refBL, CODE_ART: update.codeArt },
          },
          data: update.data,
        });
      })
    );
  };

// Delete DetailBonliv
const deleteDetailBonliv = async (refBL, codeArt) => {
   await prisma.detailBonliv.delete({
    where: {
      REF_BL_CODE_ART: { REF_BL: refBL, CODE_ART: codeArt },
    },
  });
  await updateBonlivTotal(refBL);
};








module.exports = {
  createBonLiv,
  getBonLivById,
  updateBonLiv,
  deleteBonLiv,
  getAllBonLivs,
  validateBonLiv,
  getAllDetailBonlivsByBonliv,
  getDetailBonlivById,
  updateDetailBonliv,
  deleteDetailBonliv,
  
};

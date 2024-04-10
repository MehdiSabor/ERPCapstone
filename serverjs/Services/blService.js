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
const validateBonLiv = async (id) => {
  return await prisma.bonliv.update({ where: { REF_BL: id }, data: { VALIDER: true, DATEVALID: new Date() } });
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

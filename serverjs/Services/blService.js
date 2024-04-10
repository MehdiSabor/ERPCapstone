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
  return await prisma.detailBonliv.update({
    where: {
      REF_BL_CODE_ART: { REF_BL: refBL, CODE_ART: codeArt },
    },
    data,
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
  return await prisma.detailBonliv.delete({
    where: {
      REF_BL_CODE_ART: { REF_BL: refBL, CODE_ART: codeArt },
    },
  });
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

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
  return await prisma.avoirs.delete({
    where: { REF_AVR: id },
  });
};

const validateAvoir = async (refAvoir) => {
  const result = await prisma.$transaction(async (tx) => {
    const avoir = await tx.avoirs.findUnique({
      where: { REF_AVR: refAvoir },
      include: { detailAvoirs: true },
    });

    if (!avoir) {
      throw new Error('Avoir not found');
    }

    await tx.avoirs.update({
      where: { REF_AVR: refAvoir },
      data: { VALIDER: true, DATEVALID: new Date() },
    });

    // Additional logic for Bonliv creation or other actions can be added here.

    return avoir;
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
  const newItem = await prisma.detailAvoirs.create({
    data: {
      REF_AVR: refAvoir,
      ...itemData,
    },
  });
  return newItem;
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
  const updatedItem = await prisma.detailAvoirs.updateMany({
    where: {
      REF_AVR: refAvoir,
      CODE_ART: codeArt,
    },
    data: updatedData,
  });
  return updatedItem;
};

const getItemsInAvoir = async (refAvoir) => {
  return await prisma.detailAvoirs.findMany({
    where: { REF_AVR: refAvoir },
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

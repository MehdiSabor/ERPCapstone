const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createFamille = async (data) => {
  return await prisma.famille.create({
    data,
  });
};

const getFamilleById = async (id) => {
  return await prisma.famille.findUnique({
    where: { code_fam:id },
  });
};

const getAllFamilles = async () => {
  return await prisma.famille.findMany();
};

const updateFamille = async (id, data) => {
  return await prisma.famille.update({
    where: { code_fam:id },
    data,
  });
};

const deleteFamille = async (id) => {
  return await prisma.famille.delete({
    where: { code_fam:id },
  });
};

module.exports = {
  createFamille,
  getFamilleById,
  getAllFamilles,
  updateFamille,
  deleteFamille,
};

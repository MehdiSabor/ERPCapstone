const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createFournisseur = async (data) => {
  return await prisma.fournisseur.create({ data });
};

const getFournisseurById = async (id) => {
  
  return await prisma.fournisseur.findUnique({ where: { code_frs: id } });
};

const updateFournisseur = async (id, data) => {
  return await prisma.fournisseur.update({
    where: { code_frs: id },
    data,
  });
};

const deleteFournisseur = async (id) => {
  return await prisma.fournisseur.delete({ where: { code_frs: id } });
};

const getAllFournisseurs = async () => {
  return await prisma.fournisseur.findMany();
};

module.exports = {
  createFournisseur,
  getFournisseurById,
  updateFournisseur,
  deleteFournisseur,
  getAllFournisseurs,
};

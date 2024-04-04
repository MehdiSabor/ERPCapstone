const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createComercial = async (data) => {
  return await prisma.comercial.create({ data });
};

const getComercialById = async (id) => {
  return await prisma.comercial.findUnique({ where: { code_com : id } });
};

const updateComercial = async (id, data) => {
  return await prisma.comercial.update({
    where: { code_com : id },
    data,
  });
};

const deleteComercial = async (id) => {
  return await prisma.comercial.delete({ where: { code_com : id } });
};

const getAllComerciaux = async () => {
  return await prisma.comercial.findMany();
};

module.exports = {
  createComercial,
  getComercialById,
  updateComercial,
  deleteComercial,
  getAllComerciaux,
};

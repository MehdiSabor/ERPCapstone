const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createClient = async (clientData) => {
    return prisma.client.create({
      data: clientData,
    });
  };

const getClientById = async (id) => {
  return prisma.client.findUnique({
    where: { id },
  });
};

const updateClient = async (id, clientData) => {
  return prisma.client.update({
    where: { id },
    data: clientData,
  });
};

const deleteClient = async (id) => {
  return prisma.client.delete({
    where: { id },
  });
};

const getAllClients = async () => {
  return prisma.client.findMany();
};

module.exports = {
  createClient,
  getClientById,
  updateClient,
  deleteClient,
  getAllClients,
};

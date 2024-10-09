// services/clientService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createClient = async (clientData) => {
  const villeInitial = clientData.ville[0]; // Assuming 'ville' field is not empty

  // Find the last client with 'compte' starting with the same initial of 'ville'
  const lastClient = await prisma.client.findFirst({
    where: {
      compte: {
        startsWith: villeInitial,
      },
    },
    orderBy: {
      compte: 'desc',
    },
  });

  let nextNumber = 1; // Default if no last client is found
  if (lastClient && lastClient.compte) {
    const lastNumber = parseInt(lastClient.compte.substring(1)); // Extract the numeric part
    if (!isNaN(lastNumber)) {
      nextNumber = lastNumber + 1; // Increment
    }
  }

  // Construct the new 'compte' value with leading zeros
  const newCompte = `${villeInitial}${String(nextNumber).padStart(5, '0')}`;

  // Create the client with the new 'compte' and other client data
  return prisma.client.create({
    data: {
      ...clientData,
      compte: newCompte,
    },
  });
};


const getClientById = async (code_clt) => {
  return prisma.client.findUnique({
    where: { code_clt },
  });
};

const updateClient = async (code_clt, clientData) => {
  return prisma.client.update({
    where: { code_clt }, // Ensuring that the client is identified by the correct field
    data: clientData,    // Passing the entire `clientData` object to the update operation
  });
};


const deleteClient = async (code_clt) => {
  return prisma.client.delete({
    where: { code_clt },
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

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


const bulkCreateOrUpdateClients = async (clients) => {
  const results = {
    created: 0,
    updated: 0,
    errors: [],
  };

  for (const client of clients) {
    try {
      const existingClient = await prisma.client.findUnique({
        where: { COMPTE: client.COMPTE },
      });

      const clientData = {
        CLIENT: client.CLIENT,
        COMPTE: client.COMPTE,
        TEL: client.TEL,
        MOBILE: client.MOBILE,
        CONTACT: client.CONTACT,
        ADRESSE_SIEGE: client.ADRESSE_SIEGE,
        ADRESSE_LIV: client.ADRESSE_LIV,
        VILLE: client.VILLE,
        PAYS: client.PAYS,
        nat_clt: client.nat_clt,
        conditions: client.conditions,
        NOTES: client.NOTES,
        ECHEANCE: parseInt(client.ECHEANCE),
        MODE_PAIE: client.MODE_PAIE,
        BLOQUER: client.BLOQUER === 'true' || client.BLOQUER === true,
        CODE_PST: client.CODE_PST,
        PLAFOND_SLD: parseFloat(client.PLAFOND_SLD),
        CODE_COM: parseInt(client.CODE_COM),
        MODELIV: client.MODELIV,
        CODE_CAT: client.CODE_CAT ? parseInt(client.CODE_CAT) : null,
        plaf_ech: client.plaf_ech ? parseFloat(client.plaf_ech) : null,
        mode_paie_final: client.mode_paie_final,
        PATENTE: client.PATENTE,
        BANQUE: client.BANQUE,
        COMPTEBNQ: client.COMPTEBNQ,
        reg_trans: client.reg_trans,
        CAPSOC: client.CAPSOC ? client.CAPSOC.toString() : null,
        FORMJUR: client.FORMJUR,
        ICE: client.ICE,
        objectif: client.objectif ? parseFloat(client.objectif) : null,
        remise_sp: client.remise_sp ? parseFloat(client.remise_sp) : null,
        email: client.email,
        REMISE_G: client.REMISE_G ? parseFloat(client.REMISE_G): null,
        SOLDE: client.SOLDE ? parseInt(client.SOLDE): null,
      };

      if (existingClient) {
        // Update existing client
        await prisma.client.update({
          where: { COMPTE: client.COMPTE },
          data: clientData,
        });
        results.updated++;
      } else {
        // Create new client
        await prisma.client.create({
          data: {
            COMPTE: client.COMPTE,
            ...clientData,
          },
        });
        results.created++;
      }
    } catch (error) {
      results.errors.push({ COMPTE: client.COMPTE, error: error.message });
      console.log(error)
    }
  }

  return results;
};

module.exports = {
  createClient,
  getClientById,
  updateClient,
  deleteClient,
  getAllClients,
  bulkCreateOrUpdateClients
};

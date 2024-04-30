const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getFactureById = async (id) => {
  return await prisma.facture.findUnique({
    where: { REF_FAC: id },
    include: { detailFactures: true },
  });
};

const getAllFactures = async () => {
  return await prisma.facture.findMany({
    include: { detailFactures: true },
  });
};

const validateFacture = async (refFAC) => {
  const transaction = await prisma.$transaction(async (prisma) => {
    // Validate the Facture
    const validatedFacture = await prisma.facture.update({
      where: { REF_FAC: refFAC },
      data: { VALIDER: true, DATEVALID: new Date() },
      include: { client: true } // Include client to access client details
    });

    // Create UnifiedFactureAvoir based on validated Facture
    const unifiedFactureAvoir = await prisma.UnifiedFactureAvoir.create({
      data: {
        REF_AV_FAC: validatedFacture.REF_FAC, // Generate REF_AV_FAC based on REF_FAC
        DATE_DOC: new Date(),
        MNT_TTC: validatedFacture.MNT_TTC,
        MNT_REGLER: 0, // Initial value, assuming no amount is paid at validation
        code_clt: validatedFacture.CODE_CLT
      }
    });

    // Update Client's SOLDE by adding MNT_TTC of the validated Facture
    const updatedClient = await prisma.client.update({
      where: { code_clt: validatedFacture.CODE_CLT },
      data: { SOLDE: { increment: validatedFacture.MNT_TTC } }
    });

    return { validatedFacture, unifiedFactureAvoir, updatedClient };
  });

  return transaction;
};





const getAllDetailFacturesByFacture = async (refFAC) => {
  return await prisma.detailFacture.findMany({
    where: { REF_FAC: refFAC },
  });
};





const cancelFactureAndCreateAvoirs = async (refFAC) => {
  const transaction = await prisma.$transaction(async (prisma) => {
      // Fetch the Facture to be cancelled
      const facture = await prisma.facture.findUnique({
          where: { REF_FAC: refFAC },
          include: { detailFactures: true }
      });

      if (!facture) {
          throw new Error('Facture not found');
      }

      // Cancel the Facture (assuming update is needed to set some cancellation status)
      await prisma.facture.update({
          where: { REF_FAC: refFAC },
          data: { VALIDER: false } // Example: Set VALIDER to false to indicate cancellation
      });

      // Delete from UnifiedFactureAvoir if exists
      await prisma.unifiedFactureAvoir.delete({
          where: { REF_AV_FAC: facture.REF_FAC }
      }).catch(error => {
          console.error("No related record in UnifiedFactureAvoir or other error: ", error);
      });

      // Create the Avoirs
      const avoirs = await prisma.avoirs.create({
          data: {
              REF_AVR: `AV-F${refFAC.slice(2)}`,
              DATE_AVR: new Date(),
              COMPTE: facture.COMPTE,
              CODE_CLT: facture.CODE_CLT,
              CLIENT: facture.CLIENT,
              MNT_HT: -facture.MNT_HT,
              MNT_TTC: -facture.MNT_TTC,
              CODE_COM: facture.CODE_COM,
              REMARQUE: facture.REMARQUE,
              VALIDER: false, // Assuming not directly validated
          }
      });

      // Create Detailavoirs for each DetailFacture
      const detailAvoirs = facture.detailFactures.map(detail => ({
          REF_AVR: avoirs.REF_AVR,
          CODE_ART: detail.CODE_ART,
          ARTICLE: detail.ARTICLE,
          QTE: detail.QTE,
          GRATUIT: detail.GRATUIT,
          PV_HT: detail.PV_HT,
          PV_TTC: detail.PV_TTC,
          PA_HT: detail.PA_HT,
          REMISE: detail.REMISE,
          TVA: detail.TVA,
          MAJ_STK: false, // Assuming no stock adjustment is required
      }));

      // Bulk create Detailavoirs
      await prisma.detailAvoirs.createMany({
          data: detailAvoirs
      });

      // Update facture as cancelled
      await prisma.facture.update({
          where: { REF_FAC: refFAC },
          data: { IsCanceled: true }
      });

      return { facture, avoirs, detailAvoirs };
  });

  return transaction;
};




module.exports = {
  getFactureById,
  getAllFactures,
  validateFacture,
  getAllDetailFacturesByFacture,
  cancelFactureAndCreateAvoirs,
};

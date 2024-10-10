// services/articleService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createArticle = async (data) => {
  console.log(data);
  return await prisma.article.create({ data });
};

const getArticleById = async (id) => {
  return await prisma.article.findUnique({ where: { code_art:id } });
};

const updateArticle = async (id, data) => {
  return await prisma.article.update({
    where: { code_art:id },
    data,
  });
};

const deleteArticle = async (id) => {
  return await prisma.article.delete({ where: { code_art:id } });
};

const getAllArticles = async () => {
  return await prisma.article.findMany();
};





const bulkCreateOrUpdateArticles = async (articles) => {
  const results = {
    created: 0,
    updated: 0,
    errors: [],
  };

  for (const article of articles) {
    try {
      const existingArticle = await prisma.article.findUnique({
        where: { code_art: article.CODE_ART },
      });

      if (existingArticle) {
        // Update existing article
        await prisma.article.update({
          where: { code_art: article.CODE_ART },
          data: {
            ARTICLE: article.ARTICLE,
            qt_cart: article.qt_cart,
            PA_HT: article.PA_HT,
            TVA: article.TVA,
            PA_TTC: article.PA_TTC,
            PV_HT: article.PV_HT,
            PV_TTC: article.PV_TTC,
            CODE_FAM: article.CODE_FAM,
            CODE_SFAM: article.CODE_SFAM,
            CODE_MAR: article.CODE_MAR,
            STK_MIN: article.STK_MIN,
            STK_MAX: article.STK_MAX,
            STK_SEC: article.STK_SEC,
            q_paquet: article.q_paquet,
            Remise: article.Remise,
            REF_OEM: article.REF_OEM,
            VENTE_BLOQ: article.VENTE_BLOQ,
            ACHAT_BLOQ: article.ACHAT_BLOQ,
            uav: article.uav,
            frs: article.frs,
            Remarque: article.Remarque,
            substitution: article.substitution,
          },
        });
        results.updated++;
      } else {
        // Create new article
        await prisma.article.create({
          data: {
            code_art: article.CODE_ART,
            ARTICLE: article.ARTICLE,
            qt_cart: article.qt_cart,
            PA_HT: article.PA_HT,
            TVA: article.TVA,
            PA_TTC: article.PA_TTC,
            PV_HT: article.PV_HT,
            PV_TTC: article.PV_TTC,
            CODE_FAM: article.CODE_FAM,
            CODE_SFAM: article.CODE_SFAM,
            CODE_MAR: article.CODE_MAR,
            STK_MIN: article.STK_MIN,
            STK_MAX: article.STK_MAX,
            STK_SEC: article.STK_SEC,
            q_paquet: article.q_paquet,
            Remise: article.Remise,
            REF_OEM: article.REF_OEM,
            VENTE_BLOQ: article.VENTE_BLOQ,
            ACHAT_BLOQ: article.ACHAT_BLOQ,
            uav: article.uav,
            frs: article.frs,
            Remarque: article.Remarque,
            substitution: article.substitution,
          },
        });
        results.created++;
      }
    } catch (error) {
      results.errors.push({ code_art: article.CODE_ART, error: error.message });
    }
  }

  return results;
};

module.exports = {
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
  getAllArticles,
  bulkCreateOrUpdateArticles
};

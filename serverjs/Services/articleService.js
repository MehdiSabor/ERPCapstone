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

module.exports = {
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
  getAllArticles,
};

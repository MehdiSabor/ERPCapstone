const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createArticle = async (data) => {
  console.log(data);
  return await prisma.article.create({ data });
};

const getArticleById = async (id) => {
  return await prisma.article.findUnique({ where: { id } });
};

const updateArticle = async (id, data) => {
  return await prisma.article.update({
    where: { id },
    data,
  });
};

const deleteArticle = async (id) => {
  return await prisma.article.delete({ where: { id } });
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

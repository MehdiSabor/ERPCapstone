// controllers/articleController.js

const articleService = require('../services/articleService');

exports.createArticle = async (req, res) => {
  try {
    const article = await articleService.createArticle(req.body);
    res.status(201).json(article);
  } catch (error) {
   console.log(error)
    res.status(400).json({ message: error.message });
    
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const id = req.params.id;
    const article = await articleService.getArticleById(id);
    if (article) res.json(article);
    else res.status(404).json({ message: 'Article not found' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const article = await articleService.updateArticle(id, req.body);
    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const id = req.params.id;
    await articleService.deleteArticle(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await articleService.getAllArticles();
    res.json(articles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

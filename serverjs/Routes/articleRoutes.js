// routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const articleController = require('../Controllers/articleController');

router.post('/createarticle', articleController.createArticle);
router.get('/getarticle/:id', articleController.getArticleById);
router.put('/updatearticle/:id', articleController.updateArticle);
router.delete('/deletearticle/:id', articleController.deleteArticle);
router.get('/getallarticles/', articleController.getAllArticles);

module.exports = router;

// routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/createarticle', articleController.createArticle);
router.get('/getarticle/:id', articleController.getArticleById);
router.put('/updatearticle/:id', articleController.updateArticle);
router.delete('/deletearticle/:id', articleController.deleteArticle);
router.get('/getallarticles/', articleController.getAllArticles);
router.post('/bulk-upload', upload.single('file'), articleController.bulkUploadArticles);

module.exports = router;

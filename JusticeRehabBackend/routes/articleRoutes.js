const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// Create a new article
router.post('/', articleController.createArticle);

// Retrieve all articles
router.get('/', articleController.getAllArticles);

// Get a single article by ID
router.get('/:id', articleController.getArticleById);

// Update an article
router.put('/:id', articleController.updateArticle);

// Delete an article
router.delete('/:id', articleController.deleteArticle);

module.exports = router;

// controllers/articleController.js

const Article = require('../models/Article');

// Get all articles
exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get an article by ID
exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json(article);
    } catch (error) {
        res.status(404).json({ error: 'Article not found' });
    }
};

// Create an article
exports.createArticle = async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const newArticle = new Article({ title, content, author });
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an article
exports.updateArticle = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const updatedArticle = await Article.findByIdAndUpdate(req.params.id, { title, content, author }, { new: true });
        if (!updatedArticle) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json(updatedArticle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an article
exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

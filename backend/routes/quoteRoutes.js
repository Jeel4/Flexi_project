// backend/routes/quoteRoutes.js
const express = require('express');
const {
    createQuote,
    getQuotes,
    updateQuote,
    deleteQuote,
} = require('../controllers/quoteController');

const router = express.Router();

// Routes for Quotes
router.post('/', createQuote);
router.get('/', getQuotes);
router.put('/:id', updateQuote);
router.delete('/:id', deleteQuote);

module.exports = router;

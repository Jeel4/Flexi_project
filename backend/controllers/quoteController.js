// backend/controllers/quoteController.js
const Quote = require('../models/Quote');

// Create a new quote
exports.createQuote = async (req, res) => {
    try {
        const { text, author } = req.body;
        if (!text || !author) {
            return res.status(400).json({ message: 'Both text and author are required.' });
        }

        const newQuote = new Quote({ text, author });
        const savedQuote = await newQuote.save();
        res.status(201).json(savedQuote);
    } catch (error) {
        console.error('Error creating quote:', error);
        res.status(500).json({ message: 'Failed to add quote.' });
    }
};

// Get all quotes
exports.getQuotes = async (req, res) => {
    try {
        const quotes = await Quote.find();
        if (quotes.length === 0) {
            return res.status(404).json({ message: 'No quotes found.' });
        }
        res.status(200).json(quotes);
    } catch (error) {
        console.error('Error retrieving quotes:', error);
        res.status(500).json({ message: 'Failed to retrieve quotes.' });
    }
};

// Update an existing quote
exports.updateQuote = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, author } = req.body;

        if (!text || !author) {
            return res.status(400).json({ message: 'Both text and author are required.' });
        }

        const updatedQuote = await Quote.findByIdAndUpdate(id, { text, author }, { new: true });
        if (!updatedQuote) {
            return res.status(404).json({ message: 'Quote not found.' });
        }
        res.status(200).json(updatedQuote);
    } catch (error) {
        console.error('Error updating quote:', error);
        res.status(500).json({ message: 'Failed to update quote.' });
    }
};

// Delete a quote
exports.deleteQuote = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedQuote = await Quote.findByIdAndDelete(id);
        if (!deletedQuote) {
            return res.status(404).json({ message: 'Quote not found.' });
        }
        res.status(200).json({ message: 'Quote deleted successfully.' });
    } catch (error) {
        console.error('Error deleting quote:', error);
        res.status(500).json({ message: 'Failed to delete quote.' });
    }
};

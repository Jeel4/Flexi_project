const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const fetch = require('node-fetch'); // Ensure you have node-fetch installed
const Quote = require('./models/quote');

// Load environment variables
dotenv.config();

// Check if MONGODB_URI is set in the .env file
if (!process.env.MONGODB_URI) {
    console.error("Error: MONGODB_URI is not defined. Please add it to your .env file.");
    process.exit(1);
}

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// Route to fetch a random quote image URL
app.get('/api/quotes', async (req, res) => {
    try {
        const response = await fetch('https://inspirobot.me/api?generate=true'); // External API for quote
        const quoteImageUrl = await response.text();  // Get the generated quote image URL
        const quoteData = {
            text: 'Here is an inspiring quote for you!',
            imageUrl: quoteImageUrl.trim(),
        };
        res.json(quoteData);  // Return the quote data
    } catch (error) {
        console.error('Error fetching quote:', error);
        res.status(500).json({ message: 'Failed to fetch quote' });
    }
});

// CREATE - Add a new quote to MongoDB
app.post('/api/quotes', async (req, res) => {
    const { text, imageUrl, author = "Unknown" } = req.body;

    if (!text || !imageUrl) {
        return res.status(400).json({ message: 'Text and imageUrl are required' });
    }

    try {
        const newQuote = new Quote({ text, author, imageUrl });
        const savedQuote = await newQuote.save();
        res.status(201).json(savedQuote);
    } catch (error) {
        console.error('Error creating quote:', error);
        res.status(500).json({ message: 'Failed to create quote' });
    }
});

// READ - Get all quotes from MongoDB
app.get('/api/quotes/all', async (req, res) => {
    try {
        const quotes = await Quote.find();
        res.status(200).json(quotes);  // Return all quotes
    } catch (error) {
        console.error('Error fetching quotes:', error);
        res.status(500).json({ message: 'Failed to fetch quotes' });
    }
});

// UPDATE - Update a quote by ID in MongoDB
app.put('/api/quotes/:id', async (req, res) => {
    const { id } = req.params;
    const { text, author } = req.body;

    if (!text || !author) {
        return res.status(400).json({ message: 'Text and author are required' });
    }

    try {
        const updatedQuote = await Quote.findByIdAndUpdate(id, { text, author }, { new: true });
        if (!updatedQuote) {
            return res.status(404).json({ message: 'Quote not found' });
        }
        res.status(200).json(updatedQuote);  // Return the updated quote
    } catch (error) {
        console.error('Error updating quote:', error);
        res.status(500).json({ message: 'Failed to update quote' });
    }
});

// DELETE - Delete a quote by ID in MongoDB
app.delete('/api/quotes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedQuote = await Quote.findByIdAndDelete(id);
        if (!deletedQuote) {
            return res.status(404).json({ message: 'Quote not found' });
        }
        res.status(200).json({ message: 'Quote deleted successfully' });  // Return success message
    } catch (error) {
        console.error('Error deleting quote:', error);
        res.status(500).json({ message: 'Failed to delete quote' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

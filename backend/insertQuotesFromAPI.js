const axios = require('axios');
const mongoose = require('mongoose');
const Quote = require('./models/Quote');  // Assuming you have a Quote model
const express = require('express');
const app = express();
const cors = require('cors');

// Middleware to enable CORS
app.use(cors());

mongoose.connect('mongodb+srv://jeel_2602:jeel_2602@cluster0.pd539.mongodb.net/Quote_generator?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Fetch quotes from API and save to MongoDB
const fetchAndInsertQuote = async () => {
  try {
    const response = await axios.get('https://inspirobot.me/api?generate=true');  // Inspirobot API
    const imageUrl = response.data; // API returns the image URL

    const newQuote = new Quote({
      text: "Your generated quote",  // You can modify this to add a random text or other logic
      imageUrl: imageUrl
    });

    await newQuote.save();
    console.log('Quote inserted:', imageUrl);
  } catch (error) {
    console.error('Error fetching or inserting quote:', error);
  }
};

// Set up an interval to insert a new quote every 10 minutes (optional)
setInterval(fetchAndInsertQuote, 600000); // Fetch every 10 minutes

// Define route to fetch quotes for frontend
app.get('/api/quote', async (req, res) => {
  try {
    const quote = await Quote.findOne().sort({ _id: -1 }).limit(1);  // Get the latest inserted quote
    res.json(quote);
  } catch (error) {
    console.error("Error fetching quote:", error);
    res.status(500).json({ message: 'Error fetching quote' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

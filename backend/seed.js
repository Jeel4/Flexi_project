const mongoose = require('mongoose');
const Quote = require('./models/quote'); // Your quote model

// Connect to MongoDB
mongoose.connect('mongodb+srv://jeel_2602:jeel_2602@cluster0.pd539.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB");

    // Seed the database with some sample quotes
    const quotes = [
        {
            text: "The best way to predict the future is to invent it.",
            author: "Alan Kay",
            imageUrl: "https://someimageurl.com/quote1"
        },
        {
            text: "Life is 10% what happens to us and 90% how we react to it.",
            author: "Charles R. Swindoll",
            imageUrl: "https://someimageurl.com/quote2"
        },
        {
            text: "You miss 100% of the shots you don’t take.",
            author: "Wayne Gretzky",
            imageUrl: "https://someimageurl.com/quote3"
        }
    ];

    // Insert the quotes into the database
    Quote.insertMany(quotes)
        .then(() => {
            console.log("Database seeded with quotes");
            mongoose.connection.close();  // Close the connection
        })
        .catch((error) => {
            console.error("Error seeding the database:", error);
        });
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

const mongoose = require('mongoose');

// Temporary hard-coded URI for testing
const MONGODB_URI = 'mongodb+srv://jeel_2602:jeel_2602@cluster0.pd539.mongodb.net/Quote_generator?retryWrites=true&w=majority&appName=Cluster0';  // Replace with actual credentials

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    process.exit();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

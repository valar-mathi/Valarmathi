// Load environment variables
require('dotenv').config();

// Import Express
const express = require('express');

// Initialize Express
const app = express();

// Import Mongoose
const mongoose = require('mongoose');

// MongoDB Atlas Connection
const dbUser = process.env.DB_USERNAME;  // Environment variable for MongoDB Atlas username
const dbPassword = encodeURIComponent(process.env.DB_PASSWORD);  // Environment variable for MongoDB Atlas password, URL-encoded
const clusterUrl = 'cluster0.h9vkqyp.mongodb.net';
const dbName = 'JusticeRehab';  // The database name you want to connect to or create

// Construct the MongoDB Atlas connection string
const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterUrl}/${dbName}?retryWrites=true&w=majority`;

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define the port to run the server on
const PORT = process.env.PORT || 3000;

// Basic route for testing the server
app.get('/', (req, res) => {
  res.send('JusticeRehab Backend is up and running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

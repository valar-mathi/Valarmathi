require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const legalAidRoutes = require('./routes/legalAidRoutes'); // Ensure this path is correct

// Initialize Express app
const app = express();

// Connect to MongoDB using Mongoose
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully.');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    }
};

connectDB();

app.use(express.json()); // Middleware to parse JSON bodies

// API routes
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/legal-aid', legalAidRoutes); // Attach legal aid routes

// Basic test route to confirm server operation
app.get('/', (req, res) => {
    res.send('JusticeRehab Backend is up and running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

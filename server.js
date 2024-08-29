const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB Atlas
connectDB();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define API routes
app.use('/api/auth', require('./routes/auth'));

// Set the server to listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
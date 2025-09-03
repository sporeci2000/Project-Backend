// Load environment variables
require('dotenv').config();

// DB connection
require('./config/db')

const express = require('express');


// Invoke that imported express method to create a new Express application, and I'm storing it inside of this variable app
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());


// Get our server running
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
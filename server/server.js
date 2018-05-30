const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true}));

// Require in out Mongoose Model
const Book = require('./modules/models/book.schema');

// Connect to MondoDB
const mongoose = require('mongoose');

const DATABASE_NAME = 'library'
const DATABASE_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;
mongoose.connect(DATABASE_URL);

mongoose.connection.on('connected', () => {
    console.log(`Mongoose is connected to ${DATABASE_URL}`);
});

mongoose.connection.on('error', (error) => {
    console.log(`Mongoose connection error: ${error}`);
});
// --- END of Mongo Connection Stuff --- //

// Add static files later

// Add router later

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));

const express = require('express');
const router = express.Router();

// Require in out Mongoose Model
const Book = require('../modules/models/book.schema');

router.get('/', (req, res) => {
    Book.find()
        .then( (data) => {
            // We got stuff back from the database (no error)
            console.log(`Got stuff back from Mongo: ${data}`);
            res.send(data)
        })
        .catch( (error) => {
            console.log(`Error from mongo: ${error}`);
            res.sendStatus(500); // Status for bad stuff happened
        });
});

router.post('/', (req, res) => {
    let bookData = req.body;
    console.log(`Got the book data from request:, ${bookData.title}`);
    let newBook = new Book(bookData);
    console.log(`New book is ${newBook}`);
    // newbook.save();
    newBook.save()
        .then( () => {
            res.sendStatus(201);
        })
        .catch((error) => {
            //bad stuff happened, but good servers still respond
            console.log('Error adding book:');
            res.sendStatus(500);
        });
});

router.delete('/', (req, res) => {
    // Delete doesn't use data, so we'll use PARAMS instead
    // data is req.body
    // params is req.query
    let bookId = req.query._id;
    console.log(`Id for request is ${req.query._id}`);
    Book.findByIdAndRemove(bookId)
        .then( () => {
            // good servers always respond. Say OK.
            console.log(`Id for request is`);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error removing book: ${error}`);
            res.sendStatus(500);
        });
});

router.put('/', (req, res) => {
    let bookData = req.body;
    // Put can send data, so gettin id from req.body
    Book.findByIdAndUpdate(bookData._id, bookData)
        .then( () => {
            console.log(`Updated book with id${bookData._id}`);
            res.sendStatus(200)
        })
        .catch( (error) => {
            console.log(`Error updating book with id ${bookData._id}: ${error}`);
            res.sendStatus(500);
        });
});

module.exports = router;
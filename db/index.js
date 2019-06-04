require('dotenv').config();
const mongoose = require('mongoose');

const fakeAuthor = require('./genData').createFakeAuthors;
const fakeBook = require('./genData').createFakeBooks;

mongoose.connect('mongodb://localhost:27017/goodreads', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', () => {
  console.log('Error connecting to mongo db');
});
db.once('open', () => {
  console.log('Connected to mongo db');
});

const authorSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  followers: Number,
  biography: String,
  author_image: String,
});

const bookSchema = new mongoose.Schema({
  _id: Number,
  title: String,
  year: Number,
  total_ratings: Number,
  average_rating: Number,
  description: String,
  cover_image: String,
  author_id: Number,
});

const Author = mongoose.model('author', authorSchema);
const Book = mongoose.model('book', bookSchema);

let id = 1;
let bookId = 1;

let authRecords = [];
let bookRecords = [];

console.log('Execution timer started...');
const startTimer = Date.now(); // start timer


const seedAuthors = (i) => {
  if (id <= 10000000) {
    for (let k = 0; k < 100000; k += 1) {
      authRecords.push(fakeAuthor(id));
      id += 1;
    }
    try {
      db.collection('authors').insertMany(authRecords)
        .then(() => {
          authRecords = [];
          seedAuthors(i + 1);
        });
    } catch (error) {
      console.log('Error inserting records: ', error);
    }
  } else {
    return;
  }
};

seedAuthors(0);


const seedBooks = (i) => {
  if (bookId <= 30000000) {
    for (let j = 0; j < 100000; j += 1) {
      bookRecords.push(fakeBook(bookId));
      bookId += 1;
    }
    try {
      db.collection('books').insertMany(bookRecords)
        .then(() => {
          bookRecords = [];
          seedBooks(i + 1);
        });
    } catch (error) {
      console.log('Error inserting records: ', error);
    }
  } else {
    const milliseconds = Date.now() - startTimer; // end timer
    console.log('Execution done after: ', Number.parseFloat(milliseconds / 60000).toFixed(2), ' minutes');
    return;
  }
};

seedBooks(0);

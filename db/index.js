require('dotenv').config();
const mongoose = require('mongoose');

const fakeAuthor = require('./genData').createFakeAuthors;

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
  books: Array,
});


const Author = mongoose.model('author', authorSchema);


let id = 1;
let authRecords = [];

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
    const milliseconds = Date.now() - startTimer; // end timer
    console.log('Execution done after: ', Number.parseFloat(milliseconds / 60000).toFixed(2), ' minutes');
    return;
  }
};

seedAuthors(0);

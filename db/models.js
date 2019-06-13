const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/goodreads', { useNewUrlParser: true, autoIndex: false });
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

let nextAuthorId;

Author.estimatedDocumentCount({}, (error, lastId) => {
  if (error) {
    console.log('Error finding next _id value: ', error);
  } else {
    nextAuthorId = lastId;
    console.log('Next _id value is : ', nextAuthorId);
  }
});


const getAuthorInfo = (authId, callback) => {
  Author.findById(authId).select('_id name followers biography author_image books').lean().exec((err, authInfo) => {
    if (err) {
      console.log('Error getting author and books info');
      callback(err, null);
    } else {
      const authData = authInfo;
      authData.titles = [];

      for (let i = 0; i < authData.books.length; i += 1) {
        authData.titles.push(authData.books[i].title);
      }
      callback(null, authData);
    }
  });
};

const deleteById = (id, callback) => {
  Author.remove({ _id: id }, (err) => {
    if (err) {
      console.log('Error deleting author: ', err);
      callback(err);
    } else {
      console.log('Deleted author sucessfully');
      callback(null);
    }
  });
};

const addAuthorAndBook = (author, callback) => {
  nextAuthorId += 1;
  author._id = nextAuthorId;
  Author.create(author, (err) => {
    if (err) {
      console.log('Create author and books error: ', err);
      callback(err);
    } else {
      console.log('Successfully created author and books');
      callback(null);
    }
  });
};

const updateById = (id, author, callback) => {
  Author.findByIdAndUpdate(id, author, (err) => {
    if (err) {
      console.log('Update by id error: ', err);
      callback(err);
    } else {
      console.log('Successfully updated by id');
      callback(null);
    }
  });
};


module.exports = {
  getAuthorInfo,
  deleteById,
  addAuthorAndBook,
  updateById,
  Author,
  db,
};

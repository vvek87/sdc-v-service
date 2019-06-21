const mongoose = require('mongoose');

const AutoIncrementFactory = require('mongoose-sequence');

require('dotenv').config();

// change url to aws ec2 if needed
mongoose.connect('mongodb://localhost:27017/goodreads', { useNewUrlParser: true });
const db = mongoose.connection;

const AutoIncrement = AutoIncrementFactory(db);

db.on('error', (err) => {
  console.log('Error connecting to mongo db:', err);
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
}, { _id: false });

authorSchema.plugin(AutoIncrement);

const Author = mongoose.model('author', authorSchema);


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
  delete author._id;
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

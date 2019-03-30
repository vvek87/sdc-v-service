const sequelize = require('./index.js');

// will implement use of the authorId variable
// let authorId = '';

const getAuthorInfo = (bookId, callback) => {
  const authorQuery = `SELECT name, followers, biography FROM authors WHERE id IN (SELECT author_id FROM books WHERE id = ${bookId})`;
  sequelize.sequelize.query(authorQuery)
    .then(([results]) => {
      // set authorId (from line 3) to be passed into getFiveBooks
      callback(null, results[0]);
    })
    .catch((err) => {
      console.log('err', err);
      callback(err);
    });
};

const getFiveBooks = (authorId, callback) => {
  console.log('authorId', authorId);
  const fiveBooksQuery = `SELECT title FROM books WHERE author_id = ${authorId} ORDER BY average_rating LIMIT 5`;
  sequelize.sequelize.query(fiveBooksQuery)
    .then(([results]) => {
      const fiveBooks = {};
      fiveBooks.titles = [];
      for (let i = 0; i < results.length; i += 1) {
        console.log(results[i]);
        fiveBooks.titles.push(results[i].title);
      }
      callback(null, fiveBooks);
    })
    .catch((err) => {
      console.log('err', err);
      callback(err);
    });
};

const getBookItemHoverWindow = (bookId, callback) => {
  // somehow need to grab the author's name in this query, too
  const bookQuery = `SELECT title, total_ratings, average_rating, year, description FROM books WHERE id = ${bookId}`;
  sequelize.sequelize.query(bookQuery)
    .then(([results]) => {
      callback(null, results[0]);
    })
    .catch((err) => {
      console.log('err', err);
      callback(err);
    });
};

exports.getAuthorInfo = getAuthorInfo;
exports.getFiveBooks = getFiveBooks;
exports.getBookItemHoverWindow = getBookItemHoverWindow;
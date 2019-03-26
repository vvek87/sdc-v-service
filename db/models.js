var sequelize = require('./index.js');

var authorId = '';

exports.getAuthorInfo = (bookId, callback) => {
  var authorQuery = `SELECT name, followers, biography FROM authors WHERE id IN (SELECT author_id FROM books WHERE id = ${bookId})`
  sequelize.sequelize.query(authorQuery)
    .then(([results, metadata]) => {
    // set authorId (from line 3) to be passed into getFiveBooks
    results = JSON.stringify(results)
    callback(null, results)
  })
    .catch((err) => {
      console.log('err', err);
    })
};

exports.getFiveBooks = (authorId, callback) => {
  console.log('authorId', authorId);
  var fiveBooksQuery = `SELECT title FROM books WHERE author_id = ${authorId} ORDER BY average_ratings LIMIT 5`;
  sequelize.sequelize.query(fiveBooksQuery)
    .then(([results, metadata]) => {
      results = JSON.stringify(results)
    callback(null, results)
  })
    .catch((err) => {
      console.log('err', err);
    })
};

exports.getBookItemHoverWindow = (bookId, callback) => {
  // somehow need to grab the author's name in this query, too
  var bookQuery = `SELECT title, total_ratings, average_ratings, year, description FROM books WHERE id = ${bookId}`;
  sequelize.sequelize.query(bookQuery)
    .then(([results, metadata]) => {
    callback(null, results)
  })
    .catch((err) => {
      console.log('err', err);
    })
};
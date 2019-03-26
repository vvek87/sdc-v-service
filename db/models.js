var sequelize = require('./index.js');

var authorId = '';

exports.getAuthorInfo = (bookId, callback) => {
  var authorQuery = `SELECT name, followers, biography FROM authors WHERE id IN (SELECT author_id FROM books WHERE id = ${bookId})`
  sequelize.sequelize.query(authorQuery).then(([results, metadata]) => {
    // set authorId (from line 3) to be passed into getFiveBooks
    callback(results)
  })
};

exports.getFiveBooks = (authorId, callback) => {
  var fiveBooksQuery = `SELECT title FROM books WHERE author_id = ${authorId} ORDER BY average_ratings LIMIT 5`;
  sequelize.query(fiveBooksQuery).then(([results, metadata]) => {
    callback(results)
  })
};

exports.getBookInfo = (bookId, callback) => {
  // somehow need to grab the author's name in this query, too
  var bookQuery = `SELECT title, total_ratings, average_ratings, year, description FROM books WHERE id = ${bookId}`;
  sequelize.query(bookQuery).then(([results, metadata]) => {
    callback(results)
  })
};
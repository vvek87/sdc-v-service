const ORM = require('./index.js');

const getFiveBooks = (authorId, callback) => {
  console.log('authorId', authorId);
  const fiveBooksQuery = `SELECT title FROM books WHERE author_id = ${authorId} ORDER BY average_rating LIMIT 5`;
  ORM.sequelize.query(fiveBooksQuery)
    .then(([results]) => {
      // separate out as its own function, then able to test its output
      const fiveBooks = {};
      fiveBooks.titles = [];
      for (let i = 0; i < results.length; i += 1) {
        fiveBooks.titles.push(results[i].title);
      }
      callback(null, fiveBooks);
    })
    .catch((err) => {
      console.log('err', err);
      callback(err);
    });
};

const getAuthorInfo = (bookId, callback) => {
  const authorQuery = `SELECT id, name, followers, biography FROM authors WHERE id IN (SELECT author_id FROM books WHERE id = ${bookId})`;
  ORM.sequelize.query(authorQuery)
    .then(([results]) => {
      const authorId = results[0].id;
      getFiveBooks(authorId, (err, books) => {
        console.log('books', books)
        if (err) { throw err; }
        // issue: the below query will only replace first element of books.title array
        ORM.sequelize.query('SELECT title, total_ratings, average_rating, year, description FROM books WHERE title = ?',
          { replacements: books.titles }
        ).then(details => {
          results[0].titles = books.titles;
          results[0].bookDetails = details;
          callback(null, results[0]);
        })
      });
    })
    .catch((err) => {
      console.log('err', err);
      callback(err);
    });
};

// can probably delete this function as it's no longer needed
const getBookItemHoverWindow = (bookId, callback) => {
  const bookQuery = `SELECT title, total_ratings, average_rating, year, description FROM books WHERE id = ${bookId}`;
  ORM.sequelize.query(bookQuery)
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

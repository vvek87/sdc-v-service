const faker = require('faker');
const moment = require('moment');
const ORM = require('./index.js');

const getFiveBooks = (authorId, callback) => {
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
  const authorQuery = `SELECT id, name, followers, biography, author_image FROM authors WHERE id IN (SELECT author_id FROM books WHERE id = ${bookId})`;
  ORM.sequelize.query(authorQuery)
    .then(([results]) => {
      const authorId = results[0].id;
      getFiveBooks(authorId, (err, books) => {
        if (err) { throw err; }
        ORM.sequelize.query('SELECT title, total_ratings, average_rating, year, description, cover_image FROM books WHERE title IN(:status)',
          { replacements: { status: books.titles } },
        ).then((details) => {
          results[0].titles = books.titles;
          results[0].bookDetails = details[0];
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

// CRUD implementations for SDC

const deleteById = (id, callback) => {
  const deleteBooks = `DELETE FROM books WHERE author_id = ${id}`;
  const deleteAuthor = `DELETE FROM authors WHERE id = ${id}`;
  ORM.sequelize.query(deleteBooks)
    .then(([bookResults]) => {
      console.log('delete book affected rows: ', bookResults.affectedRows);
      return ORM.sequelize.query(deleteAuthor)
        .then(([authResults]) => {
          console.log('delete author affected rows: ', authResults.affectedRows);
          callback(null);
        })
        .catch((err) => {
          console.log('delete author error', err);
          callback(err);
        });
    })
    .catch((err) => {
      console.log('delete books error', err);
      callback(err);
    });
};

const addAuthorAndBook = (author, book, callback) => {
  const authorQuery = `INSERT INTO authors (name, followers, biography, author_image, createdAt, updatedAt) VALUES ('${author.name}', '${author.followers}', '${author.biography}', '${author.author_image}', '${author.createdAt}', '${author.updatedAt}')`;
  ORM.sequelize.query(authorQuery)
    .then(([authResults]) => {
      console.log('add new author results: ', authResults);
      const bookQuery = `INSERT INTO books (title, year, total_ratings, average_rating, description, cover_image, author_id, createdAt, updatedAt) VALUES ('${book.title}', '${book.year}', '${book.total_ratings}', '${book.average_rating}', '${book.description}', '${book.cover_image}', '${authResults}', '${book.createdAt}', '${book.updatedAt}')`;
      return ORM.sequelize.query(bookQuery)
        .then(([bookResults]) => {
          console.log('add new book results: ', bookResults);
          callback(null);
        })
        .catch((err) => {
          console.log('error new adding book: ', err);
          callback(err);
        });
    })
    .catch((err) => {
      console.log('error adding new author', err);
      callback(err);
    });
};

const updateById = (id, author, callback) => {
  const updateQuery = `UPDATE authors SET name='${author.name}', followers='${author.followers}', biography='${author.biography}', author_image='${author.author_image}', createdAt='${author.createdAt}', updatedAt='${author.updatedAt}' WHERE id=${id}`;
  ORM.sequelize.query(updateQuery)
    .then(([results]) => {
      console.log('update by id results: ', results.affectedRows);
      callback(null);
    })
    .catch((err) => {
      console.log('update by id error: ', err);
      callback(err);
    });
};

module.exports = {
  getAuthorInfo,
  getFiveBooks,
  getBookItemHoverWindow,
  deleteById,
  addAuthorAndBook,
  updateById,
};

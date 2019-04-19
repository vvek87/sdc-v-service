const express = require('express');

const app = express();
const path = require('path');
const cors = require('cors');
const db = require('./db/models.js');


// app.use(express.static(path.join(__dirname, './client/public')));
app.use('/:id', express.static(`${__dirname}/client/public`));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post('/:id', (req, res) => {
  const bookId = req.body.bookId;
  console.log('bookId', bookId);
  db.getAuthorInfo(bookId, (err, results) => {
    if (err) { throw err; }
    res.send(results);
  });
});

// the below endpoint has been folded into the '/author' endpoint
app.get('/five-books-by-author', (req, res) => {
  db.getFiveBooks(46, (err, results) => {
    if (err) { throw err; }
    res.send(results);
  });
});

app.get('/book-item-hover-window', (req, res) => {
  db.getBookItemHoverWindow('Ergonomic Frozen Gloves', (err, results) => {
    if (err) { throw err; }
    res.send(results);
  });
});

app.listen(3002, () => {
  console.log('listening at 3002');
});

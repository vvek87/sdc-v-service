const express = require('express');

const app = express();
const path = require('path');
const db = require('./db/models.js');


app.use(express.static(path.join(__dirname, './client/public')));
app.use(express.urlencoded({ extended: false }));

app.post('/author', (req, res) => {
  let bookId = req.body.bookId;
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
  db.getBookItemHoverWindow(38, (err, results) => {
    if (err) { throw err; }
    res.send(results);
  });
});

app.listen(3002, () => {
  console.log('listening at 3002');
});

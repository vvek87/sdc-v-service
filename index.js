const express = require('express');

const app = express();
const path = require('path');
const db = require('./db/models.js');


app.use(express.static(path.join(__dirname, './client/public')));
app.use(express.urlencoded({ extended: false }));

app.get('/author', (req, res) => {
  db.getAuthorInfo(31, (err, results) => {
    if (err) { throw err; }
    res.send(results);
  });
});

app.get('/five-books-by-author', (req, res) => {
  db.getFiveBooks(41, (err, results) => {
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

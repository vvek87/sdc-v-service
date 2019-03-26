var express = require('express');
var app = express();
var db = require('./db/models.js');
var path = require('path');

app.use(express.static(path.join(__dirname, './client/public')));
app.use(express.urlencoded({extended: false}));

app.get('/author', (req, res) => {
  db.getAuthorInfo(11, (err, results) => {
    if (err) { throw err; }
    res.send(results);
  })
});

app.get('/five-books-by-author', (req, res) => {
  db.getFiveBooks(21, (err, results) => {
    if (err) { throw err; }
    res.send(results);
  })
});

app.get('/book-item-hover-window', (req, res) => {
  db.getBookItemHoverWindow(18, (err, results) => {
    if (err) { throw err; }
    res.send(results);
  })
});

app.listen(3002, () => {
  console.log('listeing at 3002')
})
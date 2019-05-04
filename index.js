const express = require('express');
require('dotenv').config();

const app = express();
const path = require('path');
const cors = require('cors');
const db = require('./db/models.js');


app.use(express.static(path.join(__dirname, './client/public')));
app.use('/:id', express.static(`${__dirname}/client/public`));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/author/:id', (req, res) => {
  const bookId = req.params.id;
  db.getAuthorInfo(bookId, (err, results) => {
    if (err) { throw err; }
    res.header('Access-Control-Allow-Origin', '*');
    res.send(results);
  });
});

const port = process.env.PORT || 3002;

app.listen(3009, () => {
  console.log(`listeninffg at ${port}`);
});

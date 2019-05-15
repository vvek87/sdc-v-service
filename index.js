const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const path = require('path');
const cors = require('cors');
const db = require('./db/models.js');

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, './client/public')));
app.use('/:id', express.static(`${__dirname}/client/public`));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.get('/author/:id', (req, res) => {
  const bookId = req.params.id;
  db.getAuthorInfo(bookId, (err, results) => {
    if (err) { throw err; }
    res.header('Access-Control-Allow-Origin', '*');
    res.send(results);
  });
});

// CRUD implementations for SDC

app.delete('/delete/:id', (req, res) => {
  const deleteId = req.params.id;
  db.deleteById(deleteId, (err) => {
    if (err) {
      console.log('delete by id server error');
      res.send(500);
    }
    res.header('Access-Control-Allow-Origin', '*');
    res.send(200);
  });
});


const port = process.env.PORT || 3002;

app.listen(3002, () => {
  console.log(`listening at ${port}`);
});

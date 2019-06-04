const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const path = require('path');
const cors = require('cors');
// const db = require('./db/models.js');
const genData = require('./db/genData.js');

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

// ADJUSTED TO TEST MONGOOSE QUERIES

app.get('/author/:id', (req, res) => {
  // const bookId = req.params.id;
  // db.getAuthorInfo(bookId, (err, results) => {
  //   if (err) {
  //     console.log('Get author and books by id error: ', err);
  //     res.send(404);
  //   }
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.send(results);
  // });
  res.send(200);
});

// CRUD implementations for SDC

// app.delete('/delete/:id', (req, res) => {
//   const deleteId = req.params.id;
//   db.deleteById(deleteId, (err) => {
//     if (err) {
//       console.log('delete by id server error');
//       res.send(500);
//     }
//     res.send(200);
//   });
// });

// app.post('/create', (req, res) => { // take note of front end results if using new id such as 101 in url
//   const author = genData.createFakeAuthors();
//   const book = genData.createFakeBooks();
//   db.addAuthorAndBook(author, book, (err) => {
//     if (err) {
//       console.log('add new author server error');
//       res.send(500);
//     }
//     res.send(200);
//   });
// });

// app.put('/update/:id', (req, res) => {
//   const updateId = req.params.id;
//   const author = genData.createFakeAuthors();
//   db.updateById(updateId, author, (err) => {
//     if (err) {
//       console.log('update by id server error');
//       res.send(500);
//     }
//     res.send(200);
//   });
// });

const port = process.env.PORT || 3002;

app.listen(3002, () => {
  console.log(`listening at ${port}`);
});

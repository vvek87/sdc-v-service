const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const path = require('path');
const cors = require('cors');
const db = require('./db/models.js');
const genData = require('./db/genData.js');

const port = process.env.PORT || 3002;

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, './client/public')));
app.use('/:id', express.static(`${__dirname}/client/public`));
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.get('/author/:id', (req, res) => {
  db.getAuthorInfo(req.params.id, (err, results) => {
    if (err) {
      console.log('Get author and books by id error: ', err);
      res.send(404);
    }
    res.send(results);
  });
});

app.delete('/delete/:id', (req, res) => {
  db.deleteById(req.params.id, (err) => {
    if (err) {
      console.log('delete by id server error');
      res.send(500);
    }
    res.send(200);
  });
});

app.post('/create', (req, res) => {
  const author = genData.createFakeAuthors();
  db.addAuthorAndBook(author, (err) => {
    if (err) {
      console.log('add new author server error');
      res.send(500);
    }
    res.send(200);
  });
});

app.put('/update/:id', (req, res) => {
  const author = genData.createFakeAuthors(req.params.id);
  db.updateById(req.params.id, author, (err) => {
    if (err) {
      console.log('update by id server error');
      res.send(500);
    }
    res.send(200);
  });
});


app.listen(3002, () => {
  console.log(`listening at ${port}`);
});

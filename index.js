const express = require('express');

const app = express();
const path = require('path');
const cors = require('cors');
const db = require('./db/models.js');

app.use(express.static(path.join(__dirname, './client/public')));
app.use('/:id', express.static(`${__dirname}/client/public`));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/author/:id', (req, res) => {
  console.log('inside /author/:id');
  const bookId = req.params.id;
  db.getAuthorInfo(bookId, (err, results) => {
    if (err) { throw err; }
    res.send(results);
  });
});

// const port = env.process.PORT || 3002;

app.listen(3002, () => {
  console.log(`listening at 3002`);
});

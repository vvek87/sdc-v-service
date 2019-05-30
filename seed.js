const faker = require('faker');
const fs = require('fs');
const copyFrom = require('pg-copy-streams').from;

const wsAuth = fs.createWriteStream('authors.csv', { encoding: 'utf8' });
const wsBook = fs.createWriteStream('books.csv', { encoding: 'utf8' });

const records = 10000000;


const createFakeAuthors = id => ({
  id,
  name: faker.name.findName(),
  followers: faker.random.number(),
  biography: faker.lorem.paragraph(),
  author_image: faker.image.people(),
});

const createFakeBooks = id => ({
  id,
  title: faker.commerce.productName(),
  year: faker.random.number({ min: 1900, max: 2019 }),
  total_ratings: faker.random.number(),
  average_rating: faker.random.number({ min: 1, max: 5 }),
  description: faker.lorem.paragraph(),
  cover_image: faker.image.city(),
  author_id: faker.random.number({ min: 1, max: records }),
});


let id = 0;

let auth;
let book;

let authStr = '';
let bookStr = '';


console.log('Execution timer started...');
const startTimer = Date.now(); // start timer

const writeAll = (i) => {
  let okAuth = true;
  let okBook = true;

  if (id < records) {
    id += 1;
    auth = createFakeAuthors(id);
    book = createFakeBooks(id);
    authStr = `${id},${auth.name},${auth.followers},${auth.biography},${auth.author_image}\n`;
    bookStr = `${id},${book.title},${book.year},${book.total_ratings},${book.average_rating},${book.description},${book.cover_image},${book.author_id}\n`;
  } else {
    console.log('Created authors.csv and books.csv');
    console.log('Inserting csv files into db');
    csvImport();
    return;
  }
  okAuth = wsAuth.write(authStr);
  okBook = wsBook.write(bookStr);

  if (okAuth) {
    writeAll(i + 1);
  } else {
    wsAuth.once('drain', () => {
      writeAll(i + 1);
    });
  }
};

writeAll(0);

const { Pool } = require('pg');

const csvImport = () => {
  const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'goodreads',
    password: 'pass',
  });

  pool.on('error', (err) => {
    console.log('pool.on Error: ', err);
  });

  pool.connect((err, client, done) => {
    if (err) {
      console.log('pool.connect for authors.csv Error: ', err);
    }
    const stream = client.query(copyFrom('COPY authors FROM STDIN CSV'), (error) => {
      if (error) {
        console.log('stream for authors.csv Error: ', error);
      }
    });
    const fileStream = fs.createReadStream('authors.csv');
    fileStream.on('error', done);
    stream.on('error', done);
    stream.on('end', done);
    fileStream.pipe(stream);
  });

  pool.connect((err, client, done) => {
    if (err) {
      console.log('pool.connect for books.csv Error: ', err);
    }
    const stream = client.query(copyFrom('COPY books FROM STDIN CSV'), (error) => {
      if (error) {
        console.log('stream for books.csv Error: ', error);
      }
    });
    const fileStream = fs.createReadStream('books.csv');
    fileStream.on('error', done);
    stream.on('error', done);
    stream.on('end', done);
    fileStream.pipe(stream);
  });
  const milliseconds = Date.now() - startTimer; // end timer
  console.log('Execution done after: ', Number.parseFloat(milliseconds / 60000).toFixed(2), ' minutes');
};

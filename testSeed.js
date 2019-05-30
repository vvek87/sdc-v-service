const faker = require('faker');
const fastcsv = require('fast-csv');
const fs = require('fs');
const copyFrom = require('pg-copy-streams').from;



const wsAuth = fs.createWriteStream('authors.csv', { encoding: 'utf8' }); // need these for seed
const wsBook = fs.createWriteStream('books.csv', { encoding: 'utf8' });

const records = 10000000;

// console.log('SEEDING STARTED...');
// const startTimer = Date.now(); // start timer


const createFakeAuthors = (id) => {
  return {
    id,
    name: faker.name.findName(),
    followers: faker.random.number(),
    biography: faker.lorem.paragraph(),
    author_image: faker.image.people(),
  };
};

const createFakeBooks = (id) => {
  return {
    id,
    title: faker.commerce.productName(),
    year: faker.random.number({ min: 1900, max: 2019 }),
    total_ratings: faker.random.number(),
    average_rating: faker.random.number({ min: 1, max: 5 }),
    description: faker.lorem.paragraph(),
    cover_image: faker.image.city(),
    author_id: faker.random.number({ min: 1, max: records }),
  };
};


let authors = new Array(2500000);
let books = new Array(2500000);

let genAuth;
let genBook;

let id = 0;

let auth;
let book;

let authStr = '';
let bookStr = '';

console.log('Seeding started...');
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
    const milliseconds = Date.now() - startTimer; // end timer
    console.log('Seeding done after: ', Number.parseFloat(milliseconds / 60000).toFixed(2), ' minutes');
    console.log('created authors.csv and books.csv');
    csvImport();
    return;
  }
  okAuth = wsAuth.write(authStr);
  okBook = wsBook.write(bookStr); // works without checking okBook, possibly remove this var
  if (okAuth) {
    writeAll(i + 1);
  } else {
    wsAuth.once('drain', () => {
      writeAll(i + 1);
    });
  }
};

writeAll(0); // need for seed

const { Client, Pool } = require('pg');

// const client = new Client({
//   host: 'localhost',
//   port: 5432,
//   user: 'postgres',
//   password: 'pass',
//   database: 'goodreads',
// })

const csvImport = () => {
  const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'goodreads',
    password: 'pass',
  });

  pool.on('error', (err) => {
    console.log('pool.on---', err)
  })

  pool.connect((err, client, done) => {
    console.log('test--- authors')
    if (err) {
      console.log('ERROR---------', err)
    }
    const stream = client.query(copyFrom('COPY authors FROM STDIN CSV'), (error) => {
      if (error) {
        console.log('stream error----', error)
      }
    });
    const fileStream = fs.createReadStream('authors.csv')
    fileStream.on('error', done);
    stream.on('error', done);
    stream.on('end', done);
    fileStream.pipe(stream);
  });

  pool.connect((err, client, done) => {
    console.log('test--- books')
    if (err) {
      console.log('ERROR---------', err)
    }
    var stream = client.query(copyFrom('COPY books FROM STDIN CSV'), (err) => {
      if (err) {
        console.log('stream error----', err)
      }
    });
    var fileStream = fs.createReadStream('books.csv')
    fileStream.on('error', done);
    stream.on('error', done);
    stream.on('end', done);
    fileStream.pipe(stream);
  });
};



// MAIN WORKING CODE BLOCK vvvvvvv------------------------------------------

// for (let k = 1; k <= 10; k += 1) {
//   for (let i = 0; i < records / 2; i += 1) {
//     genBook = createFakeBooks(id);
//     genAuth = createFakeAuthors(id);
//     tempBooks.push(genBook);
//     genBook = null;
//     tempAuths.push(genAuth);
//     genAuth = null;
//     id += 1;
//   }
//   books = books.concat(tempBooks);
//   authors = authors.concat(tempAuths);
//   tempBooks = null;
//   tempAuths = null;
//   tempBooks = [];
//   tempAuths = [];
// }

// fastcsv
//   .write(books, { headers: true })
//   .pipe(wsBooks);

// fastcsv
//   .write(authors, { headers: true })
//   .pipe(wsAuth);


// ---WORKING CODE BLOCK END ^^^^^^^--------------------------------------

// for (let i = 0; i <= 2500000; i += 1) {
//   // genBook = createFakeBooks(i);
//   // genAuth = createFakeAuthors(i);
//   books[i] = createFakeBooks(id);
//   authors[i] = createFakeAuthors(id);
//   id += 1;
// }

// for (let i = 2500001; i <= 5000000; i += 1) {
//   // genBook = createFakeBooks(i);
//   // genAuth = createFakeAuthors(i);
//   books[i] = createFakeBooks(id);
//   authors[i] = createFakeAuthors(id);
//   id += 1;
// }

// for (let i = 5000001; i <= 7500000; i += 1) {
//   // genBook = createFakeBooks(i);
//   // genAuth = createFakeAuthors(i);
//   books[i] = createFakeBooks(id);
//   authors[i] = createFakeAuthors(id);
//   id += 1;
// }

// fastcsv
//   .write(books, { headers: true })
//   .pipe(wsBooks);

// fastcsv
//   .write(authors, { headers: true })
//   .pipe(wsAuth);

// async function f() {

//   let promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("done!"), 1000)
//   });

//   let result = await promise; // wait till the promise resolves (*)

//   alert(result); // "done!"
// }

// f();

// test1 = test1.concat(test2);
// test1 = test1.concat(test3);
// auth1 = auth1.concat(auth2);
// auth1 = auth1.concat(auth3);

// fastcsv
//   .write(test1, { headers: true })
//   .pipe(wsBooks);

// fastcsv
//   .write(auth1, { headers: true })
//   .pipe(wsAuth);


// fastcsv
//   .write(books, { headers: true })
//   .pipe(wsBooks);

// fastcsv
//   .write(authors, { headers: true })
//   .pipe(wsAuth);


// books = books.concat(tempBooks);
// authors = authors.concat(tempAuths);

// fastcsv
//   .write(books, { headers: true })
//   .pipe(wsBooks);

// fastcsv
//   .write(authors, { headers: true })
//   .pipe(wsAuth);

// for (let i = records / 2; i <= records; i += 1) {
//   genBook = createFakeBooks(i); //i instead of id test
//   genAuth = createFakeAuthors(i); //i instead of id test
//   booksTwo[i] = genBook;
//   // genBook = null;
//   authorsTwo[i] = genAuth;
//   // genAuth = null;
//   // id += 1;
// }

//   fastcsv
//   .write(books, { headers: true })
//   .pipe(wsBooks);

// fastcsv
//   .write(authors, { headers: true })
//   .pipe(wsAuth);

//   fastcsv
//   .write(booksTwo, { headers: true })
//   .pipe(wsBooks);

// fastcsv
//   .write(authorsTwo, { headers: true })
//   .pipe(wsAuth);

// tempBooks = null;
// tempAuths = null;
// tempBooks = [];
// tempAuths = [];



// fastcsv
//   .write(books, { headers: true })
//   .pipe(wsBooks);

// fastcsv
//   .write(authors, { headers: true })
//   .pipe(wsAuth);

// const milliseconds = Date.now() - startTimer; // end timer
// console.log('SEEDING DONE AFTER: ', Number.parseFloat(milliseconds / 1000).toFixed(2), ' seconds');
// console.log('books.csv and authors.csv created');


// const createFakeAuthors = () => ({
//   name: faker.name.findName(),
//   followers: faker.random.number(),
//   biography: faker.lorem.paragraph(),
//   author_image: faker.image.people(),
//   createdAt: faker.date.past(),
//   updatedAt: faker.date.past(),
// });


// const createFakeBooks = () => ({
//   title: faker.commerce.productName(),
//   year: faker.random.number({ min: 1900, max: 2019 }),
//   total_ratings: faker.random.number(),
//   average_rating: faker.random.number({ min: 1, max: 5 }),
//   description: faker.lorem.paragraph(),
//   cover_image: faker.image.city(),
//   author_id: faker.random.number({ min: 1, max: records }),
//   createdAt: faker.date.past(),
//   updatedAt: faker.date.past(),
// });
const faker = require('faker');
const fastcsv = require('fast-csv');
const fs = require('fs');

const wsBooks = fs.createWriteStream('books.csv');
const wsAuth = fs.createWriteStream('authors.csv');

const records = 1000000;

console.log('SEEDING STARTED...');
const startTimer = Date.now(); // start timer

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

const createFakeAuthors = (id) => {
  return {
    id,
    name: faker.name.findName(),
    followers: faker.random.number(),
    biography: faker.lorem.paragraph(),
    author_image: faker.image.people(),
  };
};


let books = [];
let authors = [];

let tempBooks = [];
let tempAuths = [];

let genBook;
let genAuth;

let id = 1;

for (let k = 1; k <= 10; k += 1) {
  for (let i = 0; i < records / 2; i += 1) {
    genBook = createFakeBooks(id);
    genAuth = createFakeAuthors(id);
    tempBooks.push(genBook);
    genBook = null;
    tempAuths.push(genAuth);
    genAuth = null;
    id += 1;
  }
  books = books.concat(tempBooks);
  authors = authors.concat(tempAuths);
  tempBooks = null;
  tempAuths = null;
  tempBooks = [];
  tempAuths = [];
}

fastcsv
  .write(books, { headers: true }) // headers true or false?
  .pipe(wsBooks);

fastcsv
  .write(authors, { headers: true })
  .pipe(wsAuth);


// for (let i = 0; i < records; i += 1) {
//   bookObj = createFakeBooks();
//   authObj = createFakeAuthors();
//   books.push(bookObj);
//   bookObj = null;
//   authors.push(authObj);
//   authObj = null;
// }


// for (let i = 0; i < records / 10; i += 1) {
//   books.push(createFakeBooks());
//   authors.push(createFakeAuthors());
// }


// fastcsv
//   .write(books, { headers: true })
//   .pipe(wsBooks);

// fastcsv
//   .write(authors, { headers: true })
//   .pipe(wsAuth);

const milliseconds = Date.now() - startTimer; // end timer
console.log('SEEDING DONE AFTER: ', Number.parseFloat(milliseconds / 1000).toFixed(2), ' seconds');
console.log('books.csv and authors.csv created');


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
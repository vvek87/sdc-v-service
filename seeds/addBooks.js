const faker = require('faker');
const fastcsv = require('fast-csv'); // for testing csv
const fs = require('fs'); // for testing csv

const ws = fs.createWriteStream('books.csv'); // for testing csv

const records = 1000;

const createFakeBooks = () => ({
  title: faker.commerce.productName(),
  year: faker.random.number({ min: 1900, max: 2019 }),
  total_ratings: faker.random.number(),
  average_rating: faker.random.number({ min: 1, max: 5 }),
  description: faker.lorem.paragraph(),
  cover_image: faker.image.city(),
  author_id: faker.random.number({ min: 1, max: records }),
  // createdAt: faker.date.past(),
  // updatedAt: faker.date.past(),
});

exports.seed = () => {
  const fakeBooks = [];
  const desiredBooks = records;
  for (let i = 0; i < desiredBooks; i += 1) {
    fakeBooks.push(createFakeBooks());
  }
  fastcsv
    .write(fakeBooks, { headers: true })
    .pipe(ws);
};


// exports.seed = (knex) => {
//   return knex('books').del()
//     .then(() => {
//       const startBooksTimer = Date.now(); // start timer
//       const fakeBooks = [];
//       const desiredBooks = records;
//       for (let i = 0; i < desiredBooks; i += 1) {
//         fakeBooks.push(createFakeBooks());
//       }
//       const milliseconds = Date.now() - startBooksTimer; // end timer
//       console.log('TIME FOR BOOKS: ', Number.parseFloat(milliseconds / 1000).toFixed(2), ' seconds');
//       return knex.batchInsert('books', fakeBooks, 5000);
//     });
// };
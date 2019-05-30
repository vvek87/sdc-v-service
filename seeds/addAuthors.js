const faker = require('faker');
const fastcsv = require('fast-csv'); // for testing csv
const fs = require('fs'); // for testing csv

const ws = fs.createWriteStream('authors.csv'); // for testing csv

const createFakeAuthors = (id) => ({
  id,
  name: faker.name.findName(),
  followers: faker.random.number(),
  biography: faker.lorem.paragraph(),
  author_image: faker.image.people(),
});

// exports.seed = () => {
//   const authors = [];
//   const desiredAuthors = 1000;
//   for (let i = 0; i < desiredAuthors; i += 1) {
//     authors.push(createFakeAuthors());
//   }
//   fastcsv
//     .write(authors, { headers: true })
//     .pipe(ws);
// };



exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('authors').del()
    .then(() => {
      const startAuthorsTimer = Date.now(); // start timer
      const authors = [];
      const desiredAuthors = 5000;
      for (let i = 1; i <= desiredAuthors; i += 1) {
        authors.push(createFakeAuthors(i));
      }
      const milliseconds = Date.now() - startAuthorsTimer; // end timer
      console.log('TIME FOR AUTHORS: ', Number.parseFloat(milliseconds / 1000).toFixed(2), ' seconds');
      return knex.batchInsert('authors', authors, 5000);
    });
};
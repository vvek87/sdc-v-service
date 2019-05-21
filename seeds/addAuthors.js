const faker = require('faker');

const createFakeAuthors = () => ({
  name: faker.name.findName(),
  followers: faker.random.number(),
  biography: faker.lorem.paragraph(),
  author_image: faker.image.people(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
});

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('authors').del()
    .then(() => {
      const startAuthorsTimer = Date.now(); // start timer
      const authors = [];
      const desiredAuthors = 1000000;
      for (let i = 0; i < desiredAuthors; i += 1) {
        authors.push(createFakeAuthors());
      }
      const milliseconds = Date.now() - startAuthorsTimer; // end timer
      console.log('TIME FOR AUTHORS: ', Number.parseFloat(milliseconds / 1000).toFixed(2), ' seconds');
      return knex.batchInsert('authors', authors, 5000);
    });
};

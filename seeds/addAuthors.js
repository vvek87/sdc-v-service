const faker = require('faker');
// const knex = require('../knexfile.js');


const createFakeAuthors = () => ({
  name: faker.name.findName(),
  followers: faker.random.number(),
  biography: faker.lorem.paragraph(),
  author_image: faker.image.people(),
  // createdAt: faker.date.past(),
  // updatedAt: faker.date.past(),
});

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('authors').del()
    .then(() => {
      const authors = [];
      const desiredAuthors = 100;
      for (let i = 0; i < desiredAuthors; i += 1) {
        authors.push(createFakeAuthors());
      }
      return knex('authors').insert(authors);
    });
};

const faker = require('faker');
const knex = require('../knexfile.js')


var createFakeAuthors = () => ({
  name: faker.name.findName(),
  followers: faker.random.number(),
  biography: faker.lorem.paragraph(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.past()
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('authors').del()
    .then(function () {
      var authors = [];
      var desiredAuthors = 10;
      for (var i = 0; i < desiredAuthors; i++) {
        authors.push(createFakeAuthors());
      }
      return knex('authors').insert(authors);
    });
};

var faker = require('faker');

var createFakeBooks = () => ({
  title: faker.commerce.productName(),
  year: faker.random.number({'min': 1900, 'max': 2019}),
  total_ratings: faker.random.number(),
  average_ratings: faker.random.number({'min': 0, 'max': 5}),
  description: faker.lorem.paragraph(),
  cover_image: faker.image.imageUrl(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.past()
})

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      var fakeBooks = [];
      var desiredBooks = 10;
      for (var i = 0; i < desiredBooks; i++) {
        fakeBooks.push(createFakeBooks())
      }
      // Inserts seed entries
      return knex('books').insert(fakeBooks);
    });
};


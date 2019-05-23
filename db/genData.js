const faker = require('faker');

const createFakeAuthors = () => ({
  name: faker.name.findName(),
  followers: faker.random.number(),
  biography: faker.lorem.paragraph(),
  author_image: faker.image.people(),
});

const createFakeBooks = () => ({
  title: faker.commerce.productName(),
  year: faker.random.number({ min: 1900, max: 2019 }),
  total_ratings: faker.random.number(),
  average_rating: faker.random.number({ min: 1, max: 5 }),
  description: faker.lorem.paragraph(),
  cover_image: faker.image.city(),
  author_id: faker.random.number({ min: 1, max: 100 }),
});

module.exports = {
  createFakeAuthors,
  createFakeBooks,
};


  // createdAt: moment(faker.date.past()).format('YYYY-MM-DD HH-mm-ss'),
  // updatedAt: moment(faker.date.past()).format('YYYY-MM-DD HH-mm-ss'),
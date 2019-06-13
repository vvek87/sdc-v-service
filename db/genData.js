const faker = require('faker');

const createFakeBooks = () => ({
  title: faker.commerce.productName(),
  year: faker.random.number({ min: 1900, max: 2019 }),
  total_ratings: faker.random.number(),
  average_rating: faker.random.number({ min: 1, max: 5 }),
  description: faker.lorem.paragraph(),
  cover_image: faker.image.city(),
});

const createFakeAuthors = (id) => {
  const author = {
    _id: id,
    name: faker.name.findName(),
    followers: faker.random.number(),
    biography: faker.lorem.paragraph(),
    author_image: faker.image.people(),
    books: [],
  };

  for (let i = 1; i <= faker.random.number({ min: 1, max: 5 }); i += 1) {
    author.books.push(createFakeBooks());
  }
  return author;
};

module.exports = {
  createFakeAuthors,
  createFakeBooks,
};

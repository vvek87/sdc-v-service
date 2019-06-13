const faker = require('faker');
const fakeBook = require('./db/genData.js').createFakeBooks;


function generateAuthor(userContext, events, next) {
  // generate data with Faker:
  const id = faker.random.number();
  const name = faker.name.findName();
  const followers = faker.random.number();
  const biography = faker.lorem.paragraph();
  const authorImage = faker.image.people();
  const books = [fakeBook(), fakeBook(), fakeBook()];
  // add variables to virtual user's context:
  userContext.vars.id = id;
  userContext.vars.name = name;
  userContext.vars.followers = followers;
  userContext.vars.biography = biography;
  userContext.vars.authorImage = authorImage;
  userContext.vars.books = books;
  // continue with executing the scenario:
  return next();
}

module.exports = {
  generateAuthor,
};

// integration tests example: hitting a live database;
// unit tests example: mocking a database response

const models = require('../../db/models.js');

describe('test query results from getAuthorInfo', () => {
  test('returns the correct properties after a query', () => {
    const bookId = 1;
    models.getAuthorInfo(bookId, (err, info) => {
      if (err) { throw err; }
      expect(info).toHaveProperty('name');
      expect(info).toHaveProperty('followers');
      expect(info).toHaveProperty('biography');
    });
  });
  test('returns the expected types for each property', () => {
    const bookId = 1;
    models.getAuthorInfo(bookId, (err, info) => {
      if (err) { throw err; }
      expect(info).toHaveProperty('name');
      expect(info).toHaveProperty('followers');
      expect(info).toHaveProperty('biography');
    });
  });
});

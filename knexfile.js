// Update with your config settings.
const path = require('path');

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: null,
      database: 'goodreads',
    },
    seeds: {
      directory: path.join(__dirname, '/seeds'),
    },
  },
};

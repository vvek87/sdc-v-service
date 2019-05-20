require('dotenv').config();
const path = require('path');

module.exports = {
  development: {
    client: 'postgres',
    connection: {
      user: 'postgres',
      password: 'pass',
      database: 'goodreads',
    },
    migrations: {
      directory: path.join(__dirname, '/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/seeds'),
    },
  },
};

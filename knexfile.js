require('dotenv').config();
const path = require('path');

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      user: 'root',
      password: '',
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

require('dotenv').config();
const path = require('path');

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.MYSQL_ROOT_PASSWORD,
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

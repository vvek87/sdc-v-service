require('dotenv').config();
const path = require('path');

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'test-db.cclabwvon2vx.us-west-1.rds.amazonaws.com',
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

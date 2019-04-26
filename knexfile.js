// Update with your config settings.
const path = require('path');

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'test-db.cclabwvon2vx.us-west-1.rds.amazonaws.com',
      user: 'jxb345',
      password: 'm0dernfam1ly',
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

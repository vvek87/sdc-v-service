// Update with your config settings.

  module.exports = {
    development: {
      client: 'mysql',
      connection: {
        host: 'localhost',
        user: 'root',
        password: null,
        database: 'goodreads'
      },
      seeds: {
        directory: __dirname + "/seeds"
      }
    }
  }



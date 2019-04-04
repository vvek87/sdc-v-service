const Sequelize = require('sequelize');

const sequelize = new Sequelize('goodreads', 'root', null, {
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('connection connected!');
  })
  .catch((err) => {
    console.error('unable to connect to db', err);
  });

const Authors = sequelize.define('authors', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  followers: Sequelize.INTEGER,
  biography: Sequelize.TEXT,
});

const Books = sequelize.define('books', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  year: Sequelize.INTEGER,
  total_ratings: Sequelize.INTEGER,
  average_ratings: Sequelize.DECIMAL,
  description: Sequelize.TEXT,
  cover_image: Sequelize.TEXT,
  author_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Authors,
      key: 'id',
    },
  },
});

// need to add and/or fix associations
Books.belongsTo(Authors);

Authors.sync();
Books.sync();

exports.Authors = Authors;
exports.Books = Books;
exports.sequelize = sequelize;

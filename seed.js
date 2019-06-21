const fakeAuthor = require('./db/genData').createFakeAuthors;

const { db } = require('./db/models.js');

let id = 1;
let authRecords = [];

console.log('Execution timer started...');
const startTimer = Date.now(); // start timer

const seedAuthors = (i) => {
  if (id <= 10000000) {
    for (let k = 0; k < 100000; k += 1) {
      authRecords.push(fakeAuthor(id));
      id += 1;
    }
    try {
      db.collection('authors').insertMany(authRecords)
        .then(() => {
          authRecords = [];
          seedAuthors(i + 1);
        });
    } catch (error) {
      console.log('Error inserting records: ', error);
    }
  } else {
    const milliseconds = Date.now() - startTimer; // end timer
    console.log('Execution done after: ', Number.parseFloat(milliseconds / 60000).toFixed(2), ' minutes');
    return;
  }
};

seedAuthors(0);

db.collection('counters').insert({ id: '_id', reference_value: null, seq: 10000000 });

const pg = require('pg');
const dotenv = require('dotenv');

const conString = process.env.DATABASE_URL; // Can be found in the Details page
const client = new pg.Client(conString);
client.connect((error) => {
  if (error) {
    console.log(conString);
    console.error('could not connect to postgres', error);
  }
  client.query('SELECT NOW() AS "theTime"', (err, result) => {
    if (err) {
      console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    // >> output: 2018-08-23T14:02:57.117Z
    client.end();
  });
});

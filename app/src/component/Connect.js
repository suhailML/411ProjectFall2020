const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/movieapp.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the movies database.');
  });

let sql = `SELECT DISTINCT title name FROM movies`;

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row.name);
  });
});

// close the database connection
db.close();
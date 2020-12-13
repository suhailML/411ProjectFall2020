// bookshelf-app/server/db.js

// Import path module
const path = require('path');

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite');

// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
});


knex.schema
// Make sure no "events" table exists
// before trying to create new
.hasTable('events')
  .then((exists) => {
    if (!exists) {
      // If no "books" table exists
      // create new, with "id", "author", "title",
      // "pubDate" and "rating" columns
      // and use "id" as a primary identification
      // and increment "id" with every new record (book)
      return knex.schema.createTable('events', (table)  => {
        table.increments('id').primary();
        table.string('clubName');
        table.string('mediaTitle');
        table.string('mediaID');
        table.string('date');
        table.string('time');;
        table.string('eventDescription');
      })
      .then(() => {
        // Log success message
        console.log('Table \'Events\' created');
      })
      .catch((error) => {
        console.error(`There was an error creating table: ${error}`);
      });
    }
  })
  .then(() => {
    // Log success message
    console.log('done');
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

knex.schema
// Make sure no "books" table exists
// before trying to create new
.hasTable('movies')
  .then((exists) => {
    if (!exists) {
      // If no "books" table exists
      // create new, with "id", "author", "title",
      // "pubDate" and "rating" columns
      // and use "id" as a primary identification
      // and increment "id" with every new record (book)
      return knex.schema.createTable('movies', (table)  => {
        table.increments('id').primary();
        table.string('movidAPIid');
        table.string('movieTitle');
        table.integer('genreID');
        table.string('poster_url');
        table.integer('IMBDscore');
      })
      .then(() => {
        // Log success message
        console.log('Table \'Movies\' created');
      })
      .catch((error) => {
        console.error(`There was an error creating table: ${error}`);
      });
    }
  })
  .then(() => {
    // Log success message
    console.log('done');
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

  knex.schema
  // Make sure no "books" table exists
  // before trying to create new
  .hasTable('genres')
    .then((exists) => {
      if (!exists) {
        // If no "books" table exists
        // create new, with "id", "author", "title",
        // "pubDate" and "rating" columns
        // and use "id" as a primary identification
        // and increment "id" with every new record (book)
        return knex.schema.createTable('genres', (table)  => {
          table.increments('id').primary();
          table.int('genreID');
          table.string('genreName');
        })
        .then(() => {
          // Log success message
          console.log('Table \'Genres\' created');
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

    knex.schema
    // Make sure no "books" table exists
    // before trying to create new
    .hasTable('recentlyWatched')
      .then((exists) => {
        if (!exists) {
          // If no "books" table exists
          // create new, with "id", "author", "title",
          // "pubDate" and "rating" columns
          // and use "id" as a primary identification
          // and increment "id" with every new record (book)
          return knex.schema.createTable('recentlyWatched', (table)  => {
            table.increments('id').primary()
            table.string('movieTitle')
            table.int('movieID')
            table.string('userID')
            table.string('location')
            table.string('date')
            table.string('time')
          })
          .then(() => {
            // Log success message
            console.log('Table \'recentlyWatched\' created')
          })
          .catch((error) => {
            console.error(`There was an error creating table: ${error}`)
          })
        }
      })
      .then(() => {
        // Log success message
        console.log('done')
      })
      .catch((error) => {
        console.error(`There was an error setting up the database: ${error}`)
      })

      knex.schema
      // Make sure no "books" table exists
      // before trying to create new
      .hasTable('userInfo')
        .then((exists) => {
          if (!exists) {
            // If no "books" table exists
            // create new, with "id", "author", "title",
            // "pubDate" and "rating" columns
            // and use "id" as a primary identification
            // and increment "id" with every new record (book)
            return knex.schema.createTable('userInfo', (table)  => {
              table.increments('id').primary()
              table.string('firstName')
              table.string('lastName')
              table.string('email')
              table.string('birthdayDate')
              table.string('userName')
              table.string('locality')
              table.string('year')
              table.string('clubAffiliations')
              table.string('watchedMovies')
            })
            .then(() => {
              // Log success message
              console.log('Table \'userInfo\' created')
            })
            .catch((error) => {
              console.log(error);
              console.error(`There was an error creating table: ${error}`)
            })
          }
        })
        .then(() => {
          // Log success message
          console.log('done')
        })
        .catch((error) => {
          console.error(`There was an error setting up the database: ${error}`)
        })


// Just for debugging purposes:
// Log all data in "books" table
knex.select('*').from('books')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

knex.select('*').from('events')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

// Export the database
module.exports = knex
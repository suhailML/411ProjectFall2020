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
            table.int('movieID').references('movies.movidAPIid').onUpdate('CASCADE').onDelete('CASCADE'); // if primary key is changed, update this foreign key.
            table.string('userID').references('userInfo.userId').onUpdate('CASCADE').onDelete('CASCADE'); // if primary key is changed, update this foreign key.
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
              table.integer('userId').unique().primary()
              table.string('firstName')
              table.string('lastName')
              table.string('email')
              table.string('userName').unique()
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





      // ------- trendingWest ---------- 

      knex.schema
      // Make sure no "books" table exists
      // before trying to create new
      .hasTable('trendingWest')
        .then((exists) => {
          if (!exists) {
            // If no "books" table exists
            // create new, with "id", "author", "title",
            // "pubDate" and "rating" columns
            // and use "id" as a primary identification
            // and increment "id" with every new record (book)
            return knex.schema.createTable('trendingWest', (table)  => {
              table.integer('id').primary()
              table.string('title');
              table.string('type');
              table.string('backdrop_path');
              table.string('poster_path');
              table.integer('num_seasons');
              table.integer('num_episodes');
              table.string('release_date');
              table.string('overview');
              table.integer('num_views');
            })
            .then(() => {
              // Log success message
              console.log('Table \'trendingWest\' created')
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



      // ---------- trendingEast -------------
      knex.schema
      // Make sure no "books" table exists
      // before trying to create new
      .hasTable('trendingEast')
        .then((exists) => {
          if (!exists) {
            // If no "books" table exists
            // create new, with "id", "author", "title",
            // "pubDate" and "rating" columns
            // and use "id" as a primary identification
            // and increment "id" with every new record (book)
            return knex.schema.createTable('trendingEast', (table)  => {
              table.integer('id').primary()
              table.string('title');
              table.string('type');
              table.string('backdrop_path');
              table.string('poster_path');
              table.integer('num_seasons');
              table.integer('num_episodes');
              table.string('overview');
              table.integer('num_views');
            })
            .then(() => {
              // Log success message
              console.log('Table \'trendingEast\' created')
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





      knex.schema
      // Make sure no "books" table exists
      // before trying to create new
      .hasTable('trendingCentral')
        .then((exists) => {
          if (!exists) {
            // If no "books" table exists
            // create new, with "id", "author", "title",
            // "pubDate" and "rating" columns
            // and use "id" as a primary identification
            // and increment "id" with every new record (book)
            return knex.schema.createTable('trendingCentral', (table)  => {
              table.integer('id').primary()
              table.string('title');
              table.string('type');
              table.string('backdrop_path');
              table.string('poster_path');
              table.integer('num_seasons');
              table.integer('num_episodes');
              table.string('overview');
              table.integer('num_views');
            })
            .then(() => {
              // Log success message
              console.log('Table \'trendingCentral\' created')
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
        
        
        
        
        knex.schema
        // Make sure no "books" table exists
        // before trying to create new
        .hasTable('trendingSouth')
          .then((exists) => {
            if (!exists) {
              // If no "books" table exists
              // create new, with "id", "author", "title",
              // "pubDate" and "rating" columns
              // and use "id" as a primary identification
              // and increment "id" with every new record (book)
              return knex.schema.createTable('trendingSouth', (table)  => {
                table.integer('id').primary()
                table.string('title');
                table.string('type');
                table.string('backdrop_path');
                table.string('poster_path');
                table.integer('num_seasons');
                table.integer('num_episodes');
                table.string('overview');
                table.integer('num_views');
              })
              .then(() => {
                // Log success message
                console.log('Table \'trendingSouth\' created')
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


        // ---------- friendList ----------
        knex.schema
        // Make sure no "books" table exists
        // before trying to create new
        .hasTable('friendList')
          .then((exists) => {
            if (!exists) {
              // If no "books" table exists
              // create new, with "id", "author", "title",
              // "pubDate" and "rating" columns
              // and use "id" as a primary identification
              // and increment "id" with every new record (book)
              return knex.schema.createTable('friendList', (table)  => {
                table.integer('userId').references('userInfo.userId').onUpdate('CASCADE').onDelete('CASCADE'); // if primary key is changed, update this foreign key.
                table.integer('friendId').references('userInfo.userId').onUpdate('CASCADE').onDelete('CASCADE'); // if primary key is changed, update this foreign key.
              })
              .then(() => {
                // Log success message
                console.log('Table \'FriendList \' created')
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

                 // ---------- WatchList ----------
        knex.schema
        // Make sure no "watchList" table exists
        // before trying to create new
        .hasTable('watchList')
          .then((exists) => {
            if (!exists) {
              // If no "watch" table exists

              return knex.schema.createTable('watchList', (table)  => {
                table.integer('userId').references('userInfo.userId').onUpdate('CASCADE').onDelete('CASCADE'); // if primary key is changed, update this foreign key.
                table.integer('movieID').references('movies.movidAPIid').onUpdate('CASCADE').onDelete('CASCADE'); // if primary key is changed, update this foreign key.
              })
              .then(() => {
                // Log success message
                console.log('Table \'watchList \' created')
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
// Import database
const knex = require('./../db')

// Retrieve all books

console.log("IN THE SERVER CONT")


exports.tableSpecificSearch = async (req, res) => {
  // Get all books from database
  knex
    .select('*') // select all records
    .where(req.body.column, req.body.value)
    .from(req.body.table) // from 'books' table
    .then(userData => {
      // Send books extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving genres: ${err}` })
    })
}

// recentlyWatched

exports.rwAll = async (req, res) => {
    // Get all books from database
    knex
      .select('*') // select all records
      .from('recentlyWatched') // from 'books' table
      .then(userData => {
        // Send books extracted from database in response
        res.json(userData)
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving genres: ${err}` })
      })
  }
  // Create new book
  exports.rwCreate = async (req, res) => {
    // Add new book to database
    knex('recentlyWatched')
      .insert({ // insert new record, a book    
        'movieTitle': req.body.movieTitle,
        'movieID': req.body.movieID,
        'userID': req.body.userID,
        'location': req.body.location,
        'date': req.body.date,
        'time': req.body.time,
      })
      .then(() => {
        // Send a success message in response
        res.json({ message: `User \'${req.body.genreName}\' created.` })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error creating ${req.body.movieTitle}: ${err}` })
      })
  }

  exports.rwDelete = async (req, res) => {
    // Find specific book in the database and remove it
    knex('recentlyWatched')
      .where('id', req.body.id) // find correct record based on id
      .del() // delete the record
      .then(() => {
        // Send a success message in response
        res.json({ message: `Event ${req.body.id} deleted.` })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error deleting ${req.body.id} book: ${err}` })
      })
  }
  
  // Remove all books on the list
  exports.rwReset = async (req, res) => {
    // Remove all books from database
    knex
      .select('*') // select all records
      .from('recentlyWatched') // from 'books' table
      .truncate() // remove the selection
      .then(() => {
        // Send a success message in response
        res.json({ message: 'Events list cleared.' })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error resetting Event list: ${err}.` })
      })
  }

// movies

exports.movieAll = async (req, res) => {
    // Get all books from database
    knex
      .select('*') // select all records
      .from('movies') // from 'books' table
      .then(userData => {
        // Send books extracted from database in response
        res.json(userData)
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving genres: ${err}` })
      })
  }
  // Create new book
  exports.movieCreate = async (req, res) => {
    // Add new book to database
    knex('movies')
      .insert({ // insert new record, a book    
        'movidAPIid': req.body.movidAPIid,
        'movieTitle': req.body.movieTitle,
        'genreID': req.body.genreID,
        'poster_url': req.body.poster_url,
        'IMBDscore': req.body.IMBDscore,
      })
      .then(() => {
        // Send a success message in response
        res.json({ message: `User \'${req.body.genreName}\' created.` })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error creating ${req.body.movieTitle}: ${err}` })
      })
  }

  exports.movieDelete = async (req, res) => {
    // Find specific book in the database and remove it
    knex('movies')
      .where('id', req.body.id) // find correct record based on id
      .del() // delete the record
      .then(() => {
        // Send a success message in response
        res.json({ message: `Event ${req.body.id} deleted.` })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error deleting ${req.body.id} book: ${err}` })
      })
  }
  
  // Remove all books on the list
  exports.movieReset = async (req, res) => {
    // Remove all books from database
    knex
      .select('*') // select all records
      .from('movies') // from 'books' table
      .truncate() // remove the selection
      .then(() => {
        // Send a success message in response
        res.json({ message: 'Events list cleared.' })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error resetting Event list: ${err}.` })
      })
  }



// genre

exports.genreAll = async (req, res) => {
    // Get all books from database
    knex
      .select('*') // select all records
      .from('genres') // from 'books' table
      .then(userData => {
        // Send books extracted from database in response
        res.json(userData)
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving genres: ${err}` })
      })
  }
  // Create new book
  exports.genreCreate = async (req, res) => {
    // Add new book to database
    knex('genres')
      .insert({ // insert new record, a book
        'genreID': req.body.genre,
        'genreName': req.body.genreName,
      })
      .then(() => {
        // Send a success message in response
        res.json({ message: `User \'${req.body.genreName}\' created.` })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error creating ${req.body.genreName}: ${err}` })
      })
  }

  exports.genreDelete = async (req, res) => {
    // Find specific book in the database and remove it
    knex('genre')
      .where('id', req.body.id) // find correct record based on id
      .del() // delete the record
      .then(() => {
        // Send a success message in response
        res.json({ message: `Event ${req.body.id} deleted.` })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error deleting ${req.body.id} book: ${err}` })
      })
  }
  
  // Remove all books on the list
  exports.genreReset = async (req, res) => {
    // Remove all books from database
    knex
      .select('*') // select all records
      .from('genre') // from 'books' table
      .truncate() // remove the selection
      .then(() => {
        // Send a success message in response
        res.json({ message: 'Events list cleared.' })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error resetting Event list: ${err}.` })
      })
  }


// users !!!!!!!!!!

exports.usersAll = async (req, res) => {
    // Get all books from database
    knex
      .select('*') // select all records
      .from('user') // from 'books' table
      .then(userData => {
        // Send books extracted from database in response
        res.json(userData)
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving books: ${err}` })
      })
  }
  // Create new book
  exports.usersCreate = async (req, res) => {
    // Add new book to database
    knex('events')
      .insert({ // insert new record, a book
        'name': req.body.name,
        'email': req.body.email,
        'birthdayDate': req.body.birthdayDate,
        'userName': req.body.userName,
        'locality': req.body.locality,
        'clubAffiliations':req.body.clubAffiliations,
        'watchedMovies': req.body.watchedMovies
      })
      .then(() => {
        // Send a success message in response
        res.json({ message: `User \'${req.body.name}\' created.` })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error creating ${req.body.name}: ${err}` })
      })
  }

  exports.usersDelete = async (req, res) => {
    // Find specific book in the database and remove it
    knex('user')
      .where('id', req.body.id) // find correct record based on id
      .del() // delete the record
      .then(() => {
        // Send a success message in response
        res.json({ message: `Event ${req.body.id} deleted.` })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error deleting ${req.body.id} book: ${err}` })
      })
  }
  
  // Remove all books on the list
  exports.usersReset = async (req, res) => {
    // Remove all books from database
    knex
      .select('*') // select all records
      .from('user') // from 'books' table
      .truncate() // remove the selection
      .then(() => {
        // Send a success message in response
        res.json({ message: 'Events list cleared.' })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error resetting Event list: ${err}.` })
      })
  }

// events !!!!!!!!!!

  exports.eventsAll = async (req, res) => {
    // Get all events from database
    knex
      .select('*') // select all records
      .from('events') // from 'books' table
      .then(userData => {
        // Send books extracted from database in response
        res.json(userData)
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving books: ${err}` })
      })
  }
  // Create new event
  exports.eventsCreate = async (req, res) => {
    // Add new book to database
    knex('events')
      .insert({ // insert new record, a book
        'clubName': req.body.clubName,
        'movieTitle': req.body.movieTitle,
        'movieID': req.body.movieID,
        'date': req.body.date,
        'time': req.body.time,
        'eventDescription':req.body.eventDescription
      })
      .then(() => {
        // Send a success message in response
        res.json({ message: `Book \'${req.body.title}\' by ${req.body.author} created.` })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error creating ${req.body.title} book: ${err}` })
      })
  }

  exports.eventsDelete = async (req, res) => {
    // Find specific book in the database and remove it
    knex('events')
      .where('id', req.body.id) // find correct record based on id
      .del() // delete the record
      .then(() => {
        // Send a success message in response
        res.json({ message: `Event ${req.body.id} deleted.` })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error deleting ${req.body.id} book: ${err}` })
      })
  }
  
  // Remove all books on the list
  exports.eventsReset = async (req, res) => {
    // Remove all books from database
    knex
      .select('*') // select all records
      .from('events') // from 'books' table
      .truncate() // remove the selection
      .then(() => {
        // Send a success message in response
        res.json({ message: 'Events list cleared.' })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error resetting Event list: ${err}.` })
      })
  }


  // OLD


  exports.booksAll = async (req, res) => {
    // Get all books from database
    knex
      .select('*') // select all records
      .from('books') // from 'books' table
      .then(userData => {
        // Send books extracted from database in response
        res.json(userData)
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving books: ${err}` })
      })
  }

  exports.booksCreate = async (req, res) => {
    // Add new book to database
    knex('books')
      .insert({ // insert new record, a book
        'author': req.body.author,
        'title': req.body.title,
        'pubDate': req.body.pubDate,
        'rating': req.body.rating
      })
      .then(() => {
        // Send a success message in response
        res.json({ message: `Book \'${req.body.title}\' by ${req.body.author} created.` })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error creating ${req.body.title} book: ${err}` })
      })
  }
  
  // Remove specific book

  exports.booksDelete = async (req, res) => {
    // Find specific book in the database and remove it
    knex('books')
      .where('id', req.body.id) // find correct record based on id
      .del() // delete the record
      .then(() => {
        // Send a success message in response
        res.json({ message: `Book ${req.body.id} deleted.` })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error deleting ${req.body.id} book: ${err}` })
      })
  }
  
  // Remove all books on the list
  exports.booksReset = async (req, res) => {
    // Remove all books from database
    knex
      .select('*') // select all records
      .from('books') // from 'books' table
      .truncate() // remove the selection
      .then(() => {
        // Send a success message in response
        res.json({ message: 'Book list cleared.' })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error resetting book list: ${err}.` })
      })
  }
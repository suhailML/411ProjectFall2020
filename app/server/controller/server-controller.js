// Import database
const knex = require('./../db')

// Retrieve all books

console.log("IN THE SERVER CONT")

// events !!!!!!!!!!


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
    // Get all books from database
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
  // Create new book
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
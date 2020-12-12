// Import express
const express = require('express')

// Import books-controller
const booksRoutes = require('./../controller/server-controller.js')

// Create router
const router = express.Router()

// Add route for GET request to retrieve all book
// In server.js, books route is specified as '/books'
// this means that '/all' translates to '/books/all'
router.get('/bAll', booksRoutes.booksAll)

// Add route for POST request to create new book
// In server.js, books route is specified as '/books'
// this means that '/create' translates to '/books/create'
router.post('/bCreate', booksRoutes.booksCreate)

// Add route for PUT request to delete specific book
// In server.js, books route is specified as '/books'
// this means that '/delete' translates to '/books/delete'
router.put('/bDelete', booksRoutes.booksDelete)

// Add route for PUT request to reset bookshelf list
// In server.js, books route is specified as '/books'
// this means that '/reset' translates to '/books/reset'
router.put('/bReset', booksRoutes.booksReset)

router.get('/eAll', booksRoutes.eventsAll)

router.post('/eCreate', booksRoutes.eventsCreate)

// Export router
module.exports = router
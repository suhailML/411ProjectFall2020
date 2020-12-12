// Import express
const express = require('express')

// Import books-controller
const movieRoutes = require('./../controller/server-controller.js')

// Create router
const router = express.Router()

// Add route for GET request to retrieve all book
// In server.js, books route is specified as '/books'
// this means that '/all' translates to '/books/all'
router.get('/bAll', movieRoutes.booksAll)

// Add route for POST request to create new book
// In server.js, books route is specified as '/books'
// this means that '/create' translates to '/books/create'
router.post('/bCreate', movieRoutes.booksCreate)

// Add route for PUT request to delete specific book
// In server.js, books route is specified as '/books'
// this means that '/delete' translates to '/books/delete'
router.put('/bDelete', movieRoutes.booksDelete)

// Add route for PUT request to reset bookshelf list
// In server.js, books route is specified as '/books'
// this means that '/reset' translates to '/books/reset'
router.put('/bReset', movieRoutes.booksReset)

//event
router.get('/eAll', movieRoutes.eventsAll)
router.post('/eCreate', movieRoutes.eventsCreate)
router.put('/eDelete', movieRoutes.eventsDelete)
router.put('/eReset', movieRoutes.eventsReset)

//user
router.get('/uAll', movieRoutes.usersAll)
router.post('/uCreate', movieRoutes.usersCreate)
router.put('/uDelete', movieRoutes.usersDelete)
router.put('/uReset', movieRoutes.usersReset)

//genre
router.get('/gAll', movieRoutes.genreAll)
router.post('/gCreate', movieRoutes.genreCreate)
router.put('/gDelete', movieRoutes.genreDelete)
router.put('/gReset', movieRoutes.genreReset)

//movie
router.get('/mAll', movieRoutes.movieAll)
router.post('/mCreate', movieRoutes.movieCreate)
router.put('/mDelete', movieRoutes.movieDelete)
router.put('/mReset', movieRoutes.movieReset)

//recenly  washed
router.get('/rwAll', movieRoutes.rwAll)
router.post('/rwCreate', movieRoutes.rwCreate)
router.put('/rwDelete', movieRoutes.rwDelete)
router.put('/rwReset', movieRoutes.rwReset)

// Export router
module.exports = router
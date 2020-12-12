// Import express
const express = require('express')

// Import books-controller
const movieRoutes = require('./../controller/server-controller.js')

// Create router
const router = express.Router()

router.get('/eAll', movieRoutes.eventsAll)
router.post('/eCreate', movieRoutes.eventsCreate)
router.put('/eDelete', movieRoutes.eventsDelete)
router.put('/eReset', movieRoutes.eventsReset)

router.get('/uAll', movieRoutes.usersAll)
router.post('/uCreate', movieRoutes.usersCreate)
router.put('/uDelete', movieRoutes.usersDelete)
router.put('/uReset', movieRoutes.usersReset)

router.get('/gAll', movieRoutes.genreAll)
router.post('/gCreate', movieRoutes.genreCreate)
router.put('/gDelete', movieRoutes.genreDelete)
router.put('/gReset', movieRoutes.genreReset)

router.get('/mAll', movieRoutes.movieAll)
router.post('/mCreate', movieRoutes.movieCreate)
router.put('/mDelete', movieRoutes.movieDelete)
router.put('/mReset', movieRoutes.movieReset)

router.get('/rwAll', movieRoutes.rwAll)
router.post('/rwCreate', movieRoutes.rwCreate)
router.put('/rwDelete', movieRoutes.rwDelete)
router.put('/rwReset', movieRoutes.rwReset)

// Export router
module.exports = router
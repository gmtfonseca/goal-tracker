const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const goalController = require('../controllers/goal-controller')
const workRouter = require('./work-route')

router.get('/goal', asyncHandler(goalController.get))
router.get('/goal/:goalId', asyncHandler(goalController.getById))
router.post('/goal', asyncHandler(goalController.post))
router.put('/goal/:goalId', asyncHandler(goalController.put))
router.delete('/goal/:goalId', asyncHandler(goalController.delete))

router.use('/goal/:goalId/work', workRouter)

module.exports = router

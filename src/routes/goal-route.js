const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const GoalController = require('../controllers/goal-controller')
const workRouter = require('./work-route')

router.get('/goal', asyncHandler(GoalController.get))
router.get('/goal/:goalId', asyncHandler(GoalController.getById))
router.post('/goal', asyncHandler(GoalController.post))
router.put('/goal/:goalId', asyncHandler(GoalController.put))
router.delete('/goal/:goalId', asyncHandler(GoalController.delete))

router.use('/goal/:goalId/work', workRouter)

module.exports = router

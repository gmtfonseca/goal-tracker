const express = require('express')
const router = express.Router({ mergeParams: true })
const asyncHandler = require('express-async-handler')
const workController = require('../controllers/work-controller')
const workMiddleware = require('../middlewares/work-middleware')

const taskRouter = require('./task-route')

router.use(workMiddleware.goalValidator)
router.get('/', asyncHandler(workController.get))
router.get('/:workId', asyncHandler(workController.getById))
router.post('/', asyncHandler(workController.post))
router.put('/:workId', asyncHandler(workController.put))
router.delete('/:workId', asyncHandler(workController.delete))

router.use('/:workId/task', taskRouter)

module.exports = router

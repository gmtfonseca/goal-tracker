const express = require('express')
const router = express.Router({ mergeParams: true })
const asyncHandler = require('express-async-handler')
const WorkController = require('../controllers/work-controller')
const WorkMiddleware = require('../middlewares/work-middleware')

const taskRouter = require('./task-route')

router.use(WorkMiddleware.goalValidator)
router.get('/', asyncHandler(WorkController.get))
router.get('/:workId', asyncHandler(WorkController.getById))
router.post('/', asyncHandler(WorkController.post))
router.put('/:workId', asyncHandler(WorkController.put))
router.delete('/:workId', asyncHandler(WorkController.delete))

router.use('/:workId/task', taskRouter)

module.exports = router

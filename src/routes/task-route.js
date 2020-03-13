const express = require('express')
const router = express.Router({ mergeParams: true })
const asyncHandler = require('express-async-handler')
const taskController = require('../controllers/task-controller')
const taskMiddleware = require('../middlewares/task-middleware')

router.use(taskMiddleware.workValidatior)
router.post('/', asyncHandler(taskController.post))
router.put('/:taskId', asyncHandler(taskController.put))
router.delete('/:taskId', asyncHandler(taskController.delete))

module.exports = router

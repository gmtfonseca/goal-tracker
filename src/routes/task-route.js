const express = require('express')
const router = express.Router({ mergeParams: true })
const asyncHandler = require('express-async-handler')
const TaskController = require('../controllers/task-controller')

router.post('/', asyncHandler(TaskController.post))
router.put('/:taskId', asyncHandler(TaskController.put))
router.delete('/:taskId', asyncHandler(TaskController.delete))

module.exports = router

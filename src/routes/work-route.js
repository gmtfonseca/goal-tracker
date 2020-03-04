const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const WorkController = require('../controllers/work-controller')

router.get('/work', asyncHandler(WorkController.get))

module.exports = router

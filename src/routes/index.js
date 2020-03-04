const express = require('express')
const goalRoute = require('./goal-route')
const workRoute = require('./work-route')

const routes = express.Router()
routes.use('/api', [goalRoute, workRoute])

module.exports = routes

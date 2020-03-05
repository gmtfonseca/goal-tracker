const { factory } = require('factory-girl')
const fakers = require('./fakers')
const Goal = require('../../src/models/Goal')

factory.define('Goal', Goal, fakers.goal)

module.exports = { factory }

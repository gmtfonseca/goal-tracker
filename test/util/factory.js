const { factory } = require('factory-girl')
const fakers = require('./fakers')
const Goal = require('../../src/models/Goal')
const Work = require('../../src/models/Work')

factory.define('Goal', Goal, fakers.goal)
factory.define('Work', Work, fakers.work)

module.exports = factory

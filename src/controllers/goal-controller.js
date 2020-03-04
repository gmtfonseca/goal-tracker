const Goal = require('../models/Goal')
const HttpStatus = require('http-status-codes')

module.exports = {
  async get(req, res) {
    const goals = await Goal.find()
    return res.status(HttpStatus.OK).json(goals)
  },

  async getById(req, res) {
    return res.status(HttpStatus.OK).json({})
  },

  async post(req, res) {
    const goal = await Goal.create({
      ...req.body,
    })
    return res.status(HttpStatus.CREATED).json(goal)
  },

  async put(req, res) {
    return res.status(HttpStatus.OK).json({})
  },

  async delete(req, res) {
    return res.status(HttpStatus.OK).json({})
  },
}

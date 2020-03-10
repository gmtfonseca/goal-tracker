const Goal = require('../models/Goal')
const HttpStatus = require('http-status-codes')

module.exports = {
  async get(req, res) {
    const goals = await Goal.find()
    // return res.status(HttpStatus.OK).json({})
    return res.status(HttpStatus.OK).json(goals)
  },

  async getById(req, res) {
    const goal = await Goal.findById(req.params.goalId)
    return res.status(HttpStatus.OK).json(goal)
  },

  async post(req, res) {
    const goal = await Goal.create({
      ...req.body,
    })
    return res.status(HttpStatus.CREATED).json(goal)
  },

  async put(req, res) {
    const goal = await Goal.findByIdAndUpdate(
      req.params.goalId,
      {
        ...req.body,
      },
      { new: true }
    )
    return res.status(HttpStatus.OK).json(goal)
  },

  async delete(req, res) {
    const goal = await Goal.findByIdAndDelete(req.params.goalId)
    return res.status(HttpStatus.OK).json(goal)
  },
}

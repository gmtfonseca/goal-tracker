const Work = require('../models/Work')
const HttpStatus = require('http-status-codes')

module.exports = {
  async get(req, res) {
    const query = {
      goal: req.params.goalId,
    }
    const works = await Work.find(query)
    return res.status(HttpStatus.OK).json(works)
  },

  async getById(req, res) {
    const work = await Work.findById(req.params.workId)
    return res.status(HttpStatus.OK).json(work)
  },

  async post(req, res) {
    const work = await Work.create({
      goal: req.params.goalId,
      ...req.body,
    })
    return res.status(HttpStatus.CREATED).json(work)
  },

  async put(req, res) {
    const work = await Work.findByIdAndUpdate(
      req.params.workId,
      {
        ...req.body,
      },
      { new: true }
    )
    return res.status(HttpStatus.OK).json(work)
  },

  async delete(req, res) {
    const work = await Work.findByIdAndDelete(req.params.workId)
    return res.status(HttpStatus.OK).json(work)
  },
}

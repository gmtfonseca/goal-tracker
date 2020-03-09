const Work = require('../models/Work.js')
const HttpStatus = require('http-status-codes')

module.exports = {
  async post(req, res) {
    const task = req.body
    const work = await Work.findById(req.params.workId)
    work.tasks.push(task)
    const updatedWork = await work.save()
    return res.status(HttpStatus.CREATED).json(updatedWork)
  },
  async put(req, res) {
    const work = await Work.findById(req.params.workId)
    const task = work.tasks.id(req.params.taskId)
    task.set(req.body)
    const updatedWork = await work.save()
    return res.status(HttpStatus.OK).json(updatedWork)
  },
  async delete(req, res) {
    const work = await Work.findById(req.params.workId)
    work.tasks.pull(req.params.taskId)
    const updatedWork = await work.save()
    return res.status(HttpStatus.OK).json(updatedWork)
  },
}

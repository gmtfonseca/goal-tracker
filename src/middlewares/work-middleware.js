const Goal = require('../models/Goal')
const HttpStatus = require('http-status-codes')
const { isValidDocId } = require('../lib/db')

function buildInvalidGoalError() {
  const err = new Error('Invalid goal')
  err.status = HttpStatus.BAD_REQUEST
  return err
}

module.exports = {
  async goalValidator(req, res, next) {
    const goalId = req.params.goalId
    if (!isValidDocId(goalId)) {
      return next(buildInvalidGoalError())
    } else {
      const goal = await Goal.findById(goalId)
      if (!goal) {
        return next(buildInvalidGoalError())
      } else {
        next()
      }
    }
  },
}

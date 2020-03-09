const Work = require('../models/Work')
const HttpStatus = require('http-status-codes')
const { isValidDocId } = require('../lib/db')

function buildInvalidWorkError() {
  const err = new Error('Invalid work')
  err.status = HttpStatus.BAD_REQUEST
  return err
}

module.exports = {
  async workValidatior(req, res, next) {
    const workId = req.params.workId
    if (!isValidDocId(workId)) {
      return next(buildInvalidWorkError())
    } else {
      const work = await Work.findById(workId)
      if (!work) {
        return next(buildInvalidWorkError())
      } else {
        next()
      }
    }
  },
}

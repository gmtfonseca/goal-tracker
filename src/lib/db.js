const mongoose = require('mongoose')

module.exports = {
  isValidDocId(id) {
    return mongoose.Types.ObjectId.isValid(id)
  },
}

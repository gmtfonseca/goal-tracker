const mongoose = require('mongoose')

const { Schema } = mongoose

const goalSchema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
  },
})

module.exports = mongoose.model('goal', goalSchema)

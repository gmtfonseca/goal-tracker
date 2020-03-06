const mongoose = require('mongoose')

const { Schema } = mongoose

const goalSchema = new Schema({
  year: {
    type: Number,
    required: [true, 'Year is required'],
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  overview: {
    type: String,
  },
})

module.exports = mongoose.model('Goal', goalSchema)

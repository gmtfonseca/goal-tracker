const mongoose = require('mongoose')

const { Schema } = mongoose

const workSchema = new Schema({
  goal: {
    type: Schema.Types.ObjectId,
    ref: 'goal',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  tasks: [
    {
      description: {
        type: String,
        required: true,
      },
      notes: String,
      done: Boolean,
    },
  ],
})

module.exports = mongoose.model('Work', workSchema)

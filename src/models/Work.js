const mongoose = require('mongoose')

const { Schema } = mongoose

const workSchema = new Schema({
  goal: {
    type: Schema.Types.ObjectId,
    ref: 'Goal',
    required: [true, 'Goal is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  tasks: [
    {
      description: {
        type: String,
        required: [true, 'Description is required'],
      },
      notes: String,
      done: Boolean,
    },
  ],
})

module.exports = mongoose.model('Work', workSchema)

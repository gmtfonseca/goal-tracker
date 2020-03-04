const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

connectToDb()

app.use(require('./routes'))

async function connectToDb() {
  try {
    await mongoose.connect('mongodb://localhost:27017/goaltracker', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    console.log('Connected to db')
  } catch (e) {
    console.log('Failed to connect to db')
    process.exit()
  }
}

const port = process.env.PORT || 3000
app.listen(port, err => {
  if (err) throw err

  console.log(`Server listening to port ${port}`)
})

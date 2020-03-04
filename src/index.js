const server = require('./server')
const mongoose = require('mongoose')

async function connectToDb() {
  try {
    await mongoose.connect('mongodb://localhost:27017/goal-tracker', {
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

connectToDb()

const port = process.env.PORT || 3000
server.listen(port, err => {
  if (err) throw err

  console.log(`Server listening to port ${port}`)
})

const server = require('./server')
const mongoose = require('mongoose')
const config = require('./config')
const logger = require('./logger')

async function connectToDb() {
  try {
    await mongoose.connect(config.db.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    logger.info(`Connected to db ${config.db.uri}`)
  } catch (e) {
    logger.error('Failed to connect to db')
    process.exit()
  }
}

const port = process.env.PORT || 3000
server.listen(port, async err => {
  if (err) throw err

  await connectToDb()
  logger.info(`Server listening to port ${port}`)
})

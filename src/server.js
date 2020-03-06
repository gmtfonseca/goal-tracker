require('dotenv').config()
const express = require('express')
const app = express()
const HttpStatus = require('http-status-codes')
const bodyParser = require('body-parser')
const logger = require('./logger')

app.use(bodyParser.json())
app.use(require('./routes'))

// eslint-disable-next-line
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'dev') {
    logger.debug(err)
    return res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message })
  }

  return res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Server error' })
})

module.exports = app

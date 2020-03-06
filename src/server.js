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
  logger.debug(err)

  if (err.name === 'ValidationError') {
    const errors = Object.keys(err.errors).map(k => err.errors[k].message)
    return res.status(HttpStatus.BAD_REQUEST).json({ errors })
  }

  return res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message })
})

module.exports = app

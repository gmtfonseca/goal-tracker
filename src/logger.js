const winston = require('winston')

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'dev' ? 'debug' : 'info',
  format: winston.format.combine(winston.format.splat(), winston.format.simple()),
  transports: [new winston.transports.Console()],
})

module.exports = logger

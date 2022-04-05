const { ENV } = require('../utils/config')

const errorHandler = (error, req, res, next) => {
  if(ENV === 'development') {
    console.log(error)
  }

  switch(error.name) {
  case 'BadRequest':
  case 'MissingRequiredFields':
  case 'SequelizeUniqueConstraintError':
  case 'SequelizeValidationError':
    return res.status(400).json({ error: error.message })
  case 'UnauthorizedRequest':
    return res.status(401).json({ error: error.message })
  default:
    next(error)
  }
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const checkSessionConnection = (req, res, next) => {
  if (!req.session) {
    return next(new Error('connection to redisSession lost'))
  }
  next()
}

module.exports = {
  checkSessionConnection,
  errorHandler,
  unknownEndpoint
}
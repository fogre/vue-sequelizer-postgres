class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor)
  }
}

class BadRequest extends CustomError {
  constructor(resource, query) {
    super(`Resource ${resource} was not found.`)
    this.data = { resource, query }
  }
}

class UnauthorizedRequest extends CustomError {
  constructor(resource, query) {
    super(`Unauthorized to perform this action`)
    this.data = { resource, query }
  }
}

const errorHandler = (error, req, res, next) => {
  console.log(error);
  
  switch(error.name) {
    case 'BadRequest':
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      return res.status(400).json({ error: error.message })
    case 'UnauthorizedRequest':
      return res.status(401).json({ error: error.message })
    case'JsonWebTokenError':
      return res.status(401).json({ error: 'invalid token' })
    case 'TokenExpiredError':
      return res.status(401).json({ error: 'token expired' })
    default:
      next(error)
  }
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
  BadRequest,
  errorHandler,
  UnauthorizedRequest,
  unknownEndpoint
}
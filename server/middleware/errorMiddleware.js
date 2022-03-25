const errorHandler = (error, req, res, next) => {
  console.log(error)
  
  switch(error.name) {
    case 'BadRequest':
    case 'MissingRequiredFields':
    case 'SequelizeUniqueConstraintError':
    case 'SequelizeValidationError':
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
  errorHandler,
  unknownEndpoint
}
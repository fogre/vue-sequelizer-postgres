const { BadRequest, UnauthorizedRequest } = require('./errorMiddleware')

const isAuthorizedUser = (decodedToken, userId) => {
  if (decodedToken.id !== userId) {
    throw new UnauthorizedRequest
  }
  return true
}

const isResourceInDB = (entry, req) => {
  if (!entry) {
    throw new BadRequest(req.originalUrl)
  }
  return true
}

module.exports = {
  isAuthorizedUser,
  isResourceInDB
}
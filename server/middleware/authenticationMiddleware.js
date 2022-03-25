const { UnauthorizedRequest } = require('../utils/customErrors')

const confirmSession = (req, res, next) => {
  if(!req.session.userId || !req.session.username) {
    throw new UnauthorizedRequest
  }
  next()
}

module.exports = {
  confirmSession
}
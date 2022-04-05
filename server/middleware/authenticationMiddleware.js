const { UnauthorizedRequest } = require('../utils/customErrors')
const { checkIfBanned, deleteKeys } = require('../utils/redisSession')

/*
  Check session and if the user is banned, thow unauthorized if necessary.
  If banned, delete session keys
*/
const confirmSession = async (req, res, next) => {
  if(!req.session.userId) {
    throw new UnauthorizedRequest
  }
  const banned = await checkIfBanned(req.session.userId)
  if (banned) {
    await deleteKeys(req.session)
    throw new UnauthorizedRequest
  }
  next()
}

module.exports = {
  confirmSession
}
const { BadRequest, UnauthorizedRequest, MissingRequiredFields } = require('./customErrors')

const isAuthorizedUser = (session, userId) => {
  if (session.userId !== userId) {
    throw new UnauthorizedRequest
  }
  return true
}

//requiredParams: [params] || single param, body: req.body
const isReqBodyValid = (requiredParams, body) => {
  const  errors = []
  if (Array.isArray(requiredParams)) {
    requiredParams.forEach(param => {
      if (!body[param] && body[param] !== 0) {
        errors.push(param)
      }
    })
  } else {
    if (!body[requiredParams] && body[requiredParams] !== 0) {
      errors.push(requiredParams)
    }
  }

  if (errors.length) {
    throw new MissingRequiredFields(errors.toString())
  }

  return true
}

//Entry:Model in db, req: request
const isResourceInDB = (entry, req) => {
  if (!entry || Array.isArray(entry) && !entry.length) {
    throw new BadRequest(req.originalUrl)
  }
  return true
}

module.exports = {
  isAuthorizedUser,
  isReqBodyValid,
  isResourceInDB
}
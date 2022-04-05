const { BadRequest, UnauthorizedRequest, MissingRequiredFields } = require('./customErrors')

const isAdmin = session => {
  if (!session.admin) {
    throw new UnauthorizedRequest
  }
  return true
}

const isAuthorizedUser = (session, userId) => {
  if (session.userId !== userId && !session.admin) {
    throw new UnauthorizedRequest
  }
  return true
}

//requiredParams: [params] || single param, body: req.body
const isReqBodyValid = (requiredParams, body) => {
  const  errors = []
  if (Array.isArray(requiredParams)) {
    requiredParams.forEach(param => {
      if (!body[param] && isNaN(body[param])) {
        errors.push(param)
      }
    })
  } else {
    if (!body[requiredParams] && isNaN(body[requiredParams])) {
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
  isAdmin,
  isAuthorizedUser,
  isReqBodyValid,
  isResourceInDB
}
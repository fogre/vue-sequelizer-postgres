class CustomError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
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
    super('Unauthorized')
    this.data = { resource, query }
  }
}

class MissingRequiredFields extends CustomError {
  constructor(resource, query) {
    super(`Missing required fields: ${resource}`)
    this.data = { resource, query }
  }
}

module.exports = {
  BadRequest,
  UnauthorizedRequest,
  MissingRequiredFields
}
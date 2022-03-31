const validators = require('../../utils/validators')
const errors = require('../../utils/customErrors')

describe('The validator', () => {

  describe('isAuthorizedUser', () => {

    test('throws correct error if unauthorized', () => {
      const session = { userId: 1 }
      const userId = 2
      expect(() => validators.isAuthorizedUser(session, userId))
        .toThrow(errors.UnauthorizedRequest)
    })

    test('returns true for authorized session', () => {
      const session = { userId: 2 }
      const userId = 2
      expect(validators.isAuthorizedUser(session, userId))
        .toBe(true)
    })
  })

  describe('isReqBodyValid', () => {

    test('throws correct error for invalid body', () => {
      let required = ['name', 'id', 'social']
      let body = { name: 'asd', id: 1 }
      expect(() => validators.isReqBodyValid(required, body))
        .toThrow(errors.MissingRequiredFields)

      required = 'name'
      body = { id: 1 }
      expect(() => validators.isReqBodyValid(required, body))
        .toThrow(errors.MissingRequiredFields)
    })

    test('returns true for valid body', () => {
      let required = ['name', 'id']
      let body = { name: 'asd', id: 0 }
      expect(validators.isReqBodyValid(required, body))
        .toBe(true)

      expect(validators.isReqBodyValid('name', { name: 'asd' }))
        .toBe(true)
    })
  })

  describe('isResourceInDB', () => {

    test('throws correct error if resource not found', () => {
      expect(() =>
        validators.isResourceInDB(undefined, { originalUrl: 'asd' })
      ).toThrow(errors.BadRequest)
    })

    test('returns true if resource found', () => {
      expect(
        validators.isResourceInDB({ iExists: true }, { originalUrl: 'asd' })
      ).toBe(true)
    })
  })
})
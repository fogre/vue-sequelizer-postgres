const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)

const { DEFAULT_PASS } = require('../../utils/config')

describe('When using route /api/login', () => {
  describe('When sending POST request', () => {

    test('it logs user in with correct credentials', async () => {
      const res = await api
        .post('/api/login')
        .send({ username: 'testUser', password: DEFAULT_PASS })
      expect(res.status).toBe(200)
      expect(res.headers['set-cookie'].length).toBeTruthy()
      expect(res.headers['set-cookie'].find(c => c.includes('sessionId='))).toBeTruthy()
      expect(res.body.username).toBe('testUser')
      expect(res.body.passwordHash).toBeFalsy()
    })

    test('it sends correct error with wrong credentials', async () => {
      const res = await api
        .post('/api/login')
        .send({ username: 'testsaadUser', password: 'wrongpass' })
      expect(res.status).toBe(401)
      expect(res.body.error).toMatch('invalid username or password')
    })

    test('it sends correct error with missing parameters', async () => {
      const res = await api
        .post('/api/login')
        .send({ username: 'testsaadUser' })
      expect(res.body.error).toMatch('Missing required')
    })

    test('it sends correct error for disabled user', async () => {
      const res = await api
        .post('/api/login')
        .send({ username: 'disabledUser', password: DEFAULT_PASS })
      expect(res.body.error).toMatch('account disabled')
    })
  })
})
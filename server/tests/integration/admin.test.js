const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)

const { getSessionCookie } = require('../testHelpers')
let userToDisable, userToDisableCookie, adminCookie

describe('When using routes that require admin permissions', () => {
  beforeAll(async () => {
    adminCookie = await getSessionCookie(api, 'admin')
    expect(adminCookie).toBeTruthy()

    const res = await api
      .post('/api/users')
      .send({ username: 'userToDisable', name: 'asdasd', password: '1234567' })
    expect(res.body.id).toBeTruthy()
    userToDisable = res.body
    userToDisableCookie = res.headers['set-cookie']
      .find(c => c.includes('sessionId='))
    expect(userToDisableCookie).toBeTruthy()
  })

  describe('When using PUT /api/users/:id/disable', () => {
    test('It throws 401 if session is unauthorized and doesnt disable user', async () => {
      await api
        .put(`/api/users/${userToDisable.id}/disable`)
        .set('Cookie', userToDisableCookie)
        .send({ disabled: true })
        .expect(401)

      await api
        .put('/api/blogs/2/likes')
        .set('Cookie', userToDisableCookie)
        .send({ likes: 1 })
        .expect(200)
    })

    test('It disables user if authorized', async () => {
      const res = await api
        .put(`/api/users/${userToDisable.id}/disable`)
        .set('Cookie', adminCookie)
        .send({ disabled: true })
      expect(res.status).toBe(200)
      expect(res.body.disabled).toBeTruthy()

      await api
        .put('/api/blogs/3/likes')
        .set('Cookie', userToDisableCookie)
        .send({ likes: 1 })
        .expect(401)
    })
  })
})
const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)

const { Tag } = require('../../database/models')
const { logInAndGetSessionCookies } = require('../testHelpers')

const route = '/api/tags'
let tags, testUserCookie

describe('When using route /api/tags', () => {
  beforeAll(async () => {
    tags = await Tag.findAll({ raw: true })
    expect(tags.length).toBeTruthy()

    const cookieRes = await logInAndGetSessionCookies(api)
    expect(cookieRes.testUserCookie).toBeTruthy()
    testUserCookie = cookieRes.testUserCookie
  })

  describe('When sending GET request', () => {
    test('it returns all tags', async () => {
      const res = await api.get(route)
      expect(res.status).toBe(200)
      expect(res.body.length).toBe(tags.length)
    })
  })

  describe('When sending POST request', () => {
    test('it creates a tag with logged user and valid body', async () => {
      const res = await api
        .post(route)
        .set('Cookie', testUserCookie)
        .send({ name: 'afjfrf98' })
      expect(res.status).toBe(200)
      expect(res.body.name).toBe('afjfrf98')
    })

    test('it thows correct errors if name is not valid, unauthorized or invalid body', async () => {
      await api
        .post(route)
        .set('Cookie', testUserCookie)
        .send({ name: tags[0].name })
        .expect(400)
      await api
        .post(route)
        .set('Cookie', testUserCookie)
        .send({ name: 'a' })
        .expect(400)
      await api
        .post(route)
        .set('Cookie', testUserCookie)
        .send({ name: '  ' })
        .expect(400)
      await api
        .post(route)
        .set('Cookie', testUserCookie)
        .send({ name: 'afjdwadwadwadwadwdwdawddw' })
        .expect(400)
      await api
        .post(route)
        .send({ name: '9343f' })
        .expect(401)
      await api
        .post(route)
        .set('Cookie', testUserCookie)
        .send({ title: 'afjwww' })
        .expect(400)
    })
  })

})
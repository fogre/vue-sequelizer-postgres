const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)

const { User, Blog } = require('../../database/models')
const { logInAndGetSessionCookies } = require('../testHelpers')
const { sequelize } = require('../../database/sequelize')

const route = '/api/readinglists'
const listIds = []
let user, blog, testUserCookie, defaultUserCookie

describe('When using route /api/readinglists', () => {

  beforeAll(async () => {
    const cookieRes = await logInAndGetSessionCookies(api)
    expect(cookieRes.testUserCookie).toBeTruthy()
    testUserCookie = cookieRes.testUserCookie
    defaultUserCookie = cookieRes.defaultUserCookie

    const userRes =  await User.findOne({ where: { username: 'testUser' } })
    expect(userRes.dataValues).toBeTruthy()
    user = userRes.dataValues

    const blogRes = await Blog.findByPk(2)
    expect(blogRes.dataValues).toBeTruthy()
    blog = blogRes.dataValues
  })

  describe('When sending POST request', () => {
    test('it adds a readinglist entry with valid body and logged user', async () => {
      const res = await api
        .post(route)
        .set('Cookie', testUserCookie)
        .send({ userId: user.id, blogId: blog.id })
      expect(res.status).toBe(200)
      expect(res.body.userId).toBe(user.id)
      expect(res.body.blogId).toBe(blog.id)
      expect(res.body.read).toBe(false)
      listIds.push(res.body.id)
    })

    test('it returns 401 for user who is not logged in', async () => {
      await api
        .post(route)
        .send({ userId: user.id, blogId: blog.id })
        .expect(401)
    })

    test('it returns 400 error with invalid body', async () => {
      await api
        .post(route)
        .set('Cookie', testUserCookie)
        .send({ userId: user.id })
        .expect(400)
    })

    test('it returns 401 if the body.user is not the same as logged user', async () => {
      await api
        .post(route)
        .set('Cookie', testUserCookie)
        .send({ userId: 0, blogId: blog.id })
        .expect(401)
    })
  })

  describe('When sending PUT request', () => {
    test('it changes the read status with valid body and authorized user', async () => {
      const res = await api
        .put(`${route}/${listIds[0]}`)
        .set('Cookie', testUserCookie)
        .send({ read: true })

      expect(res.status).toBe(200)
      expect(res.body.read).toBe(true)
    })

    test('it returns 400 for invalid body', async () => {
      await api
        .put(`${route}/${listIds[0]}`)
        .set('Cookie', testUserCookie)
        .send({ foo: true })
        .expect(400)
    })

    test('it returns 400 for route id', async () => {
      await api
        .put(`${route}/1380`)
        .set('Cookie', testUserCookie)
        .send({ read: true })
        .expect(400)
    })

    test('it returns 401 if the list user is not the same as logged user', async () => {
      await api
        .put(`${route}/${listIds[0]}`)
        .set('Cookie', defaultUserCookie)
        .send({ read: true })
        .expect(401)
    })

    test('it returns 401 if user is not logged in', async () => {
      await api
        .put(`${route}/${listIds[0]}`)
        .send({ read: true })
        .expect(401)
    })
  })

  afterAll(async () => {
    await sequelize
      .getQueryInterface()
      .bulkDelete('readinglists', { id: listIds.map(i => i) })
  })
})
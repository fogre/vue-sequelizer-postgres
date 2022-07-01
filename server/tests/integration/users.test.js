const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)

const { User } = require('../../database/models')
const { logInAndGetSessionCookies } = require('../testHelpers')

const route = '/api/users'
const userIds = []
const newUser = {
  username: 'aNewTestUser33',
  name: 'adkowd',
  password: 'anewpass'
}
let users, testUserCookie

describe('When using route /api/users', () => {
  beforeAll(async () => {
    users = await User.findAll({ raw: true })
    expect(users.length).toBeTruthy()

    const cookieRes = await logInAndGetSessionCookies(api)
    expect(cookieRes.testUserCookie).toBeTruthy()
    testUserCookie = cookieRes.testUserCookie
  })

  describe('When sending GET request', () => {
    test('it returns all users by most likes', async () => {
      const usersByLikes = [...users].sort((a,b) => {
        b.likes > a.likes
      })
      const res = await api.get(route)
      expect(res.body.error).toBeFalsy()
      expect(res.body.length).toBe(users.length)
      expect(res.body[0].likes).toBe(usersByLikes[0].likes)
    })

    test('it returns single user with blogs', async () => {
      const res = await api.get(`${route}/${users[users.length-1].id}`)
      expect(res.body.error).toBeFalsy()
      expect(res.body.username).toBe(users[users.length-1].username)
      expect(res.body.blogs).toBeTruthy()
    })
  })

  describe('When sending POST request', () => {
    test('it creates a new user and logs in with valid body',async () => {
      const res = await api
        .post(route)
        .send(newUser)

      expect(res.status).toBe(200)
      expect(res.body.error).toBeFalsy()
      expect(res.body.username).toBe(newUser.username)
      expect(res.body.name).toBe(newUser.name)
      expect(res.body.passwordHash).toBe(undefined)
      expect(res.body.admin).toBe(undefined)

      const userInDb = await User.findByPk(res.body.id)
      expect(userInDb.username).toBe(res.body.username)

      const cookie = res.headers['set-cookie'].find(c => c.includes('sessionId='))
      expect(cookie).toBeTruthy()
      userIds.push({
        id: res.body.id,
        username: res.body.username,
        cookie
      })
    })

    test('it throws 400 for too short password',async () => {
      const res = await api
        .post(route)
        .send({ ...newUser, password: '123' })
      expect(res.status).toBe(400)
      expect(res.body.error).toMatch('Password must be over')
    })

    test('it throws 400 if username already exists or is too short/long', async () => {
      const res = await api
        .post(route)
        .send(newUser)
      expect(res.status).toBe(400)
      expect(res.body.error).toMatch('username is already taken')
      expect(res.headers['set-cookie']).toBeFalsy()

      await api
        .post(route)
        .send({ ...newUser, username: '     ' })
        .expect(400)
      await api
        .post(route)
        .send({ ...newUser, username: 'asd' })
        .expect(400)
      await api
        .post(route)
        .send({ ...newUser, username: '12345678910112321313213' })
        .expect(400)
    })
  })

  describe('When sending PUT request', () => {
    test('it can change username if authorized user and valid body', async () => {
      const res = await api
        .put(`${route}/${userIds[0].username}`)
        .set('Cookie', userIds[0].cookie)
        .send({ username: 'newUsernameForMe' })
      expect(res.status).toBe(200)
      expect(res.body.username).toBe('newUsernameForMe')

      const userInDb = await User.findOne({ where: { username: 'newUsernameForMe' } })
      expect(userInDb.username).toBe(res.body.username)
      userIds[0].username = 'newUsernameForMe'
    })

    test('it throws correct errors if unauthorized, invalid body or resource not found', async () => {
      await api
        .put(`${route}/${userIds[0].username}`)
        .set('Cookie', testUserCookie)
        .send({ username: 'newUsernameForMe2' })
        .expect(401)
      await api
        .put(`${route}/${userIds[0].username}`)
        .set('Cookie', userIds[0].cookie)
        .send({ name: 'newUsernameForMe2' })
        .expect(400)
      await api
        .put(`${route}/thisisnotfoundforsure`)
        .set('Cookie', userIds[0].cookie)
        .send({ name: 'newUsernameForMe2' })
        .expect(400)
    })
  })
})
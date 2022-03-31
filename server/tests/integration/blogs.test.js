const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)

const { User, Blog, Taglist } = require('../../database/models')
const { logInAndGetSessionCookies } = require('../testHelpers')

const route = '/api/blogs'
const blogIds = []
let user, blogs, testUserCookie, defaultUserCookie

describe('When using route /api/blogs', () => {

  beforeAll(async () => {
    const cookieRes = await logInAndGetSessionCookies(api)
    expect(cookieRes.testUserCookie).toBeTruthy()
    testUserCookie = cookieRes.testUserCookie
    defaultUserCookie = cookieRes.defaultUserCookie

    const userRes =  await User.findOne({ where: { username: 'testUser' } })
    expect(userRes.dataValues).toBeTruthy()
    user = userRes.dataValues

    const blogRes = await Blog.findAll({ raw: true })
    expect(blogRes.length).toBeTruthy()
    blogs = blogRes
  })

  describe('When sending GET request', () => {
    test('it returns all blogs', async () => {
      const res = await api.get(route)
      expect(res.status).toBe(200)
      expect(res.body.length).toBe(blogs.length)
    })

    test('it returns correct blogs with search req query', async () => {
      let res = await api.get(`${route}?author=Ada`)
      expect(res.status).toBe(200)
      expect(res.body[0].author).toMatch('Ada')
      expect(res.body.find(b => b.author.includes('Fre Derik'))).toBeFalsy()

      res = await api.get(`${route}?search=LoVe+And+laces`)
      expect(res.body[0].author).toMatch('Ada')
      expect(res.body[0].title).toMatch('Love and')
    })

    test('it returns the right blog with params id', async () => {
      const res = await api.get(`${route}/${blogs[0].id}`)
      expect(res.body.id).toBe(blogs[0].id)
      expect(res.body.title).toBe(blogs[0].title)
    })

    test('it returns 400 with invalid params id', async () => {
      await api.get(`${route}/123456`).expect(400)
    })
  })

  describe('When sending POST request', () => {
    test('it creates a blog with valid body and authenticated user', async () => {
      const res = await api
        .post(route)
        .set('Cookie', testUserCookie)
        .send({
          title: 'sometitle',
          url: 'www.url.com',
          tags: [{ id: 1 }, { id: 2 }]
        })

      expect(res.status).toBe(200)
      const blog = res.body.blog
      expect(blog.title).toBe('sometitle')
      expect(blog.url).toBe('www.url.com')
      expect(blog.userId).toBe(user.id)
      expect(blog.author).toBeFalsy()
      expect(blog.likes).toBe(0)
      expect(res.body.tags.length).toBe(2)
      blogIds.push(blog.id)
    })

    test('it throws error if the title or url is not unique', async () => {
      let res = await api
        .post(route)
        .set('Cookie', testUserCookie)
        .send({ title: 'sometitle2', url: 'www.url.com' })
      expect(res.status).toBe(400)
      expect(res.body.error).toMatch('already exists')

      res = await api
        .post(route)
        .set('Cookie', testUserCookie)
        .send({ title: 'sometitle', url: 'www.url222.com' })
      expect(res.status).toBe(400)
      expect(res.body.error).toMatch('already exists')
    })

    test('it throws 400 if req body is not valid or tags are not in db', async () => {
      await api
        .post(route)
        .set('Cookie', testUserCookie)
        .send({ url: 'www.url222.com' })
        .expect(400)

      await api
        .post(route)
        .set('Cookie', testUserCookie)
        .send({ title: 'sometitle4', url: 'www.url222.com', tags: [{ id: 1000 }] })
        .expect(400)
    })
  })

  describe('When sending PUT request', () => {
    test('it increases likes accordingly', async () => {
      const beforePut = blogs.find(b => b.id === 1)

      const res = await api
        .put(`${route}/1/likes`)
        .set('Cookie', testUserCookie)
        .send({ likes: 3 })
      expect(res.body.likes).toBe(beforePut.likes + 3)
    })
  })

  describe('When sending DELETE request', () => {
    test('it throws 401 for unauthenticated or unauthorized user', async () => {
      await api
        .delete(`${route}/${blogIds[0]}`)
        .expect(401)

      await api
        .delete(`${route}/${blogIds[0]}`)
        .set('Cookie', defaultUserCookie)
        .expect(401)
    })

    test('it deletes blog and associated tables with authenticated and authorized user', async () => {
      const options = { where: { id: blogIds[0] } }
      let taglists = await Taglist.findAll(options)
      expect(taglists.length).toBeTruthy()

      await api
        .delete(`${route}/${blogIds[0]}`)
        .set('Cookie', testUserCookie)
        .expect(204)

      taglists = await Taglist.findAll(options)
      expect(taglists.length).toBeFalsy()
    })
  })
})
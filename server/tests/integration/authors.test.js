const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)

describe('When using route /api/authors', () => {
  describe('When sending GET request', () => {

    test('it returns the blogs by authors in correct array', async () => {
      const res = await api.get('/api/authors')
      expect(res.status).toBe(200)
      const authors = res.body
      expect(authors.length).toBeTruthy()
      expect(authors[0].likes)
        .toBeGreaterThanOrEqual(authors[authors.length-1].likes)
    })
  })
})
const { DEFAULT_PASS } = require('../utils/config')

//Log in users and return session cookies
const logInAndGetSessionCookies = async api => {
  const res = await api
    .post('/api/login')
    .send({ username: 'testUser', password: DEFAULT_PASS })
  const testUserCookie = res.headers['set-cookie'].find(c => c.includes('sessionId='))

  const res2 = await api
    .post('/api/login')
    .send({ username: 'defaultUser', password: DEFAULT_PASS })
  const defaultUserCookie = res2.headers['set-cookie'].find(c => c.includes('sessionId='))
  return { testUserCookie, defaultUserCookie }
}

module.exports = {
  logInAndGetSessionCookies
}
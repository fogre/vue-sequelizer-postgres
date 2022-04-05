const { DEFAULT_PASS } = require('../utils/config')

const getSessionCookie = async (api, username) => {
  const res = await api
    .post('/api/login')
    .send({
      username,
      password: DEFAULT_PASS
    })
  return res.headers['set-cookie'].find(c => c.includes('sessionId='))
}

//Log in users and return session cookies
const logInAndGetSessionCookies = async api => {
  const testUserCookie = await getSessionCookie(api, 'testUser')
  const defaultUserCookie = await getSessionCookie(api, 'defaultUser')
  return { testUserCookie, defaultUserCookie }
}

module.exports = {
  getSessionCookie,
  logInAndGetSessionCookies
}
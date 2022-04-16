require('dotenv').config()

const ENV = process.env.NODE_ENV
const PORT = process.env.PORT || 3001
const SECRET = process.env.SECRET
const REDIS_URL = process.env.REDIS_URL
let DEFAULT_PASS
let DATABASE_URL = process.env.DATABASE_URL

if (ENV !== 'production') {
  DEFAULT_PASS = 'fakepassword'
}
if (ENV === 'test') {
  DATABASE_URL = process.env.TEST_DATABASE_URL
}

module.exports = {
  DATABASE_URL,
  DEFAULT_PASS,
  ENV,
  PORT,
  SECRET,
  REDIS_URL
}
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const DATABASE_URL = process.env.DATABASE_URL
const ENV = process.env.NODE_ENV
const PORT = process.env.PORT || 3001
const SECRET = process.env.SECRET
const REDIS_URL = process.env.REDIS_URL
let DEFAULT_PASS


if (ENV !== 'production') {
  DEFAULT_PASS = 'FakePasswordForSeededUsers'
}

module.exports = {
  DATABASE_URL,
  DEFAULT_PASS,
  ENV,
  PORT,
  SECRET,
  REDIS_URL
}
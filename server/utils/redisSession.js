const redis = require('redis')
const session = require('express-session')
const connectRedis = require('connect-redis')
const { ENV, REDIS_URL, SECRET } = require('./config')

if (!REDIS_URL) {
  console.log('No REDIS_URL set, Redis is disabled')
  process.exit(1)
}

const RedisStore = connectRedis(session)
const redisClient = redis.createClient({
  url: REDIS_URL,
  legacyMode: true
})

redisClient
  .connect()
  .then(() => {
    if (ENV !== 'test') {
      console.log('Redis client connected')
    }
  })
  .catch(e => console.log(e))

const redisSessionStorage = session({
  store: new RedisStore({ client: redisClient }),
  secret: SECRET,
  saveUninitialized: false,
  resave: false,
  name: 'sessionId',
  cookie: {
    secure: ENV === 'production' ? true : false,
    httpOnly: true,
    maxAge: 1000 * 60 * 30
  }
})

module.exports = {
  redisClient,
  redisSessionStorage
}
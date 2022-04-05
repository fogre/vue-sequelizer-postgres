const redis = require('redis')
const session = require('express-session')
const connectRedis = require('connect-redis')
const { promisify } = require('util')
const { ENV, REDIS_URL, SECRET } = require('./config')

if (!REDIS_URL) {
  console.log('No REDIS_URL set, Redis is disabled')
  process.exit(1)
}

let getAsync
let setAsync
let expireAsync
let delAsync
const expirationTime = 1000 * 60 * 30 //30mins
const RedisStore = connectRedis(session)
const redisClient = redis.createClient({
  url: REDIS_URL,
  legacyMode: true
})

redisClient
  .connect()
  .then(() => {
    getAsync = promisify(redisClient.get).bind(redisClient)
    setAsync = promisify(redisClient.set).bind(redisClient)
    expireAsync = promisify(redisClient.expire).bind(redisClient)
    delAsync = promisify(redisClient.del).bind(redisClient)
    if (ENV !== 'test') {
      console.log('Redis client connected')
    }
  })
  .catch(e => {
    console.log(e)
    process.exit(1)
  })

const redisSessionStorage = session({
  store: new RedisStore({ client: redisClient }),
  secret: SECRET,
  saveUninitialized: false,
  resave: false,
  name: 'sessionId',
  cookie: {
    secure: ENV === 'production' ? true : false,
    httpOnly: true,
    maxAge: expirationTime
  }
})

const setAsBanned = async id => {
  await setAsync(`banned:${id}`, id)
  await expireAsync(`banned:${id}`, expirationTime)
}

const checkIfBanned = async id => {
  return await getAsync(`banned:${id}`)
}

const deleteKeys = async session => {
  await session.destroy()
  await delAsync(`banned:${session.userId}`)
}

module.exports = {
  setAsBanned,
  checkIfBanned,
  deleteKeys,
  redisSessionStorage
}
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('express-async-errors')
require('pg').defaults.parseInt8 = true

const { connectToDatabase } = require('./database/sequelize')
const errorMiddleware = require('./middleware/errorMiddleware')
const { redisSessionStorage } = require('./utils/redisSession')
const { PORT, ENV } = require('./utils/config')

const authorsRouter = require('./routes/authors')
const blogsRouter = require('./routes/blogs')
const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const readinglistsRouter = require('./routes/readinglists')
const tagsRouter = require('./routes/tags')
const usersRouter =  require('./routes/users')

const app = express()
app.use(redisSessionStorage)
app.use(errorMiddleware.checkSessionConnection)
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:80',
    'https://localhost:80',
  ],
  exposedHeaders: ['set-cookie'],
  credentials: true
}))
app.use(express.json())

if (ENV !== 'test') {
  app.use(logger('dev'))
}

app.use('/', indexRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/readinglists', readinglistsRouter)
app.use('/api/tags', tagsRouter)
app.use('/api/users', usersRouter)

app.use(errorMiddleware.unknownEndpoint)
app.use(errorMiddleware.errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

if (ENV !== 'test') {
  start()
}

module.exports = app
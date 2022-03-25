const express = require('express');
const logger = require('morgan')
const cors = require('cors')
require('express-async-errors')

const { connectToDatabase } = require('./database/sequelize')
const errorMiddleware = require('./middleware/errorMiddleware')
const { redisSessionStorage } = require('./utils/redisSession')

const authorsRouter = require('./routes/authors')
const blogsRouter = require('./routes/blogs')
const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const readinglistsRouter = require('./routes/readinglists')
const usersRouter =  require('./routes/users')

const app = express()
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(redisSessionStorage)

app.use('/', indexRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/readinglists', readinglistsRouter)
app.use('/api/users', usersRouter)

app.use(errorMiddleware.unknownEndpoint)
app.use(errorMiddleware.errorHandler)

const connectDB = async () => {
  await connectToDatabase()
}

connectDB()





module.exports = app;
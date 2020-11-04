const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')

const app = express()

// added from solution
mongoose.set('useCreateIndex', true)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  //  useFindAndModify: false, //changed to match solution
  })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connection to MongoDB:', error.message)
  })
// added from solution
mongoose.set('useFindAndModify', false)

app.use(cors())
app.use(express.json())
//app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')

  logger.info('connecting to', config.MONGODB_URI)
 // app.use(cors()) //changed to match solution

  app.use('/api/testing', testingRouter)
}

// app.use(middleware.unknownEndpoint) //changed to match solution
app.use(middleware.errorHandler)

module.exports = app

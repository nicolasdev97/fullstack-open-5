const express = require('express')

const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')

const middleware = require('./util/middleware')

const app = express()

app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(middleware.errorHandler)

module.exports = app
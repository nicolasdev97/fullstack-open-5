const express = require('express')

const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/authors')
const readingListsRouter = require('./controllers/readinglists')
const logoutRouter = require('./controllers/logout')
const testingRouter = require('./controllers/testing')

const middleware = require('./util/middleware')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglists', readingListsRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/testing', testingRouter)

app.use(middleware.errorHandler)

module.exports = app
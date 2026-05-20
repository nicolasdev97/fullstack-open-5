const express = require('express')

const blogRouter = require('./controllers/blogs')

const app = express()

app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app
const express = require('express')
const app = express()

const sequelize = require('./util/db')
const blogRouter = require('./controllers/blogs')

app.use(express.json())

app.use('/api/blogs', blogRouter)

const start = async () => {
    try {
        await sequelize.authenticate()
        console.log('Database connected')

        app.listen(3001, () => {
            console.log('Server running on port 3001')
        })
    } catch (error) {
        console.error('Error connecting to database:', error)
    }
}

start()
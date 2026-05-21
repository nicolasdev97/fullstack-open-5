const app = require('./app')
const sequelize = require('./util/db')

const User = require('./models/user')
const Blog = require('./models/blog')

const PORT = 3001

const start = async () => {
    try {
        await sequelize.authenticate()
        console.log('Database connected')

        await User.sync()
        await Blog.sync({ alter: true })

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.error('Unable to connect to database:', error)
    }
}

start()
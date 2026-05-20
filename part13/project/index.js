const app = require('./app')
const sequelize = require('./util/db')

const User = require('./models/user')

const PORT = 3001

const start = async () => {
    try {
        await sequelize.authenticate()
        console.log('Database connected')

        await User.sync()

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.error('Unable to connect to database:', error)
    }
}

start()
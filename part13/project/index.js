const app = require('./app')
const { sequelize } = require('./util/db')

const PORT = process.env.PORT || 3001

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        console.log('Database connected')

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.log('Error connecting to database:', error.message)
    }
}

start()
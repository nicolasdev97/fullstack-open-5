const express = require('express')
const sequelize = require('./util/db')

const app = express()

const start = async () => {
    try {
        await sequelize.authenticate()
        console.log('Database connected successfully')

        app.listen(3001, () => {
            console.log('Server running on port 3001')
        })
    } catch (error) {
        console.error('Unable to connect to database:', error)
    }
}

start()
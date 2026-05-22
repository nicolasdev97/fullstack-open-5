const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

const Blog = require('./blog')
const ReadingList = require('./reading_list')

// User model

class User extends Model { }

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'user'
})

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, {
    through: ReadingList,
    as: 'readings'
})

Blog.belongsToMany(User, {
    through: ReadingList,
    as: 'users'
})

module.exports = User
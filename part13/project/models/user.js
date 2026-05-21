const { Model, DataTypes } = require('sequelize')

const sequelize = require('../util/db')

const Blog = require('./blog')

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

module.exports = User
const { Model, DataTypes } = require('sequelize')

const sequelize = require('../util/db')

// User model

class User extends Model { }

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: 'user'
    }
)

module.exports = User
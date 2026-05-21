const { Model, DataTypes } = require('sequelize')

const sequelize = require('../util/db')

// Blog model

class Blog extends Model { }

Blog.init(
    {
        author: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: 'blog'
    }
)

module.exports = Blog
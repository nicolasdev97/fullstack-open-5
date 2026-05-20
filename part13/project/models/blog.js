const { Model, DataTypes } = require('sequelize')
const sequelize = require('../util/db')

// Blog model

class Blog extends Model { }

Blog.init(
    {
        author: DataTypes.TEXT,
        title: DataTypes.TEXT,
        url: DataTypes.TEXT,
        likes: DataTypes.INTEGER
    },
    {
        sequelize,
        modelName: 'blog'
    }
)

module.exports = Blog
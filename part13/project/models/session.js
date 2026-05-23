const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Session extends Model { }

Session.init({
    token: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'session'
})

module.exports = Session
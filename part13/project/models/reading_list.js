const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

// ReadingList model

class ReadingList extends Model { }

ReadingList.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'reading_list'
})

module.exports = ReadingList
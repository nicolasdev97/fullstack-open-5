const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

// ReadingList model

class ReadingList extends Model { }

ReadingList.init(
    {
        read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: 'reading_list'
    }
)

module.exports = ReadingList
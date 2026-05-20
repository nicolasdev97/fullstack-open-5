const { ValidationError, UniqueConstraintError } = require('sequelize')

const errorHandler = (error, req, res, next) => {
    console.error(error)

    if (
        error instanceof ValidationError ||
        error instanceof UniqueConstraintError
    ) {
        return res.status(400).json({
            error: error.errors.map(e => e.message)
        })
    }

    res.status(500).json({
        error: 'something went wrong'
    })
}

module.exports = {
    errorHandler
}
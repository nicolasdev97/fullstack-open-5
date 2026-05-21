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

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')

    if (authorization && authorization.startsWith('Bearer ')) {
        req.token = authorization.replace('Bearer ', '')
    }

    next()
}

module.exports = {
    errorHandler,
    tokenExtractor
}
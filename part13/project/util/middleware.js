const { ValidationError, UniqueConstraintError } = require('sequelize')

const jwt = require('jsonwebtoken')

const { SECRET } = require('../util/config')

const { Session, User } = require('../models')

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

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    } else {
        req.token = null
    }

    next()
}

const userExtractor = async (req, res, next) => {
    try {

        const decodedToken = jwt.verify(req.token, SECRET)

        const session = await Session.findOne({
            where: {
                token: req.token
            }
        })

        if (!session) {
            return res.status(401).json({
                error: 'session expired'
            })
        }

        const user = await User.findByPk(decodedToken.id)

        if (!user) {
            return res.status(401).json({
                error: 'user not found'
            })
        }

        if (user.disabled) {
            return res.status(401).json({
                error: 'user disabled'
            })
        }

        req.decodedToken = decodedToken
        req.user = user

        next()

    } catch (error) {
        return res.status(401).json({
            error: 'token invalid'
        })
    }
}


module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
}
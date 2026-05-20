const router = require('express').Router()

const User = require('../models/user')

// User controller

router.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body)

        res.json(user)
    } catch (error) {
        next(error)
    }
})

router.get('/', async (req, res) => {
    const users = await User.findAll()

    res.json(users)
})

router.put('/:username', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.params.username
            }
        })

        if (!user) {
            return res.status(404).json({
                error: 'user not found'
            })
        }

        user.name = req.body.name

        await user.save()

        res.json(user)
    } catch (error) {
        next(error)
    }
})

module.exports = router
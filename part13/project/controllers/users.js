const router = require('express').Router()

const User = require('../models/user')
const Blog = require('../models/blog')

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
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: ['id', 'title', 'author', 'url', 'likes']
        }
    })

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
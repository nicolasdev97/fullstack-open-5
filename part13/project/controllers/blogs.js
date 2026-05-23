const router = require('express').Router()
const sequelize = require('../util/db')

const jwt = require('jsonwebtoken')

const { User, Blog } = require('../models')

const { SECRET } = require('../util/config')

const { tokenExtractor, userExtractor } = require('../util/middleware')

const { Op } = require('sequelize')

// Blog controller

router.get('/', async (req, res) => {
    const where = {}

    if (req.query.search) {
        where[Op.or] = [
            {
                title: {
                    [Op.iLike]: `%${req.query.search}%`
                }
            },
            {
                author: {
                    [Op.iLike]: `%${req.query.search}%`
                }
            }
        ]
    }

    const blogs = await Blog.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['username', 'name']
        },
        where,
        order: [['likes', 'DESC']]
    })

    res.json(blogs)
})

router.post('/', tokenExtractor, userExtractor, async (req, res, next) => {
    try {

        const blog = await Blog.create({
            ...req.body,
            userId: req.user.id
        })

        res.json(blog)

    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findByPk(req.params.id)

        if (!blog) {
            return res.status(404).json({
                error: 'blog not found'
            })
        }

        await blog.update(req.body)

        res.json(blog)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', tokenExtractor, userExtractor, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)

        if (!user) {
            return res.status(401).json({
                error: 'token invalid'
            })
        }

        const blog = await Blog.findByPk(req.params.id)

        if (!blog) {
            return res.status(404).json({
                error: 'blog not found'
            })
        }

        if (blog.userId !== user.id) {
            return res.status(401).json({
                error: 'only the creator can delete a blog'
            })
        }

        await blog.destroy()

        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

module.exports = router
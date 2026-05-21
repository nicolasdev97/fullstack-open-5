const router = require('express').Router()
const sequelize = require('../util/db')

const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

const { SECRET } = require('../util/config')

// Blog controller

router.get('/', async (req, res) => {
    const blogs = await sequelize.query('SELECT * FROM blogs')

    res.json(blogs[0])
})

router.post('/', async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, SECRET)

        if (!decodedToken.id) {
            return res.status(401).json({
                error: 'token invalid'
            })
        }

        const user = await User.findByPk(decodedToken.id)

        const blog = await Blog.create({
            ...req.body,
            userId: user.id
        })

        res.json(blog)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const { likes } = req.body

        const result = await sequelize.query(
            `
      UPDATE blogs
      SET likes = :likes
      WHERE id = :id
      RETURNING *
      `,
            {
                replacements: {
                    likes,
                    id
                }
            }
        )

        if (result[0].length === 0) {
            return res.status(404).json({
                error: 'blog not found'
            })
        }

        res.json(result[0][0])
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    await sequelize.query(
        'DELETE FROM blogs WHERE id = :id',
        {
            replacements: { id }
        }
    )

    res.status(204).end()
})

module.exports = router
const router = require('express').Router()

const { ReadingList, User, Blog } = require('../models')

// ReadingList controller

router.post('/', async (req, res, next) => {
    try {
        const { blogId, userId } = req.body

        const blog = await Blog.findByPk(blogId)
        const user = await User.findByPk(userId)

        if (!blog) {
            return res.status(404).json({
                error: 'blog not found'
            })
        }

        if (!user) {
            return res.status(404).json({
                error: 'user not found'
            })
        }

        const readingList = await ReadingList.create({
            blogId,
            userId
        })

        res.status(201).json(readingList)

    } catch (error) {
        next(error)
    }
})

module.exports = router
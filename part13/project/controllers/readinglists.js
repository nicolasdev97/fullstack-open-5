const router = require('express').Router()

const { ReadingList, User, Blog } = require('../models')

const { tokenExtractor } = require('../util/middleware')

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

router.put('/:id', tokenExtractor, async (req, res, next) => {
    try {

        console.log('PARAM ID:', req.params.id)

        console.log('MODEL:', ReadingList)

        const all = await ReadingList.findAll()

        console.log('ALL:', JSON.stringify(all, null, 2))

        const readingList = await ReadingList.findByPk(req.params.id)

        console.log('FOUND:', readingList)

        if (!readingList) {
            return res.status(404).json({
                error: 'reading list entry not found'
            })
        }

        readingList.read = req.body.read

        await readingList.save()

        res.json(readingList)

    } catch (error) {
        next(error)
    }
})

module.exports = router
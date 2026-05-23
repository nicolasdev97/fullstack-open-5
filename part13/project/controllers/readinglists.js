const router = require('express').Router()

const { ReadingList, User, Blog } = require('../models')

const { tokenExtractor, userExtractor } = require('../util/middleware')

// ReadingList controller

router.post('/', async (req, res, next) => {
    try {

        const { userId, blogId } = req.body

        if (!userId) {
            return res.status(400).json({
                error: 'userId missing'
            })
        }

        if (!blogId) {
            return res.status(400).json({
                error: 'blogId missing'
            })
        }

        const user = await User.findByPk(userId)

        if (!user) {
            return res.status(404).json({
                error: 'user not found'
            })
        }

        const blog = await Blog.findByPk(blogId)

        if (!blog) {
            return res.status(404).json({
                error: 'blog not found'
            })
        }

        const existing = await ReadingList.findOne({
            where: {
                userId,
                blogId
            }
        })

        if (existing) {
            return res.status(400).json({
                error: 'blog already in reading list'
            })
        }

        const readingList = await ReadingList.create({
            userId,
            blogId,
            read: false
        })

        res.status(201).json({
            id: readingList.id,
            user_id: readingList.userId,
            blog_id: readingList.blogId,
            read: readingList.read,
            created_at: readingList.createdAt,
            updated_at: readingList.updatedAt
        })

    } catch (error) {
        next(error)
    }
})

router.put(
    '/:id',
    tokenExtractor,
    userExtractor,
    async (req, res, next) => {

        try {

            const readingList = await ReadingList.findByPk(req.params.id)

            if (!readingList) {
                return res.status(404).json({
                    error: 'reading list entry not found'
                })
            }

            if (readingList.userId !== req.user.id) {
                return res.status(401).json({
                    error: 'not authorized'
                })
            }

            readingList.read = req.body.read

            await readingList.save()

            res.json(readingList)

        } catch (error) {
            next(error)
        }
    }
)

module.exports = router
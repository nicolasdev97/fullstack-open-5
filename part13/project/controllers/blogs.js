const router = require('express').Router()
const sequelize = require('../util/db')

router.get('/', async (req, res) => {
    const blogs = await sequelize.query('SELECT * FROM blogs')

    res.json(blogs[0])
})

router.post('/', async (req, res) => {
    const { author, url, title, likes } = req.body

    const result = await sequelize.query(
        `
    INSERT INTO blogs (author, url, title, likes)
    VALUES (:author, :url, :title, :likes)
    RETURNING *
    `,
        {
            replacements: {
                author,
                url,
                title,
                likes: likes || 0
            }
        }
    )

    res.status(201).json(result[0][0])
})

router.put('/:id', async (req, res) => {
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
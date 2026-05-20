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
const router = require('express').Router()

const { User, Blog } = require('../models')

router.post('/reset', async (req, res) => {
    await Blog.destroy({
        where: {}
    })

    await User.destroy({
        where: {}
    })

    res.status(204).end()
})

module.exports = router
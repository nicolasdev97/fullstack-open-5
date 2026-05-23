const router = require('express').Router()

const {
    User,
    Blog,
    ReadingList,
    Session
} = require('../models')

router.post('/reset', async (req, res) => {

    await ReadingList.destroy({
        where: {},
        truncate: true,
        cascade: true,
        restartIdentity: true
    })

    await Session.destroy({
        where: {},
        truncate: true,
        cascade: true,
        restartIdentity: true
    })

    await Blog.destroy({
        where: {},
        truncate: true,
        cascade: true,
        restartIdentity: true
    })

    await User.destroy({
        where: {},
        truncate: true,
        cascade: true,
        restartIdentity: true
    })

    res.status(204).end()
})

module.exports = router
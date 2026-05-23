const User = require('./user')
const Blog = require('./blog')
const ReadingList = require('./reading_list')
const Session = require('./session')

// Relations between User and Blog
User.hasMany(Blog)
Blog.belongsTo(User)

// Relations between User and Blog through ReadingList
User.belongsToMany(Blog, {
  through: ReadingList,
  as: 'readings'
})

Blog.belongsToMany(User, {
  through: ReadingList
})

// Relations between User and Session

User.hasMany(Session)
Session.belongsTo(User)

module.exports = {
  User,
  Blog,
  ReadingList,
  Session
}
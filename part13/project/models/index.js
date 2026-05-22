const User = require('./user')
const Blog = require('./blog')
const ReadingList = require('./reading_list')

// Relations between models
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

module.exports = {
  User,
  Blog,
  ReadingList
}
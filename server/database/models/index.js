const Blog = require('./blog')
const Tag = require('./tag')
const Taglist = require('./taglist')
const User = require('./user')
const Readinglist = require('./readinglist')

Blog.belongsTo(User)
User.hasMany(Blog)

User.belongsToMany(Blog, { through: Readinglist, as: 'readings' })
Blog.belongsToMany(User, { through: Readinglist, as: 'listings' })

Blog.belongsToMany(Tag, { through: Taglist, as: 'tags' })
Tag.belongsToMany(Blog, { through: Taglist, as: 'blogs' })

module.exports = {
  Blog,
  Tag,
  Taglist,
  User,
  Readinglist,
}
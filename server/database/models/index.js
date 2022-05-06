const Blog = require('./blog')
const Like = require('./like')
const Readinglist = require('./readinglist')
const Tag = require('./tag')
const Taglist = require('./taglist')
const User = require('./user')

Blog.belongsTo(User)
User.hasMany(Blog)

User.belongsToMany(Blog, { through: Readinglist, as: 'readings' })
Blog.belongsToMany(User, { through: Readinglist, as: 'listings' })

User.belongsToMany(Blog, { through: Like, as: 'liked_blogs' })
Blog.belongsToMany(User, { through: Like, as: 'liked_by' })
User.hasMany(Like)
Like.belongsTo(User)
Blog.hasMany(Like)
Like.belongsTo(Blog)


Blog.belongsToMany(Tag, { through: Taglist, as: 'tags' })
Tag.belongsToMany(Blog, { through: Taglist, as: 'blogs' })

module.exports = {
  Blog,
  Tag,
  Taglist,
  Like,
  User,
  Readinglist,
}
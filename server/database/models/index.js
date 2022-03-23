const Blog = require('./blog');
const User = require('./user');
const Readinglist = require('./readinglist')

Blog.belongsTo(User)
User.hasMany(Blog)

User.belongsToMany(Blog, { through: Readinglist, as: 'readings' })
Blog.belongsToMany(User, { through: Readinglist, as: 'listings' })

module.exports = {
  Blog,
  User,
  Readinglist,
};
const router = require('express').Router()
const { sequelize } = require('../database/sequelize')
const { Blog, Like } = require('../database/models')

router.get('/', async (req,res) => {
  const blogs = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('author')), 'blogs'],
      [sequelize.literal(`
        (SELECT COUNT(*) FROM likes WHERE likes.blog_id = blog.id)
      `), 'likecount']
    ],
    include: [
      { model: Like, attributes: [] }
    ],
    group: ['author', 'blog.id'],
    order: [ [sequelize.literal('likecount DESC')] ]
  })
  res.json(blogs)
})

module.exports = router
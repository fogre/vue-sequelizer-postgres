const router = require('express').Router()
const { sequelize } = require('../database/sequelize')
const { Blog, Like } = require('../database/models')
const { isResourceInDB } = require('../utils/validators')

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

router.get('/:author', async (req, res) => {
  const blogs = await Blog.findAll({
    where: {
      author: req.params.author
    }
  })
  isResourceInDB(blogs, req)
  res.json(blogs)
})

module.exports = router
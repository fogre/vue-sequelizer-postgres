const { Op } = require('sequelize')
const router = require('express').Router()

const { sequelize } = require('../database/sequelize')
const { User, Blog, Tag, Like, Readinglist, Taglist } = require('../database/models')
const { confirmSession } = require('../middleware/authenticationMiddleware')
const { isAuthorizedUser, isReqBodyValid, isResourceInDB } = require('../utils/validators')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  isResourceInDB(req.blog, req)
  next()
}

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    const searchOp = { [Op.iLike]: `%${req.query.search}%` }
    where[Op.or] = [
      { author: searchOp },
      { title: searchOp },
      { url: searchOp }
    ]
  }

  const blogs = await Blog.findAll({
    attributes: {
      exclude: ['userId'],
      include: [
        [sequelize.literal(`
          (SELECT COUNT(*) FROM likes WHERE likes.blog_id = blog.id)
        `), 'likecount']
      ]
    },
    include: [
      {
        model: User,
        attributes: ['username', 'id']
      },
      {
        model: Like,
        attributes: [],
      }
    ],
    group: ['blog.id', 'user.id', 'user.username', 'likes.id'],
    order: [
      [sequelize.literal('likecount DESC')]
    ],
    where
  })
  res.json(blogs)
})

router.get('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id, {
    attributes: {
      exclude: ['userId'],
      include: [
        [sequelize.literal(`
          (SELECT COUNT(*) FROM likes WHERE likes.blog_id = blog.id)
        `), 'likecount']
      ]
    },
    include: [
      {
        model: User,
        attributes: ['username', 'id']
      },
      {
        model: User,
        as: 'liked_by',
        attributes: ['id', 'username'],
        through: {
          attributes: []
        },
      },
      {
        model: Tag,
        as: 'tags',
        through: {
          attributes: []
        },
      }
    ]
  })
  isResourceInDB(blog, req)
  res.json(blog)
})

router.post('/', confirmSession, async (req, res) => {
  isReqBodyValid(['title', 'url'], req.body)
  const { author, title, url, tags } = req.body
  let tagsInDB

  //parse url so all the urls are more uniform
  let parsedUrl = url.replace(/^https?:\/\//, '')

  const blog = await Blog.create({
    title,
    url: parsedUrl,
    author: author || null,
    userId: req.session.userId
  })

  //if blog comes with tags, create Taglist join tables
  if (tags) {
    if (!Array.isArray(tags)) {
      return res.status(400).json({ error: 'tags should be an array' })
    }
    tagsInDB = await Tag.findAll({
      where: { id: tags.map(t => t.id) },
      raw: true
    })
    isResourceInDB(tagsInDB, req)
    await Taglist.bulkCreate(tagsInDB.map(t => {
      return { blogId: blog.id, tagId: t.id }
    }))
  }
  res.json({ blog, tags: tagsInDB })
})

router.post('/:id/likes', confirmSession, blogFinder, async (req, res) => {
  const likeUserAndBlog = {
    userId: req.session.userId,
    blogId: req.blog.id
  }

  const alreadyLiked = await Like.findOne({ where: likeUserAndBlog })
  if (alreadyLiked) {
    await alreadyLiked.destroy()
    return res.status(204).end()
  }
  const newLike = await Like.create(likeUserAndBlog)
  res.json(newLike)
})

router.delete('/:id', confirmSession, blogFinder, async (req, res) => {
  isAuthorizedUser(req.session, req.blog.userId)
  const findOptions = { where: { blogId: req.blog.id } }
  await Readinglist.destroy(findOptions)
  await Taglist.destroy(findOptions)
  await Like.destroy(findOptions)
  await req.blog.destroy()
  res.status(204).end()
})

module.exports = router
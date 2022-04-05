const { Op } = require('sequelize')
const router = require('express').Router()
const { User, Blog, Tag, Readinglist, Taglist } = require('../database/models')

const { confirmSession } = require('../middleware/authenticationMiddleware')
const { isAuthorizedUser, isReqBodyValid, isResourceInDB } = require('../utils/validators')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  isResourceInDB(req.blog, req)
  next()
}

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search || req.query.author) {
    where[Op.or] = [
      {
        author: {
          [Op.iLike]: `%${req.query.author}%`
        }
      },
      {
        title: {
          [Op.iLike]: `%${req.query.search}%`
        }
      },
      {
        url: {
          [Op.iLike]: `%${req.query.search}%`
        }
      }
    ]
  }

  const blogs = await Blog.findAll({
    attributes: { attributes: { exclude: ['userId'] } },
    include: {
      model: User,
      attributes: ['username']
    },
    order: [
      ['likes', 'DESC']
    ],
    where
  })
  res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res) => {
  res.json(req.blog)
})

router.post('/', confirmSession, async (req, res) => {
  isReqBodyValid(['title', 'url'], req.body)
  const { author, title, url, tags } = req.body
  let tagsInDB

  let parsedUrl = url.replace(/^https?:\/\//, '')
  if (!parsedUrl.startsWith('www.')) {
    parsedUrl = `www.${parsedUrl}`
  }

  const blog = await Blog.create({
    title,
    url: parsedUrl,
    author: author || null,
    userId: req.session.userId
  })

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

router.put('/:id/likes', confirmSession, blogFinder, async(req, res) => {
  isReqBodyValid('likes', req.body)
  req.blog.likes = req.blog.likes + req.body.likes
  const updatedBlog = await req.blog.save()
  res.json(updatedBlog)
})

router.delete('/:id', confirmSession, blogFinder, async (req, res) => {
  isAuthorizedUser(req.session, req.blog.userId)
  const findOptions = { where: { blogId: req.blog.id } }
  await Readinglist.destroy(findOptions)
  await Taglist.destroy(findOptions)
  await req.blog.destroy()
  res.status(204).end()
})

module.exports = router
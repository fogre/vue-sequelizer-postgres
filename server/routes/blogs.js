const { Op } = require('sequelize')
const router = require('express').Router()
const { User, Blog } = require('../database/models')

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
    where[Op.or] = [
      {
        author: {
          [Op.substring]: req.query.search
        }
      },
      {
        title: {
          [Op.substring]: req.query.search
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
  const user = await User.findByPk(req.session.userId)
  const blog = await Blog.create({
    ...req.body,
    userId: user.id
  })
  res.json(blog)
})

router.put('/:id', confirmSession, blogFinder, async(req, res) => {
  isReqBodyValid('likes', req.body)
  req.blog.likes = req.blog.likes + req.body.likes
  const updatedBlog = await req.blog.save()
  res.json(updatedBlog)
})

router.delete('/:id', confirmSession, blogFinder, async (req, res) => {
  isAuthorizedUser(req.session, req.blog.userId)
  await req.blog.destroy()
  res.status(204).end()
})


module.exports = router;
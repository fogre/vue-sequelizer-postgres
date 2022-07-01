const { Op } = require('sequelize')
const router = require('express').Router()

const { Tag, Blog } = require('../database/models')
const { confirmSession } = require('../middleware/authenticationMiddleware')
const { isReqBodyValid, isResourceInDB } = require('../utils/validators')

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where[Op.or] = [
      {
        name: {
          [Op.iLike]: `%${req.query.search}%`
        }
      }
    ]
  }
  const tags = await Tag.findAll({ where })
  res.json(tags)
})

router.get('/:id', async (req, res) => {
  const tag = await Tag.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        as: 'blogs',
        attributes: ['id', 'title'],
        through: {
          attributes: []
        },
      }
    ]
  })
  isResourceInDB(tag, req)
  res.json(tag)
})

router.post('/', confirmSession, async (req, res) => {
  isReqBodyValid('name', req.body)
  const tag = await Tag.create({ name: req.body.name })
  res.json(tag)
})

router.put('/:id', confirmSession, async (req, res) => {
  isReqBodyValid('name', req.body)
  const tag = Tag.findByPk(req.params.id)
  isResourceInDB(tag, req)
  tag.name = req.body.name
  await tag.save()
  res.json(tag)
})

module.exports = router
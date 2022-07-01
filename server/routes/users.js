const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const router = require('express').Router()

const { sequelize } = require('../database/sequelize')
const { User, Blog } = require('../database/models')
const { confirmSession } = require('../middleware/authenticationMiddleware')
const { setAsBanned } = require('../utils/redisSession')
const {
  isAdmin,
  isAuthorizedUser,
  isReqBodyValid,
  isResourceInDB
} = require('../utils/validators')

router.get('/', async (req, res) => {
  const where = {}
  if (req.query.search) {
    where[Op.or] = [
      {
        username: {
          [Op.iLike]: `%${req.query.search}%`
        }
      }
    ]
  }
  const users = await User.findAll({
    attributes: {
      include: [
        //count of user's blogs
        [sequelize.literal(`(
          SELECT COUNT(*) FROM "blogs" AS "blog" WHERE "blog".user_id = "user".id
        )`), 'blogcount'],
        //count of user's blog likes
        [sequelize.literal(`(
          SELECT COUNT(*) FROM "likes" AS "like" WHERE ("like".blog_id) IN
          (SELECT id FROM "blogs" AS "blog" WHERE "blog".user_id = "user".id)
        )`), 'likecount']
      ]
    },
    group: ['user.id'],
    order: [ [sequelize.literal('likecount DESC')] ],
    where
  })
  res.json(users)
})

router.get('/profile', confirmSession, async (req, res) => {
  const user = await User.findByPk(req.session.userId, {
    attributes: { exclude: [''] },
    include: [
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId'] },
        through: {
          attributes: ['id', 'read'],
        }
      }
    ]
  })
  isResourceInDB(user, req)
  return res.json(user)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: [''] },
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'] },
      }
    ]
  })

  isResourceInDB(user, req)
  return res.json(user)
})

//create user and login
router.post('/', async (req, res) => {
  isReqBodyValid(['username', 'name', 'password'], req.body)
  const { username, name, password } = req.body

  if (password.length < 6) {
    return res.status(400).json({
      error: 'Password must be over 6 characters'
    })
  }

  /*
    Case insensitive search for the username.
    Checked here so camelcase usernames are allowed
  */
  const nameTaken = await User.findOne({
    where: {
      username: { [Op.iLike]: username }
    }
  })
  if (nameTaken) {
    return res.status(400).json({
      error: 'This username is already taken.'
    })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({
    username,
    name,
    passwordHash
  })

  req.session.userId = user.id
  req.session.username = user.username

  res.json({
    id: user.id,
    username: user.username,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  })
})

//username update
router.put('/:username', confirmSession, async (req, res) => {
  isReqBodyValid('username', req.body)
  const user = await User.findOne({ where: { username: req.params.username } })
  isResourceInDB(user, req)
  isAuthorizedUser(req.session, user.id)
  user.username = req.body.username
  await user.save()
  res.json(user)
})

//disable user
router.put('/:id/disable', confirmSession, async (req, res) => {
  isAdmin(req.session)
  isReqBodyValid('disabled', req.body)
  const user = await User.findByPk(req.params.id)
  isResourceInDB(user, req)
  user.disabled = req.body.disabled
  await user.save()
  await setAsBanned(user.id)
  res.json({ disabled: user.disabled })
})

module.exports = router
const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User, Blog } = require('../database/models')
const { isReqBodyValid } = require('../utils/validators')
const { confirmSession } = require('../middleware/authenticationMiddleware')

router.post('/', async (req, res) => {
  isReqBodyValid(['username', 'password'], req.body)
  const { username, password } = req.body

  const user = await User
    .scope('withLogin')
    .findOne({
      include: [
        {
          model: Blog,
          as: 'liked_blogs',
          attributes: ['id'],
          through: {
            attributes: []
          }
        }
      ],
      where: { username: username }
    })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  if (user.disabled) {
    return res.status(401).json({
      error: 'account disabled, please contact administration'
    })
  }

  req.session.userId = user.id
  req.session.username = user.username
  if (user.admin) {
    req.session.admin = user.admin
  }

  res.status(200).json({
    id: user.id,
    username: user.username,
    name: user.name,
    liked_blogs: user.liked_blogs
  })
})

router.delete('/', confirmSession, async (req, res) => {
  req.session.destroy()
  res.status(204).end()
})

module.exports = router
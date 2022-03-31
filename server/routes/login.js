const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User } = require('../database/models')
const { isReqBodyValid } = require('../utils/validators')

router.post('/', async (req, res) => {
  isReqBodyValid(['username', 'password'], req.body)
  const { username, password } = req.body

  const user = await User
    .scope('withLogin')
    .findOne({ where: { username: username } })

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

  res.status(200).json({ username: user.username, name: user.name })
})

module.exports = router
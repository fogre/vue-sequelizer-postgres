const bcrypt = require('bcrypt')
const router = require('express').Router();

const { User, Blog } = require('../database/models');
const tokenExtractor = require('../utils/tokenExtractor')
const { isAuthorizedUser, isResourceInDB } = require('../utils/validators')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  });
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const where = {}

  if (req.query.read || req.query.read === false) {
    where.read = req.query.read
  }
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: [''] },
    include: [
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId'] },
        through: {
          attributes: ['id', 'read'],
          where
        }
      }
    ]
  })
  
  isResourceInDB(user, req)
  return res.json(user)
});

router.post('/', async (req, res) => {
  const { username, name, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    name,
    passwordHash
  });

  res.json({
    id: user.id,
    username: user.username,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  });
});

router.put('/:username', tokenExtractor, async (req, res) => {
  if (!req.body.username) {
    return res.status(400).json({ error: 'Missing new username' });
  }

  const user = User.findOne({ where: { username: req.params.username } });
  isResourceInDB(user, req)
  isAuthorizedUser(req.decodedToken.id, user.id)
  user.username = req.body.username;
  await user.save();
  res.json(user);

});

module.exports = router;
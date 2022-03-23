const { Op } = require('sequelize')
const router = require('express').Router()
const { User, Blog } = require('../database/models');

const tokenExtractor = require('../utils/tokenExtractor')
const { isAuthorizedUser, isResourceInDB } = require('../utils/validators')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  isResourceInDB(req.blog, req)
  next()
};

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
  });
  res.json(blogs);
});

router.get('/:id', blogFinder, async (req, res) => {
  res.json(req.blog)
});

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({
    ...req.body,
    userId: user.id
  });
  res.json(blog);
});

router.put('/:id', tokenExtractor, blogFinder, async(req, res) => {
  if (!req.body.likes) {
    return res.status(400).json({ error: 'likes required' })
  }
  req.blog.likes = req.blog.likes + req.body.likes;
  const updatedBlog = await req.blog.save();
  res.json(updatedBlog);
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  isAuthorizedUser(req.decodedToken, req.blog.userId)
  await req.blog.destroy();
  res.status(204).end();
});


module.exports = router;
const router = require('express').Router();
const { sequelize } = require('../database/sequelize');
const { Blog } = require('../database/models');

router.get('/', async (req,res) => {
  const blogs = await Blog.findAll({
    group: 'author',
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('author')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    order: [
      [sequelize.fn('MAX', sequelize.col('likes')), 'DESC']
    ]
  });
  res.json(blogs);
});

module.exports = router
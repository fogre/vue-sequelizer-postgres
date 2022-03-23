const router = require('express').Router()
const { Readinglist } = require('../database/models')
const tokenExtractor = require('../utils/tokenExtractor')
const { isAuthorizedUser, isResourceInDB } = require('../utils/validators')

router.post('/', tokenExtractor, async (req, res) => {
  if (!req.body.blogId || !req.body.userId) {
    return res.status(400).json({ error: 'blog_id and user_id required' })
  }
  const entry = await Readinglist.create({
    userId: req.body.userId,
    blogId: req.body.blogId
  })
  res.json(entry)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  if (!req.body.read) {
    return res.status(400).json({ error: 'read is required' })
  }

  const entry = await Readinglist.findByPk(req.params.id)
  isResourceInDB(entry, req)
  isAuthorizedUser(req.decodedToken, entry.userId)

  entry.read = req.body.read
  await entry.save()
  res.json(entry)
})


module.exports = router
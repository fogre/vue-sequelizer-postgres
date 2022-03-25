const router = require('express').Router()

const { Readinglist } = require('../database/models')
const { confirmSession } = require('../middleware/authenticationMiddleware')
const { isAuthorizedUser, isReqBodyValid, isResourceInDB } = require('../utils/validators')

router.post('/', confirmSession, async (req, res) => {
  isReqBodyValid(['blogId', 'userId'], req.body)
  
  const entry = await Readinglist.create({
    userId: req.body.userId,
    blogId: req.body.blogId
  })
  res.json(entry)
})

router.put('/:id', confirmSession, async (req, res) => {
  isReqBodyValid('read', req.body)

  const entry = await Readinglist.findByPk(req.params.id)
  isResourceInDB(entry, req)
  isAuthorizedUser(req.session, entry.userId)

  entry.read = req.body.read
  await entry.save()
  res.json(entry)
})


module.exports = router
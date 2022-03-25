const router = require('express').Router()

router.get('/', async (req, res) => {
  res.json({
    foo: 'bar'
  })
})

module.exports = router
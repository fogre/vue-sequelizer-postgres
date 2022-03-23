const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization');

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    req.decodedToken = jwt.verify(auth.substring(7), SECRET);
  } else {
    return res.status(401).json({ error: 'unauthorized: token missing'});
  }

  next()
};

module.exports = tokenExtractor
const tokenExtractor = (request, response, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  } else {
    req.token = null
  }
  next()
}

module.exports = { tokenExtractor }
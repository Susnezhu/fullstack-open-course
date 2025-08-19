const { response } = require("express")
const jwt = require('jsonwebtoken')
const User = require('../models/users')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }
  next()
}

const userExtractor = async (request, response, next) => {
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    
    const user = await User.findById(decodedToken.id)
    request.user = user
  } catch (error) {
    return response.status(401).json({ error: 'token invalid or missing' })
  }

  next()
}

module.exports = { tokenExtractor, userExtractor }
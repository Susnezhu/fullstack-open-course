const jwt = require('jsonwebtoken')

const { userExtractor } = require('../utils/middleware')

const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)

})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  let decodedToken = undefined
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
  } catch (error) {
    return response.status(401).json({ error: 'token invalid or missing' })
  }

  const user = request.user

  if (!body.title || !body.url) {
    return response.status(400).end()
  }

  try {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: error.message })
  }
})


blogsRouter.delete('/:id', userExtractor, async (request, response) => {

  let decodedToken = undefined
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET)
  } catch (error) {
    return response.status(401).json({ error: 'token invalid or missing' })
  }

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = request.user
  const blog = await Blog.findById(request.params.id)

  try {
    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      return response.status(200).json({ blog: 'blog deleted' })
    } else {
      return response.status(401).json({ error: 'only owner can delete blog' })
    }
  } catch (error) {
    return response.status(400).json({ error: 'blog was not deleted' })
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const id = request.params.id

  const updated = await Blog
    .findByIdAndUpdate(
      id, 
      body, 
      { new: true, runValidators: true }
    )

  if (updated) {
    response.status(200).json(updated)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter
const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}) 
  response.json(blogs)
})

blogsRouter.get('/', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).end()
  }

  try {
    const blog = new Blog(body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

blogsRouter.delete('/', async (request, response) => {
  const blog = await Blog.findByIdAndDelete(request.params.id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/', async (request, response) => {
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
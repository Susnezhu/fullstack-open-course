const express = require('express')

const Blog = require('./models/blogs.js')
const { request } = require('./app.js')

const app = express()

app.use(express.json())

app.get('/api/blogs', async (request, response) => {
  await Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.get('/api/blogs/:id', async (request, response) => {
  const id = request.params.id
  await Blog
    .findById(id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end
      }
    })
})

app.post('/api/blogs', async (request, response) => {
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

app.delete('/api/blogs/:id', async (request, response) => {
  await Blog
    .findByIdAndDelete(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
})

app.put('/api/blogs/:id', async (request, response) => {
  const body = request.body
  const id = request.params.id

  const updated = await Blog
    .findByIdAndUpdate(id, body, { new: true, runValidators: true })

  if (updated) {
    response.status(200).json(updated)
  } else {
    response.status(404).end()
  }
})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
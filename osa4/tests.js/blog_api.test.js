const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

const Blog = require('../models/blogs')
const testBlogs = [
  {
    title: 'first test blog',
    author: 'first test person',
    url: 'link will be here',
    likes: 10,
  },
  {
    title: 'second test blog',
    author: 'second test person',
    url: 'link will be here',
    likes: 5,
  }
]
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(testBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id is string', async () => {
  const response = await api.get('/api/blogs').expect(200)

  for (let i = 0; i < response.body.length; i++) {
    assert.strictEqual(typeof response.body[i].id, 'string')
  }
})

test('post added one more blog', async () => {
  const response = await api.get('/api/blogs').expect(200)
  const blogsB4 = response.body.length

  await api.post('/api/blogs').send({ 
    title: "test blog",
    author: "test person",
    url: "here will be url",
    likes: 5
  }).expect(201)

  const response2 = await api.get('/api/blogs')
  const blogsNow = response2.body.length

  assert.strictEqual(blogsB4 +1, blogsNow)
})

test('likes is defined', async () => {
  await api
    .post('/api/blogs')
    .send({
      title: "test blog",
      author: "test person",
      url: "here will be url"
    }).expect(201)
})

test('missing title return 400', async () => {
  await api
    .post('/api/blogs')
    .send({
      author:"test person",
      url: "here will be url"
    }).expect(400)
})

test('missing url return 400', async () => {
  await api
    .post('/api/blogs')
    .send({
      title: "test blog",
      author: "test author",
    }).expect(400)
})

after(async () => {
  await mongoose.connection.close()
})
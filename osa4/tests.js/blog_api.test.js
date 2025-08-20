const { test, after, beforeEach, before, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const api = supertest(app)
require('dotenv').config()

const { UpdateTestUsers, UpdateTestBlogs, GetToken } = require('./test_helper')

const Blog = require('../models/blogs')
const User = require('../models/users')

before(async () => {
  const MONGODB_URI = process.env.TEST_MONGODB_URI
  await mongoose.connect(MONGODB_URI)
})


beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  await UpdateTestUsers()
  await UpdateTestBlogs()
})

describe('GET requests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('id returns as a string', async () => {
    const response = await api.get('/api/blogs').expect(200)

    for (const blog of response.body) {
      assert.strictEqual(typeof blog.id, 'string')
    }
  })
})

describe('POST requests', () => {
  test('right amount blogs added', async () => {
    const response = await api.get('/api/blogs').expect(200)
    const blogsB4 = response.body.length

    const token = await GetToken('user1')

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
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
    const token = await GetToken('user2')

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: "test blog",
        author: "test person",
        url: "here will be url"
      }).expect(201)
  })

  test('missing title return 400', async () => {
    const token = await GetToken('user1')

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        author:"test person",
        url: "here will be url"
      }).expect(400)
  })

  test('missing url return 400', async () => {
    const token = await GetToken('user1')

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: "test blog",
        author: "test author",
      }).expect(400)
  })
})


describe('DELETE requests', () => {
  test('delete response is 200', async () => {
    const response = await api.get('/api/blogs').expect(200)
    const blog = response.body
    
    const user = await User.findById(blog[0].user.id)

    const token = await GetToken(user.username)


    await api
      .delete(`/api/blogs/${blog[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
  })

  test('blog is not defined return 404', async () => {
    const token = await GetToken('user1')
    
    const missingId = new mongoose.Types.ObjectId()

    await api
      .delete(`/api/blogs/${missingId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
  })

  test('right amount blogs deleted', async () => {
    const response = await api.get('/api/blogs').expect(200)
    const blogsB4 = response.body.length

    const blog = response.body[0]
    const user = await User.findById(blog.user.id)

    const token = await GetToken(user.username)

    await api
      .delete(`/api/blogs/${blog.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const response2 = await api.get('/api/blogs')
    const blogsNow = response2.body.length

    assert.strictEqual(blogsB4 -1, blogsNow)
  })


})


describe('PUT requests', () => {
  test('put returns status 200', async () => {
    const response = await api.get('/api/blogs').expect(200)
    const blogId = response.body[0].id

    await api
      .put(`/api/blogs/${blogId}`)
      .send({ likes: 15 })
      .expect(200)
  })

  test('amount likes changed', async () => {
    const response = await api.get('/api/blogs').expect(200)
    const blogId = response.body[0].id
    const update = { likes: 20 }

    await api
      .put(`/api/blogs/${blogId}`)
      .send(update)
      .expect(200)

    const changedBlog = await api
      .get(`/api/blogs/${blogId}`)
      .expect(200)

    assert.strictEqual(update.likes, changedBlog.body.likes)
  })
})


after(async () => {
  await mongoose.connection.close()
})
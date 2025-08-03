const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

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

after(async () => {
  await mongoose.connection.close()
})
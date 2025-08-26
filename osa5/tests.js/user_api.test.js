const { test, after, beforeEach, before, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
require('dotenv').config()
const api = supertest(app)

const { UpdateTestUsers, UpdateTestBlogs } = require('./test_helper')

const Blog = require('../models/blogs')
const User = require('../models/users')

before(async () => {
  const MONGODB_URI = process.env.TEST_MONGODB_URI
  await mongoose.connect(MONGODB_URI)
})

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  await UpdateTestUsers()
  await UpdateTestBlogs()
})

test('users returned successfully', async () => {
  await api.get('/api/users').expect(200)
})

describe('wrong users returns 400', () => {
  test('too short username', async () => {
    const res = await api
      .post('/api/users')
      .send({
        username: "Le",
        name: "Leo Mirkam",
        password: "aaaaaaa"
      }).expect(400)

    assert(res.body.error.includes("password or username length is too short"))
  })

  test('too short password', async () => {
    const res = await api.post('/api/users').send({
      username: "Leo",
      name: "Leo Mirkam",
      password: "aa"
    }).expect(400)

    assert(res.body.error.includes("password or username length is too short"))
  })

  test('user alredy exist', async () => {
    const existUser = await api.get('/api/users')

    const res = await api.post('/api/users').send({
      username: existUser.body[0].username,
      name: "test",
      password: "test"
    }).expect(400)

    assert(res.body.error.includes("username already exist"))
  })
})



after(async () => {
  await mongoose.connection.close()
})
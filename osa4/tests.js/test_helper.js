//just for testing!
const bcrypt = require('bcrypt')

const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blogs')
const User = require('../models/users')


const UpdateTestUsers = async () => {
  const passwordHash1 = await bcrypt.hash('1234', 10)
  const passwordHash2 = await bcrypt.hash('1234', 10)
  const passwordHash3 = await bcrypt.hash('1234', 10)

  const testUsers = [
    {
      username: 'user1',
      name: 'Test User One',
      passwordHash: passwordHash1
    },
    {
      username: 'user2',
      name: 'Test User Two',
      passwordHash: passwordHash2
    },
    {
      username: 'user3',
      name: 'Test User Three',
      passwordHash: passwordHash3
    }
  ]

  await User.insertMany(testUsers)
}

const UpdateTestBlogs = async () => {
  const users = await User.find({})

  const testBlogs = [
      {
      title: 'blog 1',
      author: 'test author',
      url: 'link will be here',
      likes: 10,
      user: users[0]._id
    },
    {
      title: 'blog 2',
      author: 'test author',
      url: 'link will be here',
      likes: 15,
      user: users[1]._id
    },
    {
      title: 'blog 3',
      author: 'test author',
      url: 'link will be here',
      likes: 10,
      user: users[2]._id
    },
    {
      title: 'blog 4',
      author: 'test author',
      url: 'link will be here',
      likes: 5,
      user: users[2]._id
    }
  ]

  await Blog.insertMany(testBlogs)
}

const GetToken = async (username) => {
  const response = await api
    .post('/api/login')
    .send({username: username, password: '1234'})
  
  return response.body.token
}

module.exports = { UpdateTestUsers, UpdateTestBlogs, GetToken }

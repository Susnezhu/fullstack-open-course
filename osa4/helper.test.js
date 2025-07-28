const { test, describe } = require('node:test')
const assert = require('node:assert')

const emptyArray = require('./utils/list_helper.js').emptyArray
const dummy = require('./utils/list_helper.js').dummy
const totalLikes = require('./utils/list_helper.js').totalLikes
const favoriteBlog = require('./utils/list_helper.js').favoriteBlog

const blogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234das111',
    title: 'How to make money as a copywriter',
    author: 'Tim Stoddart',
    url: 'https://copyblogger.com/how-to-make-money-as-a-copywriter/',
    likes: 20,
    __v: 0
  },
  {
    _id: '2123769isahd127839811njsd',
    title: 'How To Build a Personal Brand From Scratch',
    author: 'Charles Miller',
    url: 'https://copyblogger.com/build-a-personal-brand/',
    likes: 15,
    __v: 0
  }
]

test('exepted return = 1', () => {

  const result = dummy(blogs)

  assert.strictEqual(result, 1)
})

describe('all blogs check', () => {
  test('total likes', () => {
    const result = totalLikes(blogs)
    assert.strictEqual(result, 40)
  })

  test('favorite blog', () => {
    const result2 = favoriteBlog(blogs)
    assert.strictEqual(result2, 20)
  })

  test('is array empty', () => {
    const result3 = emptyArray(blogs)
    assert.strictEqual(result3, false)
  }) 
})
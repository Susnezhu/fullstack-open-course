var _ = require('lodash');

const emptyArray = (array) => {
  if (array.length === 0) {
    return true
  }
  return false
}

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  let favorite = 0

  for (let i = 0; i < blogs.length; i++) {
    const current = blogs[i].likes
    if (current > favorite) {
      favorite = current
    }
  }
  return favorite
}

const mostBlogs = (blogs) => {
  const authors = _
    .chain(blogs)
    .countBy('author')
    .map((count, author) => ({
      author,
      allBlogs: count
    }))
    .value()

  const mostBlogs = _.maxBy(authors, "allBlogs");

  return mostBlogs.author
}


module.exports = {
  emptyArray,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
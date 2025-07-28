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


module.exports = {
  emptyArray,
  dummy,
  totalLikes,
  favoriteBlog
}
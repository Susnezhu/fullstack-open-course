const Blog = ({ blog, user }) => {
  if (blog.user.id === user.id) {
    return (
      <div>
      {blog.title} {blog.author}
      </div>
    )
  }
}


export default Blog
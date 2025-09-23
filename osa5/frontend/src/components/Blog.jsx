import { useState } from 'react'
import '../styles/blog.css'
import blogService from '../services/blogs'

const Blog = ({ blog, user, showMessage, getAllBlogFunc }) => {

  const [clickedBlog, setClickedBlog] = useState('')

  const handleBlogOpen = (blog) => (
    setClickedBlog(blog)
  )

  const handleBlogClose = () => (
    setClickedBlog('')
  )

  const handleLike = async (blog) => {
    try {
      const response = await blogService.likeBlog(blog.id)

      if (response) {
        showMessage(`You liked: ${blog.title}`, "green")
      }

      getAllBlogFunc()

    }catch (error) {
      console.log("liking blog error:", error)
      showMessage("Something went wrong liking blog", "red")
    }

  }

  const handleDetele = async (blog) => {
    if (window.confirm(`Delete blog "${blog.title}" ?`)) {

      try {
        const response = await blogService.deleteBlog(blog.id)

        if (response) {
          showMessage(`Blog "${blog.title}" deleted successfully`, "green")
        }

        getAllBlogFunc()

      } catch (error) {
        console.log("error deleting blog", error)
        showMessage("Deleting blog went wrong", "red")
      }
      
      console.log("you deleted", blog.title)
    }
  }

  const handleRemoveBtnShowing = (blog, user) => {
    if (blog.user.id === user.id) {
      return (
        <button onClick={() => handleDetele(blog)}>remove</button>
      )
    }
  }


  if (blog.user.id === user.id) {
      if (blog.title === clickedBlog) {
        return(
          <div className="blog choosed" onClick={() => handleBlogClose()}>
            <p>{blog.title} - {blog.author}</p>
            <p>url: {blog.url}</p>
            <p>likes: {blog.likes} <button onClick={() => handleLike(blog)}>send like</button></p> 
            <p>{blog.user.name}</p>
            {handleRemoveBtnShowing(blog, user)}
            
          </div>
        )
      } else {
        return (
          <div>
            <button className="blog" onClick={() => handleBlogOpen(blog.title)}> {blog.title} - {blog.author} </button>
          </div>
        )
      }
  }
} 


export default Blog
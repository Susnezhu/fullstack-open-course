import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import blogService from "../services/blogs"
import {useBlogs, useField} from "../hooks/customQuery"
import styles from "../styles/default"

const SingleBlog = () => {
  const { reset: resetComment, ...comment } = useField('comment')

  const { id } = useParams();

  const { blogs, handleLike, getAllBlogs } = useBlogs() //kaikki blogit

  const blog = blogs.find(b => b.id === id)

  const likeSingleBlog = () => {
    handleLike(blog)
    getAllBlogs()
  }

  const handleComment = async () => {
    if (comment.length > 2) {
      blogService.postComment(id, comment.value)
    }

    resetComment()
  }

  if (!blog) return <p>not found</p>;

  return (
    <div>
      <h2>{blog.title}</h2>

      <p style={styles.lightText}>by {blog.author}</p>
      <a href={blog.url}>{blog.url}</a>
      <p style={styles.lightText}>Added by {blog.user.name}</p>


      <div style={styles.itemsLine}>
      <p>{blog.likes} likes</p>
      <button style={styles.lightBtn} onClick={() => likeSingleBlog()}>LIKE</button>
      </div>

      <h3>Comments:</h3>
      <form>
        <label>
          <input style={styles.input} {...comment} />
        </label>
        <button style={styles.heavyBtn} onClick={() => handleComment()}>Add comment</button>
      </form>
      

      {blog.comments.length === 0
        ? <p>no comments</p>
        : blog.comments.map(comment => (
            <li>- {comment}</li>
          ))
      }
    </div>
  )
}

export default SingleBlog
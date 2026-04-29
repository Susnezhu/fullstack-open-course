import { useState } from "react";
import "../styles/blog.css";
import blogService from "../services/blogs";
import { useClickedBlog } from "../hooks/customQuery"
import { Link } from "react-router-dom";
import styles from "../styles/default"

const Blog = ({ blog, user, handleLike, handleDetele }) => {
  const { clickedBlog, blogOpen, blogClose } = useClickedBlog()

  const handleRemoveBtnShowing = (blog, user) => {
    if (blog.user.id === user.id) {
      return (
        <button style={styles.lightBtn} onClick={() => handleDetele(blog)} id="remove-blog-btn">
          remove
        </button>
      );
    }
  };

  //if (blog.user.id === user.id) { (Jos on tarvetta näyttää pelkästään kirjautuneen käyttäjän blogit)
  if (blog.title === clickedBlog) {
    return (
      <div className="blog choosed" onClick={() => blogClose()}>
        <p>
          {blog.title} - {blog.author}
        </p>
        <p>url: {blog.url}</p>
        <p>
          likes: {blog.likes}{" "}
          <button style={styles.lightBtn} onClick={() => handleLike(blog)} id="send-like-btn">
            send like
          </button>
        </p>
        <p>{blog.user.name}</p>
        <Link to={"/blogs/"+ blog.id} style={styles.lightBtn}>leave a comment</Link>
        {handleRemoveBtnShowing(blog, user)}
      </div>
    );
  } else {
    return (
      <div className="blog" onClick={() => blogOpen(blog.title)}>
        {" "}
        {blog.title} - {blog.author}
      </div>
    );
  }
  //}
};

export default Blog;

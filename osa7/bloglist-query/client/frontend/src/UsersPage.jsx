import { useState, useEffect } from "react"
import blogService from "./services/blogs"
import { Link } from "react-router-dom"

const Users = () => {

  const [users, setUsers] = useState([])

  const [singleUser, setSingleUser] = useState('')

  const getAllUsers = () => {
    blogService.getAllUsers().then((users) =>
      setUsers(users),
    );
  }
  
  useEffect(() => {
    getAllUsers()
  }, []);

  const styles = {
    display: "grid",
    gridTemplateColumns: "2fr 2fr 2fr",
    borderBottom: "2px solid #ffcd71",
    alignItems: "center"
  }

  if ( singleUser ) {
    return (
      <div>
        <h2>{singleUser.name}</h2>

        <h3>Added blogs</h3>

        {singleUser.blogs.length === 0
          ? <p>nothing found</p>
          : singleUser.blogs.map(blog => (
              <li key={blog.id}>- {blog.title}</li>
            ))
        }

        <br />

        <Link onClick={() => setSingleUser('')}>Back to users</Link>
      </div>
    )
  }

  return (
    <div>
      <h2>Users</h2>

      <div style={styles}>
        <strong>Name</strong>
        <strong>Username</strong>
        <strong>Blogs created</strong>
      </div>

      {users.map((user) => (
        <div style={styles}>
          <Link onClick={() => setSingleUser(user)} style={{color: "black"}}>{user.name}</Link>
          <p>{user.username}</p>
          <p>{user.blogs.length}</p>
        </div>
      ))}
    </div>
  )
}

export default Users
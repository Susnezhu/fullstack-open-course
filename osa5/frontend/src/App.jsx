import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

 
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user")
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
      }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username)
    setUsername('')
    setPassword('')

    blogService.getLoggedUser(username, password)
      .then(data => {
        setUser(data)
        window.localStorage.setItem('user', JSON.stringify(data))
      })
      .catch(error => {
        console.log('loggin error:', error)
      })
  }

  const handleLogOut = () => {
    setUser(null) 
    window.localStorage.removeItem('user')
  }

  if (user === null) {
    return (
      <div>
        <h1>Log in to application</h1>

        <form onSubmit={handleLogin}>
          <label>Username: </label>
          <input type="text" value={username} onChange={({ target }) => setUsername(target.value)}></input>
          <br/>
          <label>Password: </label>
          <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}></input>
          <br/>
          <button>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <button onClick={handleLogOut}>log out</button>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
}

export default App
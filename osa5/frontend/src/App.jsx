import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { Message } from './messages'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [message, setMessage] = useState(null)


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

  const showMessage = (message, color) => {
    const messageObj = [message, color]

    setMessage(messageObj)

    setTimeout(() => {
      setMessage(null)
    }, 7000)
  }


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
        showMessage("Wrong password or username", "red")
      })
  }

  const handleLogOut = () => {
    setUser(null) 
    window.localStorage.removeItem('user')
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    
    setTitle('')
    setAuthor('')
    setUrl('')

    try {
      const response = await blogService.createNewBlog(newBlog)

      if (response) {
        showMessage(`A new blog "${title}" by "${author}" added`, "green")
      }

      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    } catch (error) {
      console.log("adding new blog error: ", error)
      showMessage("Error adding new blog", "red")
    }
    
  }

  if (user === null) {
    return (
      <div>
        <h1>Log in to application</h1>

        <Message message={message}/>

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
      <p>{user.name} logged in</p>

      <Message message={message}/>

      <h2>Create new</h2>
      <form onSubmit={handleNewBlog}>
        <label>Title: </label>
        <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} ></input>
        <br/>
        <label>Author: </label>
        <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)}></input>
        <br/>
        <label>Url: </label>
        <input type="text" value={url} onChange={({ target }) => setUrl(target.value)}></input>
        <br/>
        <button>create</button>
      </form>

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
}

export default App
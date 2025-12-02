import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import CreateNewBlog from './components/NewBlog'

import blogService from './services/blogs'
import { Message } from './messages'


const App = () => {
  const [blogs, setBlogs] = useState([]) //kaikki blogit

  const [user, setUser] = useState(null) //kirjautunut käyttäjä (tallentuu myös localStoragen)

  const [message, setMessage] = useState(null) // viesti

  const formsRef = useRef()

  const getAllBlogFunc = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(function(a, b){return a.likes - b.likes}).reverse() )
    )
  }

  // hakee kaikki blogit
  useEffect(() => {
    getAllBlogFunc()
  }, [])

  // tarkistaa onko käyttäjä kirjautunut
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const showMessage = (message, color) => {
    const messageObj = [message, color]

    setMessage(messageObj)

    setTimeout(() => {
      setMessage(null) // viesti piilottuu
    }, 5000)
  }

  // poistaa kirjautunut käyttäjä
  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('user')
  }


  if (user === null) { //jos käyttäjä ei ole kirjautunut
    return (
      <div>
        <h1>Bloglist</h1>

        <Message messageArray={message}/> {/* käyttää message useState: ['viesti virheestä', 'red'] */}

        <Togglable buttonLabel="log in" formsRef={formsRef}>
          <LoginForm
            setUser={setUser}
            user={user}
            showMessage={showMessage}
            formsRef={formsRef}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <button onClick={handleLogOut} id="log-out-btn">log out</button>

      <p>{user.name} logged in</p>

      <Message messageArray={message}/>

      <Togglable buttonLabel="create new blog" formsRef={formsRef}>
        <CreateNewBlog
          showMessage={showMessage}
          getAllBlogFunc={getAllBlogFunc}
          formsRef={formsRef}
        />
      </Togglable>

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          showMessage={showMessage}
          getAllBlogFunc={getAllBlogFunc}/>
      )}
    </div>
  )
}

export default App
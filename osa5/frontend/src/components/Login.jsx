import { useState } from 'react'
import blogService from '../services/blogs'

const LoginForm = ({ setUser, showMessage, formsRef }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    formsRef.current.toggleVisibility() // piilottaa kentän kirjautumiseen

    console.log('logging in with', username)

    blogService.getLoggedUser(username, password)
      .then(data => {
        setUser(data)
        window.localStorage.setItem('user', JSON.stringify(data))
      })
      .catch(error => {
        console.log('loggin error:', error)
        showMessage('Wrong password or username', 'red')
      })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(({ target }) => setUsername(target.value))}></input>
        </label>
        <br/>
        <label>
          Password:
          <input type="password" value={password} onChange={(({ target }) => setPassword(target.value))}></input>
        </label>
        <br/>
        <button onClick={handleLogin} id="login_submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
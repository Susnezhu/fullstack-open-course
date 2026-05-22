import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { LOGIN } from '../../queries'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const [ login ] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value
      props.setToken(token)
      localStorage.setItem('phonebook-user-token', token)
    }
  })

  if (!props.show) {
    return null
  }
  
  const submit = async (event) => {
    event.preventDefault()

    try {
      await login({ variables: { username, password } })
      props.setPage('authors')
      props.client.resetStore()
    } catch (error) {
      console.log(error)
      props.handleFail(error.message)
    }

    setUsername('')
    setPassword('')
  }


  return (
    <div>
      <h2>login</h2>

      <form onSubmit={submit}>
        <div>
          <label htmlFor="username">username</label>
          <input
            value={username}
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            value={password}
            id="password"
            type='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button>login</button>
      </form>
    </div>
  )
}

export default Login

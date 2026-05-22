import { useState } from 'react'
import { useApolloClient } from '@apollo/client/react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'

const App = () => {
  const client = useApolloClient()

  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('phonebook-user-token'))

  const [failMessage, setFailMessage] = useState('')

  const handleLogOut = async () => {
    setToken(null)
    localStorage.clear()
    await client.resetStore()
    setPage('authors')
  }

  const handleFail = (message) => {
    setFailMessage(message)

    setTimeout(() =>{
      setFailMessage('')
    },10000)
  }

  const visible = {
    display: "block"
  }

  const notVisible = {
    display: "none"
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        
        <div style={token ? visible : notVisible}>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommend')}>recommend</button>
          <button onClick={() => handleLogOut()}>logout</button>
        </div>

        <button style={!token ? visible : notVisible} onClick={() => setPage('login')}>login</button>

      </div>

      <Authors show={page === 'authors'} token={token} handleFail={handleFail}/>

      <Books show={page === 'books'} client={client}/>

      <NewBook show={page === 'add'} token={token} handleFail={handleFail} client={client} setPage={setPage}/>

      <Login show={page === 'login'} setToken={setToken} setPage={setPage} handleFail={handleFail} client={client}/>

      <Recommend show={page === 'recommend'} token={token}/>

      <div>
        <p style={{color: "red"}}>{failMessage}</p>
      </div>
    </div>
  )
}

export default App

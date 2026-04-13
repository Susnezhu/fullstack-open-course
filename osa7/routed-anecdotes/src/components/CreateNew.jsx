import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/index'

import { useAnecdotes } from '../hooks/index'

const CreateNew = () => {
  const { addAnecdote } = useAnecdotes()

  const { reset: resetContent, ...content } = useField('content')
  const { reset: resetAuthor, ...author } = useField('author')
  const { reset: resetInfo, ...info } = useField('info')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({ 
      content: content.value, 
      author: author.value, 
      info: info.value,
      votes: 0 })
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()

    console.log('reset')
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
        <button onClick={handleReset}>reset</button>
    </div>
  )
}

export default CreateNew

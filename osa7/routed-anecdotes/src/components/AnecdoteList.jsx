import { Link } from 'react-router-dom'
import { useAnecdotes } from '../hooks/index'

const AnecdoteList = () => {

  const { anecdotes, deleteAnecdote } = useAnecdotes()

  const handleDelete = (id) => {
    console.log('delete this:', id)

    deleteAnecdote(id)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => 
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link> 
            <button onClick={() => handleDelete(anecdote.id)}>delete</button>
          </li>)}
      </ul>
    </div>
  )
}

export default AnecdoteList

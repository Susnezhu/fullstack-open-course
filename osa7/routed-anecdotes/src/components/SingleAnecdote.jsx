import { useParams } from 'react-router-dom'
import { useAnecdotes } from '../hooks'

const SingleAnecdote = () => {
  const { id } = useParams()
  const { anecdotes } = useAnecdotes()

  const anecdote = anecdotes.find(a => a.id === id)

  if (!anecdote) return null

  return (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>For more info see: <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
  )
}

export default SingleAnecdote

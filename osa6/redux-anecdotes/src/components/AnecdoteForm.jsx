import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const anecdotes = useSelector(state => state.anecdote)
  const filter = useSelector(state => state.filter)

  const filtered = filter
  ? anecdotes.filter(a =>
      a.content.toLowerCase().includes(filter)
    )
  : anecdotes

  const dispatch = useDispatch();

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(showNotification(`You voted: "${anecdote.content}"`, 5))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {filtered
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote) }>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteForm
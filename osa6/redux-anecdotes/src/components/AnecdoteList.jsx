import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer';
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch();

  const newAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(showNotification(`You added new anecdote: "${content}"`, 5))
    dispatch(addAnecdote(content))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteList
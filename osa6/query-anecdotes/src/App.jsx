import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './request'

import { useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.payload
    case 'HIDE':
      return ''
    default:
      return state
  }
}


const App = () => {
  const [notification, dispatch] = useReducer(notificationReducer, '')

  const showNotification = (message) => {
    dispatch({ type: 'SHOW', payload: message })

    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, 5000)
  }
  
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
  mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdote'] })
    }
  })
  
  const handleVote = (anecdote) => {

    const newVote = anecdote.votes += 1

    updateAnecdoteMutation.mutate({ ...anecdote, votes: newVote })
    console.log(updateAnecdoteMutation)
    showNotification('you voted: ' + anecdote.content)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 2
  })
 
  console.log(JSON.parse(JSON.stringify(result)))
 
  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>Anecdote service is not available due to problems in server</div>
  }
 
  const anecdotes = result.data


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification message={notification}/>
      <AnecdoteForm showNotification={showNotification}/>

      {anecdotes.sort((a, b) => b.votes - a.votes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}

      <button onClick={() => showNotification('test')}>testing notification</button>
    </div>
  )
}

export default App

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { addAnecdote } from '../request'

const AnecdoteForm = ({showNotification}) => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({ content })
    console.log(newAnecdoteMutation)

    if (content.length >= 5) {
      showNotification('you created new anecdote: ' + content)
    }

    if (content.length < 5) {
      showNotification('Error: anecdote has to be more than 5 symbols long')
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

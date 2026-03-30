const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  const data = await response.json()
  return data
}

const createNew = async (content) => {

  const id = 100000 * Math.random().toFixed(0)
  const votes = 0

  console.log(JSON.stringify({ content, id, votes}))

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, id, votes}),
  })
  
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  
  return await response.json()
}

const updateVote = async (anecdote) => {
  console.log(anecdote)

  const response = await fetch(baseUrl + '/' + anecdote.id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote)
  })

  if (!response.ok) {
    throw new Error('Failed to update votes')
  }

  return
}

export default { getAll, createNew, updateVote }
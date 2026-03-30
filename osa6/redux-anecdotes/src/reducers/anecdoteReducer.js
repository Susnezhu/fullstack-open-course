import { createSlice } from '@reduxjs/toolkit'
import anecdoteServices from '../services/anecdotes'

function updateVotes(list, id) {
  return list.map(item => {
    if (item.id === id) {
      const newItem = { ...item, votes: item.votes + 1 }
      anecdoteServices.updateVote(newItem)
      return newItem
    } else {
      return item
    }
  })
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      return updateVotes(state, action.payload)
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})

// for getting all anecdotes
const { setAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

// for creating anecdote
const { createAnecdote } = anecdoteSlice.actions

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteServices.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const { vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
import { useState, useEffect } from "react"
import anecdoteService from '../services/anecdotes'

export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    name,
    value,
    onChange,
    reset
  }
}

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then((data) => {setAnecdotes(data)})
  }, [])


  const addAnecdote = async (anecdote) => {
    await anecdoteService.createNew(anecdote)
    
    const data = await anecdoteService.getAll()
    setAnecdotes(data)
  }

  const deleteAnecdote = async (id) => {
    await anecdoteService.deleteById(id)

    const data = await anecdoteService.getAll()
    setAnecdotes(data)
  }

  return {
    anecdotes,
    addAnecdote,
    deleteAnecdote
  }
}


// maybe I will use notifications later

/* 
export const useNotification = () => {
  const [notification, setNotification] = useState('')

  const showNotification = (value) => {
    setNotification(value)

    setTimeout(function() {
      setNotification('')
    }, 5000)
  }

  return {
    notification,
    showNotification
  }
}
*/ 

export default {useField, useAnecdotes}
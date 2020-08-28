import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  notificationChange,
} from '../reducers/notificationReducer'
import Filter from '../components/Filter'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(notificationChange(`A new anecdote "${content}" has been added. `, 10))

  }

  return (
    <div>
      <Filter />
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

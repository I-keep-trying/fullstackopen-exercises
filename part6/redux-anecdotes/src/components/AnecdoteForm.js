import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  notificationChange,
  dismissNotificationChange,
} from '../reducers/notificationReducer'
import Filter from '../components/Filter'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(notificationChange(`A new anecdote "${content}" has been added. `))
    setTimeout(() => {
      dispatch(dismissNotificationChange())
    }, 2000)
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

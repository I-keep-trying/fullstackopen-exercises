import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import Filter from '../components/Filter'

const AnecdoteForm = props => {
  const addAnecdote = async e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    props.createAnecdote(content)
    props.notificationChange(`A new anecdote "${content}" has been added. `, 3000)
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

export default connect(null, { createAnecdote, notificationChange })(
  AnecdoteForm
)

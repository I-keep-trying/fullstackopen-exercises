import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      "{anecdote.content}" has {anecdote.votes} votes
      <button onClick={handleClick}>vote</button>
    </li>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
    state.sort((a, b) => {
      return b.votes - a.votes
    })
  )
  const dispatch = useDispatch()

  return (
    <div style={{ marginBottom: '1em' }}>
      <ul>
        {anecdotes.map(anecdote => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => dispatch(addVote(anecdote))}
          />
        ))}
      </ul>
    </div>
  )
}

export default AnecdoteList

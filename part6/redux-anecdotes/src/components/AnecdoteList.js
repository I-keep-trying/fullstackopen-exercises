import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import {
  notificationChange,
  dismissNotificationChange,
} from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      "{anecdote.content}" has {anecdote.votes} votes
      <button onClick={handleClick}>vote</button>
    </li>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const filteredAnecdotes = useSelector(state => {
    return state.anecdotes
      .filter(a => a.content.toLowerCase().includes(filter))
      .sort((a, b) => {
        return b.votes - a.votes
      })
  })

  return (
    <div style={{ marginBottom: '1em' }}>
      <ul>
        {filteredAnecdotes.map(anecdote => {
          return (
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleClick={() => {
                dispatch(addVote(anecdote))
                dispatch(
                  notificationChange(`You voted for "${anecdote.content} "`)
                )
                setTimeout(() => {
                  dispatch(dismissNotificationChange())
                }, 2000)
              }}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default AnecdoteList

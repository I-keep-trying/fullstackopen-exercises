import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Message from './Message'

const Anecdotes = ({ anecdotes, message, setLocation }) => {
  let history = useHistory()

  useEffect(() => {
    setLocation(history.location.pathname)
  }, [setLocation, history])
  return (
    <div>
      <Message message={message} />

      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Anecdotes

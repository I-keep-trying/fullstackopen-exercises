import React from 'react'
import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find((n) => n.id === Number(id))
  return (
    <div>
      <h2>
        <a href={anecdote.info}>
          {'"'}
          {anecdote.content}
          {'"'}{' '}
        </a>{' '}
        has {anecdote.votes} votes.
      </h2>
    </div>
  )
}

export default Anecdote

import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      "{anecdote.content}" has {anecdote.votes} votes
      <button onClick={handleClick}>vote</button>
    </li>
  )
}

const AnecdoteList = props => {
  const anecdotes = useSelector(state =>
    state.anecdotes
      .filter(a => a.content.toLowerCase().includes(state.filter))
      .sort((a, b) => {
        return b.votes - a.votes
      })
  )
  return (
    <div style={{ marginBottom: '1em' }}>
      <ul>
        {anecdotes.map(anecdote => {
          return (
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleClick={() => {
                props.addVote(anecdote)
                props.notificationChange(
                  `You voted for "${anecdote.content} "`,
                  4000
                )
              }}
            />
          )
        })}
      </ul>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes
      .filter(a => a.content.toLowerCase().includes(state.filter))
      .sort((a, b) => {
        return b.votes - a.votes
      }),
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  addVote,
  notificationChange,
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdotes

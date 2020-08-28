import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE': {
      return [...state, action.data]
    }
    case 'INIT_ANECDOTES':
      return action.data
    case 'ADD_VOTE': {
      const anecdote = action.data
      const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
      return state.map(a => (a.id !== anecdote.id ? a : votedAnecdote))
    }
    default:
      return state
  }
}

export const addVote = data => {
  return async dispatch => {
    const changeAnecdote = await anecdoteService.update(data)
    dispatch({
      type: 'ADD_VOTE',
      data: changeAnecdote,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer

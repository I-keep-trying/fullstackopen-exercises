import React, { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

import anecdoteService from './services/anecdotes'
import { useDispatch } from 'react-redux'

import Footer from './components/Footer'

import './App.css'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll()
      .then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <div className="App">
      <div className="App-header">
        <i style={{ color: '#60d6f6' }} className="fas fa-quote-left"></i>
        <h2>Anecdotes</h2>
      </div>
      <div className="AppBody">
        <Notification />
        <AnecdoteList />
        <hr />
        <AnecdoteForm />
      </div>
      <Footer />
    </div>
  )
}

export default App

import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Footer from './components/Footer'

import './App.css'

const App = () => {
  return (
    <div className="App">
      <div className="App-header">
        <i style={{ color: '#60d6f6' }} className="fas fa-quote-left"></i>
        <h2>Anecdotes</h2>
      </div>
      <div className="AppBody">
        <AnecdoteList />
        <hr />
        <AnecdoteForm />
      </div>
      <Footer />
    </div>
  )
}

export default App

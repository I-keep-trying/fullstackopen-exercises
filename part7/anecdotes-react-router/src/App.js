import React, { useState, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import Menu from './components/Menu'
import Anecdotes from './components/Anecdotes'
import Anecdote from './components/Anecdote'
import CreateNew from './components/CreateNew'
import About from './components/About'
import Home from './components/Home'
import Footer from './components/Footer'
import logo from './quote.svg'
import './App.css'
import './index.css'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])
  const [message, setMessage] = useState(null)
  const [location, setLocation] = useState('/')

  const [formData, setFormData] = useState({})

  let history = useHistory()

  useEffect(() => {
    history.push('/')
  }, [history])

  const getTitle = () => {
    if (location === '/') {
      return <h1>Anecdote App</h1>
    } else if (location === '/anecdotes') {
      return <h1>Anecdotes List</h1>
    } else if (location === '/create') {
      return <h1>Add New Anecdote</h1>
    } else if (location === '/about') {
      return <h1>About Anecdotes</h1>
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <Menu />

        <img src={logo} className="App-logo" alt="logo" />
        {getTitle()}
      </div>
      <div className="AppBody">
        <Switch>
          <Route path="/anecdotes/:id">
            <Anecdote anecdotes={anecdotes} />
          </Route>

          <Route path="/anecdotes">
            <Anecdotes
              anecdotes={anecdotes}
              message={message}
              setLocation={setLocation}
            />
          </Route>

          <Route path="/create">
            <CreateNew
              anecdotes={anecdotes}
              setAnecdotes={setAnecdotes}
              setMessage={setMessage}
              message={message}
              setLocation={setLocation}
            />
          </Route>

          <Route path="/about">
            <About setLocation={setLocation} />
          </Route>

          <Route path="/">
            <Home setLocation={setLocation} />
          </Route>
        </Switch>
      </div>
      {/*       <Footer />
       */}{' '}
    </div>
  )
}

export default App

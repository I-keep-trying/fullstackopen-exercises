import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom'
import Footer from './components/Footer'
import './App.css'


const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0,
    })
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}


const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link style={padding} to="/">
        anecdotes
      </Link>{' '}
      |{' '}
      <Link style={padding} to="/create">
        create new
      </Link>{' '}
      |{' '}
      <Link style={padding} to="/about">
        about
      </Link>
    </div>
  )
}

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      {anecdote.content}
      <br />
      {anecdote.votes}
    </div>
  )
}
const AnecdoteList = ({ anecdotes }) => {
  console.log('anecdotes List', anecdotes)
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id} `}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>
    <br />
    <div>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </div>
  </div>
)

const Home = () => {
  return (
    <div>
      <h2>Welcome to Anecdotes App</h2>
    </div>
  )
}

function App() {
  const [notification, setNotification] = useState('')
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ])
  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  const padding = {
    padding: 5
  }
  
  return (
    <Router>
    <div>
      <Link style={padding} to="/">home</Link>
      <Link style={padding} to="/anecdotes">anecdotes</Link>
      <Link style={padding} to="/about">about</Link>
    </div>

    <Switch>
      <Route path="/anecdotes">
        <Anecdotes />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>

    <div>
      <i>Anecdote app, Department of Computer Science 2020</i>
    </div>
  </Router>
  )
}

export default App

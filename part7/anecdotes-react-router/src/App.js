import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
} from 'react-router-dom'
import Footer from './components/Footer'
import logo from './quote.svg'
import './App.css'
import './index.css'

const Home = () => (
  <div>
    <h2>Anecdotes App</h2>
    <div>
      Hydrogen atoms billions upon billions Hypatia tingling of the spine
      extraordinary claims require extraordinary evidence extraplanetary. Rig
      Veda vanquish the impossible corpus callosum muse about are creatures of
      the cosmos invent the universe. Citizens of distant epochs of brilliant
      syntheses with pretty stories for which there's little good evidence
      encyclopaedia galactica two ghostly white figures in coveralls and helmets
      are softly dancing the only home we've ever known and billions upon
      billions upon billions upon billions upon billions upon billions upon
      billions.
    </div>
  </div>
)

const About = () => (
  <div>
    <div>According to Wikipedia:</div>
    <br />
    <div>
      <i>
        An anecdote is a brief, revealing account of an individual person or an
        incident. Occasionally humorous, anecdotes differ from jokes because
        their primary purpose is not simply to provoke laughter but to reveal a
        truth more general than the brief tale itself, such as to characterize a
        person by delineating a specific quirk or trait, to communicate an
        abstract idea about a person, place, or thing through the concrete
        details of a short narrative. An anecdote is "a story with a point."
      </i>
    </div>
    <br />

    <div>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </div>
  </div>
)

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find((n) => n.id === Number(id))
  console.log('anecdote', anecdote)
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

const Message = ({ message }) => {
  if (message === null) {
    return null
  } else if (message.type === 'error') {
    return <div className="error">{message.text} </div>
  } else if (message.type === 'info') {
    return <div className="info">{message.text} </div>
  }
}

const Anecdotes = ({ anecdotes, message }) => {
  return (
    <div>
      <Message message={message} />
      <h2>Anecdotes</h2>

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

const CreateNew = ({ anecdotes, setAnecdotes, setMessage }) => {
  let history = useHistory()
  const initialInput = {
    content: '',
    author: '',
    info: '',
  }
  const [userInput, setUserInput] = useState(initialInput)

  const handleChange = (evt) => {
    const { name, value } = evt.target

    setUserInput({ ...userInput, [name]: value })
  }

  const id = Date.now()
  const anecdote = {
    content: userInput.content,
    author: userInput.author,
    info: userInput.info,
    votes: 0,
    id: id,
  }

  const addNew = (e) => {
    e.preventDefault()
    console.log('add anecdote', anecdote)
    setAnecdotes(anecdotes.concat(anecdote))
    console.log('history', history)
    history.push('/anecdotes')
    setMessage({
      text: `A new anecdote "${anecdote.content}" was created!`,
      type: 'info',
    })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  let userInputKeys = Object.keys(userInput)
  return (
    <div>
      <h2>Add Anecdote</h2>
      <form onSubmit={addNew}>
        {userInputKeys.map((string, i) => {
          return (
            <div key={i}>
              <input
                placeholder={string.charAt(0).toUpperCase() + string.slice(1)}
                name={string}
                value={userInput.string}
                onChange={handleChange}
              />
              <br />
            </div>
          )
        })}

        <button type="submit">save</button>
      </form>
    </div>
  )
}

const Menu = () => {
  const padding = {
    padding: 5,
  }

  return (
    <div>
      <Link style={padding} to="/">
        home
      </Link>
      <Link style={padding} to="/anecdotes">
        anecdotes
      </Link>
      <Link style={padding} to="/create">
        create new
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>
    </div>
  )
}

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

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Anecdote App</h1>
      </div>
      <div className="AppBody">
        <Router>
          <Menu />
          <Switch>
            <Route path="/anecdotes/:id">
              <Anecdote anecdotes={anecdotes} />
            </Route>
            <Route path="/anecdotes">
              <Anecdotes anecdotes={anecdotes} message={message} />
            </Route>
            <Route path="/create">
              <CreateNew
                anecdotes={anecdotes}
                setAnecdotes={setAnecdotes}
                setMessage={setMessage}
                message={message}
              />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  )
}

export default App

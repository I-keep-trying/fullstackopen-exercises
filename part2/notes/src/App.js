import React, { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import loginService from './services/login'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'

import { ToastContainer, toast } from 'react-toastify'

import logo from './note-icon.png'
import './App.css'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      toast(`Welcome, ${user.name}!`)
      setUsername('')
      setPassword('')
    } catch (exception) {
      toast.error('Wrong credentials')
    }
  }

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true)

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { id: note.id, important: !note.important }
    noteService
      .updatePatch(changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
        toast(`Note '${note.content}' was successfully updated`)
      })
      .catch(() => {
        toast.error(`Note '${note.content}' was already removed from server`)

        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    noteService.setToken('')
    setUser(null)
    toast('Successfully logged out')
  }

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
      toast('Note created')
    })
  }

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )
  return (
    <div className="App">
      <h1 className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Notes
      </h1>

      <div className="AppBody">
        <div>
          <ToastContainer />
          {user === null ? (
            loginForm()
          ) : (
            <div>
              <i>User</i> {user.name} <i> is logged in</i>
              <br />
              <button onClick={handleLogout}>logout</button>
              <hr />
              {noteForm()}
            </div>
          )}
          <hr />
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all'}
          </button>
        </div>
        <ul>
          <div>
            Key: <strong>important</strong> | not important
          </div>
          <br />
          <div>
            {notesToShow.map((note) => (
              <Note
                key={note.id}
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}
              />
            ))}
          </div>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default App

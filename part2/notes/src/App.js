import React from 'react'
import Note from './components/Note'
import './App.css'

const App = ({ notes }) => {
  return (
    <div className="App">
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  )
}

export default App

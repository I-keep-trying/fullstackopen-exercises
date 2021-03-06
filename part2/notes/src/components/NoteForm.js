import React, { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (e) => {
    e.preventDefault()
    createNote({
      content: newNote,
      important: false,
    })

    setNewNote('')
  }

  return (
    <div className="formDiv">
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
          placeholder="note input placeholder"
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}
export default NoteForm

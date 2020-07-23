import React from 'react'

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li>
      {note.important ? <strong>{note.content}</strong> : note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note

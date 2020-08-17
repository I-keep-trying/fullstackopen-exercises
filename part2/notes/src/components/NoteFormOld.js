import React, {useState} from 'react' 

const NoteForm = ({createNote}) => {
    const [newNote, setNewNote] = useState('')
  
    const handleNoteChange = (event) => {
      setNewNote(event.target.value)
    }
  
    const addNote = (e) => {
      e.preventDefault()
      createNote({
        content: newNote,
        important: Math.random() > 0.5,
      })
  
      setNewNote('')
    }
    return (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>  
  )}

  export default NoteForm
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notes from './components/Notes'
import NewNote from './components/NewNote'
import noteService from './services/notes'
import { initializeNotes } from './reducers/noteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    noteService.getAll().then((notes) => dispatch(initializeNotes(notes)))
  }, [dispatch])

  return (
    <div>
      <NewNote />
      <Notes />
    </div>
  )
}

export default App

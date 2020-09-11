import React, { useEffect } from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import Footer from './components/Footer'
import { initializeNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'
import logo from './note-icon.png'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])
  return (
    <div className="App">
      <h1 className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Notes Redux
      </h1>
      <div className="AppBody">
        <NewNote />
        <VisibilityFilter />
        <Notes />
      </div>

      <Footer />
    </div>
  )
}

export default App

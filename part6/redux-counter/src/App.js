import React from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import Footer from './components/Footer'
import logo from './note-icon.png'
import './App.css'

const App = () => {
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

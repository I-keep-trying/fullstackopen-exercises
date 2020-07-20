import React, { useState } from 'react'
import './App.css'

function App() {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const addName = (e) => {
    e.preventDefault()
    const nameObject = {
      name: newName,
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameInput = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">Phonebook</header>
      <form onSubmit={addName}>
        <div>
          name:{' '}
          <input
            placeholder="add name..."
            value={newName}
            onChange={handleNameInput}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      {persons.map((person) => (
        <div key={person.name}>{person.name}</div>
      ))}
    </div>
  )
}

export default App

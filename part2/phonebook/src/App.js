import React, { useState } from 'react'
import './App.css'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '555-1212' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const isDuplicate = persons.some((person) => person.name === newName)
    isDuplicate
      ? alert(`${newName} is already in the phonebook `)
      : setPersons([...persons, nameObject])

    setNewName('')
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">Phonebook</header>
      <form onSubmit={addPerson}>
        <div>
          name:{' '}
          <input
            placeholder="add name..."
            value={newName}
            onChange={handleNameInput}
          />
          <br />
          number:{' '}
          <input
            placeholder="add number..."
            value={newNumber}
            onChange={handleNumberInput}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}{' '}
        </div>
      ))}
    </div>
  )
}

export default App

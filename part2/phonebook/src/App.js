import React, { useState } from 'react'
import './App.css'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const isDuplicate = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )
    isDuplicate
      ? alert(`${newName} is already in the phonebook `)
      : setPersons([...persons, nameObject])

    setNewName('')
    setNewNumber('')
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchInput = (event) => {
    event.preventDefault()

    setSearchTerm(event.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Phonebook</h1>
      </header>
      filter shown with{' '}
      <input
        value={searchTerm}
        onChange={handleSearchInput}
        placeholder="search..."
      />
      <form onSubmit={addPerson}>
        <h3>Add a new</h3>
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
      {persons
        .filter((person) => {
          if (!searchTerm) return person
          if (person.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return person
          }
          return false
        })
        .map((person) => (
          <div key={person.name}>
            {person.name} {person.number}{' '}
          </div>
        ))}
    </div>
  )
}

export default App

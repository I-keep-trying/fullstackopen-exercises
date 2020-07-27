import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './services/persons'
import './App.css'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons))
  }, [])

  const addPerson = (e, id) => {
    e.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const isDuplicate = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )
    const personToUpdate = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )
    const updatedPerson = { ...personToUpdate, number: newNumber }
    if (isDuplicate) {
      if (
        window.confirm(
          `${newName} is already in the phonebook, replace number? `
        )
      ) {
        personService
          .update(personToUpdate.id, updatedPerson)
          .then((returnedPerson) => {
            persons.find((person) => {
              if (person.id === returnedPerson.id) {
                const p = { ...person, number: returnedPerson.number }
                setPersons(
                  persons.map((person) => (person.id !== p.id ? person : p))
                )
                setNewName('')
                setNewNumber('')
                return
              }

              return
            })
          })

        return
      }
      setNewName('')
      setNewNumber('')
      return
    }
    personService.create(nameObject).then((returnedPerson) => {
      setPersons([...persons, returnedPerson])
    })
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    personService.deleteRecord(id)
    const personsList = persons.filter((person) => person.id !== id)
    setPersons(personsList)
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
      <Filter searchTerm={searchTerm} handleSearchInput={handleSearchInput} />
      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        searchTerm={searchTerm}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App

import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import logo from './phonebook.png'
import './App.css'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons))
  }, [])

  const addPerson = (e, id) => {
    e.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    if (newName.length === 0 || newNumber.length === 0) {
      setMessage({
        text: `Please enter both a name and a number.`,
        type: 'error',
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return null
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
            console.log('returnedPerson', returnedPerson)
            persons.find((person) => {
              if (person.id === returnedPerson.id) {
                const p = { ...person, number: returnedPerson.number }
                setPersons(
                  persons.map((person) => (person.id !== p.id ? person : p))
                )
                setNewName('')
                setNewNumber('')
                setMessage({
                  text: `${newName} has been updated `,
                  type: 'message',
                })
                setTimeout(() => {
                  setMessage(null)
                }, 5000)
                return null
              }

              return null
            })
          })
          .catch((error) => {
            console.log('personToUpdate.name', personToUpdate.name)
            console.log('error', error)
            setMessage({
              text: `${personToUpdate.name} has already been removed from server `,
              type: 'error',
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })

        return
      }
      setNewName('')
      setNewNumber('')
      return
    }
    personService.create(nameObject).then((returnedPerson) => {
      const returnedError = returnedPerson.errors
      if (returnedError) {
        if (returnedError.name && returnedError.number) {
          setMessage({
            text: `${returnedError.name.properties.message}, and ${returnedError.number.properties.message} `,
            type: 'error',
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          return
        } else if (returnedError.name) {
          setMessage({
            text: `${returnedError.name.properties.message} `,
            type: 'error',
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          return
        } else if (returnedError.number) {
          setMessage({
            text: `${returnedError.number.properties.message} `,
            type: 'error',
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          return
        }
        return
      }
      setPersons([...persons, returnedPerson])
      setNewName('')
      setNewNumber('')
      setMessage({
        text: `${returnedPerson.name} has been added. `,
        type: 'message',
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
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
        <h1>
          {' '}
          <img src={logo} className="App-logo" alt="phonebook" />
          Phonebook
        </h1>
      </header>
      <div className="AppBody">
        <Notification message={message} />
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
          setMessage={setMessage}
        />
      </div>
    </div>
  )
}

export default App

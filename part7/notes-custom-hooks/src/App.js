import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Footer from './Footer'
import './App.css'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = () => {
    setValue('')
  }
  return {
    type,
    value,
    onChange,
    onReset,
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const result = axios.get(baseUrl)
     result.then((response) => setResources(response.data))
  }, [baseUrl])

  const create = (resource) => {
    const response = axios.post(baseUrl, resource)
     response.then((response) => {
      setResources([...resources, response.data])
    })
  }

  const service = {
    create,
  }

  return [resources, service]
}

function App() {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.onReset()
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
    name.onReset()
    number.onReset()
  }

  return (
    <div className="App">
      <header className="App-header">Notes Hooks - Part 7</header>
      <div className="AppBody">
        <form onSubmit={handleNoteSubmit}>
          <input {...content} />
          <button>create</button>
        </form>
        {notes.map((n) => (
          <p key={n.id}>{n.content}</p>
        ))}

        <h2>persons</h2>
        <form onSubmit={handlePersonSubmit}>
          name <input {...name} /> <br />
          number <input {...number} />
          <button>create</button>
        </form>
        {persons.map((n) => (
          <p key={n.id}>
            {n.name} {n.number}
          </p>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default App

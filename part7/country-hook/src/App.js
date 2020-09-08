import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Footer from './Footer'
import logo from './globe1.png'
import './App.css'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`).then((response) => {
      setCountry(response.data)
    })
  }, [country])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  )
}

function App() {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Countries Of The World - Part 7
      </header>
      <div className="AppBody">
        <form onSubmit={fetch}>
          <input {...nameInput} />
          <button>find</button>
        </form>

        <Country country={country} />
      </div>
      <Footer />
    </div>
  )
}

export default App

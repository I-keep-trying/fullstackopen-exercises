import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './Countries'
import Country from './Country'
import CountryDetail from './CountryDetail'
import Filter from './Filter'
import Button from './Button'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data)
    })
  }, [])

  const handleSearchInput = (event) => {
    event.preventDefault()

    setSearchTerm(event.target.value)
  }

  const filteredCountries = countries.filter((country) => {
    if (!searchTerm) return country
    if (country.name.toLowerCase().startsWith(searchTerm.toLowerCase())) {
      return country
    }
    return false
  })

  const countryDetail = () =>
    filteredCountries.map((country) => {
      return <CountryDetail key={country.alpha2Code} country={country} />
    })

  const handleClick = () => {
    return countryDetail()
  }
  const countries2 = () => {
    if (filteredCountries.length > 10 && !searchTerm) {
      return <div> Search for a country</div>
    } else if (filteredCountries.length === 0) {
      return <div>No matches, try again</div>
    } else if (filteredCountries.length > 10 && searchTerm) {
      alert('More than 10 results, please adjust criteria')
    } else if (filteredCountries.length === 1) {
      return countryDetail()
    } else {
      return filteredCountries.map((country) => {
        return (
          <div key={country.alpha2Code}>
            <Country
              country={country}
              countryDetail={countryDetail}
              filteredCountries={filteredCountries}
            />
          </div>
        )
      })
    }
  }

  return (
    <div className="App">
      <header className="App-header">Countries Of The World</header>
      <Filter searchTerm={searchTerm} handleSearchInput={handleSearchInput} />
      <br />

      <Countries countries2={countries2} />
    </div>
  )
}

export default App

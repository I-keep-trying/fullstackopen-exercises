import React, { useState } from 'react'
import CountryDetail from './CountryDetail'
import Button from './Button'

const Country = ({ country, countryDetail, filteredCountries }) => {
  //////////////////
  const [counter, setCounter] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)

  const setToZero = () => setCounter(0)
  ///////////////////////
  console.log('filteredCountries', filteredCountries)

  const showCountry = () =>
    filteredCountries.filter((countryf) => {
      if (countryf.name === country.name) {
        console.log('countryf', countryf)
        console.log('country', country)
        return countryDetail()
      } else {
        return <div>{country.name} </div>
      }
    })

  return (
    <div>
      {country.name}
      <button onClick={(countryf) => showCountry(countryf)}>show</button>
    </div>
  )
}

export default Country

import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Weather from './Weather'

const CountryDetail = ({ country }) => {
  console.log('country', country)
  const [weather, setWeather] = useState([])
  const uri = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_KEY}&query=${country.name}`
  const encoded = encodeURI(uri)

  useEffect(() => {
    axios.get(encoded).then((response) => {
      console.log('response.data', response)
      setWeather(response.data)
    })
  }, [encoded, setWeather])
  console.log('weather', weather.current)
  console.log('country', country)
  return (
    <div>
      <div>
        <h2>{country.name}</h2>
      </div>
      Capital: {country.capital}
      <br />
      Population: {country.population.toLocaleString()}
      <br />
      <h3>Languages: </h3>
      <div>
        {country.languages.map((language) => (
          <div key={language.name}>
            {' -'} {language.name}
          </div>
        ))}
      </div>
      <br />
      <img src={country.flag} alt="country flag" />
      <hr />
      <h3>Current Weather: </h3>
    </div>
  )
}

export default CountryDetail

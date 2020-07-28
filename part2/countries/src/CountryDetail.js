import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Weather.css'
import Weather from './Weather.js'

const CountryDetail = ({ country }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [weather, setWeather] = useState({})
  const [unit, setUnit] = useState('m')

  const coordinates = () => {
    return country.latlng[0] + ',' + country.latlng[1]
  }
 
  useEffect(() => {
    const uri = `http://api.weatherstack.com/current?access_key=${
      process.env.REACT_APP_WEATHER_KEY
    }&query=${coordinates()}&units=${unit} `
    axios.get(uri).then((response) => {
      setWeather(response.data)
      setIsLoading(false)
    }, 1000)
  }, [country, unit])

  const weatherContainer = () => {
    if (isLoading) {
      return 'Loading...'
    } else if (country.latlng.length === 0) {
      return <div>No weather data available </div>
    } else {
      return (
        <div>
          <Weather
            setUnit={setUnit}
            unit={unit}
            weather={weather}
            isLoading={isLoading}
          />
        </div>
      )
    }
  }

  return (
    <div>
      <h2>{country.name}</h2>
      <div>
        <h3>
          <a href="https://en.wikipedia.org/wiki/Exonym_and_endonym">
            Endonym:
          </a>{' '}
          {country.nativeName}
        </h3>
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
      <br />
      <div>{weatherContainer()}</div>
    </div>
  )
}

export default CountryDetail

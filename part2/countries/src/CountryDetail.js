import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Weather.css'

const CountryDetail = ({ country }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [weather, setWeather] = useState({})

  useEffect(() => {
    const uri = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_KEY}&query=${country.name}`
    axios.get(uri).then((response) => {
      console.log('response.data', response)
      setWeather(response.data)
      setIsLoading(false)
    }, 1000)
  }, [0])

  /*   const weatherClass = () => {
    if (isLoading === true) {
      return null
    } else if (isLoading === false) {
      return 'icon sun-shower'
    }
  } */

  const weatherContainer = () => {
    const weatherClass = 'icon sky-gradient rain-day'
    return isLoading ? (
      'Loading...'
    ) : (
      <div>
        {' '}
        <div className={`${weatherClass}`}>
          <h3 className="weather-title">Current Weather</h3>
          <div className="cloud-exp3">
            <div className="rain-day"></div>
          </div>
          <div className="sun-exp">
            <div className="rays-exp2"></div>
          </div>
          <div className="weather-data">
            <div>Temperature: {weather.current.temperature} C</div>
            <div>Wind: {weather.current.wind_speed} kph </div>
            <div>Wind direction: {weather.current.wind_dir} </div>
          </div>
        </div>
      </div>
    )
  }

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
      <div>{weatherContainer()}</div>
    </div>
  )
}

export default CountryDetail

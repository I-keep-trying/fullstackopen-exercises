import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Weather.css'

const CountryDetail = ({ country }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [weather, setWeather] = useState({})

  useEffect(() => {
    const uri = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_KEY}&query=${country.name}`
    const encoded = encodeURI(uri)
    axios.get(encoded).then((response) => {
      console.log('response.data', response)
      setWeather(response.data)
      setIsLoading(false)
    }, 1000)
  }, [0])

  console.log('country', country.name)

  console.log('isLoading', isLoading)
  const weatherClass = () => {
    if (isLoading === true) {
      return null
    } else if (isLoading === false) {
      console.log('weather', weather.current.weather_descriptions[0])
      return 'icon sun-shower'
    }
  }

  const weatherContainer = () => {
    const weatherClass = 'icon sky-gradient rain-day'
    return isLoading ? (
      'Loading...'
    ) : (
      <div>
        {console.log('weather', weather.current.weather_descriptions[0])}
        <h3>Current Local Weather</h3>{' '}
        <div className={`${weatherClass}`}>
          <div class="cloud-exp3">
            <div class="rain-day"></div>
          </div>
          <div class="sun-exp">
            <div class="rays-exp2"></div>
          </div>
        </div>
        <div>Temperature: {weather.current.temperature} C</div>
        <div>Wind: {weather.current.wind_speed} kph </div>
        <div>Wind direction: {weather.current.wind_dir} </div>
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

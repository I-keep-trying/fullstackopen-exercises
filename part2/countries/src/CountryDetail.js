import React, { useState, useEffect } from 'react'
import { sunShower, thunderStorm } from './WeatherClasses'
import axios from 'axios'
import './Weather.css'
import Weather from './Weather.js'

const CountryDetail = ({ country }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [weather, setWeather] = useState({})
  const [iconImage, setIconImage] = useState(sunShower)
  /* console.log('iconImage', iconImage.props.children[0].props)
console.log('sunShower', sunShower.props.children[1].props.children.props)
console.log('sunShower', sunShower.props.children[2].props) */
  /*   console.log('thunderstorm', iconImage.props.classname)

  console.log('thunderstorm', iconImage.props.children[0].props.classname)

  console.log('thunderstorm', iconImage.props.children[1].props.classname)
  console.log(
    'thunderstorm',
    iconImage.props.children[1].props.children[0].props.classname
  )
  console.log(
    'thunderstorm',
    iconImage.props.children[1].props.children[1].props.classname
  ) */

  /*   const props0 = iconImage.props.children[0].props.classname
  const props1 = iconImage.props.children[1].props.children.props.classname
  const props2 = iconImage.props.children[2].props.classname
  console.log('props 0 1 2 ', props0, ',', props1, ',', props2) */
  useEffect(() => {
    const uri = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_KEY}&query=${country.name}`
    axios.get(uri).then((response) => {
      setWeather(response.data)
      setIsLoading(false)
    }, 1000)
  }, [0])

  const localTime = () => {
    if (isLoading === true) {
      return 'Loading...'
    } else {
      const t = weather.location.localtime_epoch
      let dt = new Date(t * 1000)
      let hr = dt.getHours()
      let m = '0' + dt.getMinutes()
      let s = '0' + dt.getSeconds()
      return hr > 12
        ? hr - 12 + ':' + m.substr(-2) + ':' + s.substr(-2) + ' PM'
        : hr + ':' + m.substr(-2) + ':' + s.substr(-2) + ' AM'
    }
  }

  const weatherContainer = () => {
    const weatherClass = 'icon sun-shower'
    return isLoading ? (
      'Loading...'
    ) : (
      <div>
       

        {/*         <div className={`${weatherClass}`}>
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
        </div> */}
        <Weather weather={weather} isLoading={isLoading} />
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
      Local Time: {localTime()}
      <hr />
      <div>{weatherContainer()}</div>
    </div>
  )
}

export default CountryDetail

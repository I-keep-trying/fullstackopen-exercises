import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {

  return (
    <div>
      <h2></h2>
    </div>
    /*  <div>
      <div>
        <h2>{weather.location.name}</h2>
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
    </div> */
  )
}

export default Weather

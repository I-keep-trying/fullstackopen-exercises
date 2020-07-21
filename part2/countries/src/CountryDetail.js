import React from 'react'

const CountryDetail = ({ country }) => {
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
    </div>
  )
}

export default CountryDetail

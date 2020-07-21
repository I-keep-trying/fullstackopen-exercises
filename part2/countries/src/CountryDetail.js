import React from 'react'

const CountryDetail = ({ country }) => {
  return (
    <div>
      <div>
        <h2>{country.name}</h2>
      </div>
      {country.capital}
      <br />
      {country.population}
      <br />
      <h3>Languages: </h3>
      <div>
        {country.languages.map((language) => (
          <div>{language.name}</div>
        ))}
      </div>
    </div>
  )
}

export default CountryDetail

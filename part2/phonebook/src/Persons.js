import React from 'react'

const Persons = ({ persons, searchTerm }) => {
  const personSearch = persons.filter((person) => {
    if (!searchTerm) return person
    if (person.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return person
    }
    return false
  })

  return (
    <>
      {personSearch.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}{' '}
        </div>
      ))}
    </>
  )
}

export default Persons

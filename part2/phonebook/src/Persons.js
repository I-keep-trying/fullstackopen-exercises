import React from 'react'

const Persons = ({ persons, searchTerm, deletePerson }) => {
  const personSearch = persons.filter((person) => {
    if (!searchTerm) return person
    if (person.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return person
    }
    return false
  })

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}? `)) {
      deletePerson(person.id)
    }
    return
  }
  return (
    <>
      {personSearch.map((person) => {
        return (
          <div key={person.name}>
            {person.name} {person.number}{' '}
            <button onClick={() => handleDelete(person)}>delete</button>
          </div>
        )
      })}
    </>
  )
}

export default Persons

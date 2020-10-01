import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const Authors = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(EDIT_AUTHOR)

  const handleSubmit = (e) => {
    e.preventDefault()
    const authorObject = {
      variables: {
        name,
        setBornTo: born,
      },
    }
    updateAuthor(authorObject)
    setName('')
    setBorn('')
  }
  return (
    <div>
      <h2>Authors</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Born</th>
            <th scope="col">Books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="col-md-12">
        <div className="card card-container">
          <h3>Edit Author Record</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <select
                value={name}
                onChange={({ target }) => setName(target.value)}
              >
                {authors.map((a) => {
                  console.log('input option', a.name)
                  return <option value={a.name}>{a.name} </option>
                })}
              </select>
            </div>
            <div className="form-group">
              <input
                value={born}
                placeholder="date of birth"
                onChange={({ target }) => setBorn(Number(target.value))}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-secondary btn-block" type="submit">
                update author
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Authors

import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const AuthorForm = ({ authors, setMessage }) => {
  authors = authors.data.allAuthors
  console.log('Author Form authors', authors)
  const [name, setName] = useState(authors[0].name)
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
    if (isNaN(authorObject.variables.setBornTo)) {
      setMessage('Please enter Author year of birth numerically.')
      setTimeout(() => {
        setMessage(null)
      }, 1000)
    }
    if (authorObject.variables.setBornTo.toString().length < 1) {
      setMessage('Please enter Author year of birth.')
      setTimeout(() => {
        setMessage(null)
      }, 1000)
    }
    updateAuthor(authorObject).catch((e) => {
      if (e.errors) {
        console.log('e.errors', e.errors)
      } else if (!e.errors) {
        console.log('!e.errors', e)
      }
    })
    setName('')
    setBorn('')
  }
  return (
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
                return (
                  <option key={a.id} value={a.name}>
                    {a.name}{' '}
                  </option>
                )
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
  )
}

export default AuthorForm

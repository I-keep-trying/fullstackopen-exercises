import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'
import { toast } from 'react-toastify'

const AuthorForm = ({ authors, setPage }) => {
  authors = authors.data.allAuthors
  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')
  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      toast.error(`💥${error.graphQLErrors[0].message}`, { autoClose: 2000 })
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const authorObject = {
      variables: {
        name,
        setBornTo: Number(born),
      },
    }

    updateAuthor(authorObject)
    setName('')
    setBorn('')
   setPage('authors')
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
              placeholder="year of birth"
              onChange={({ target }) => setBorn(target.value)}
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

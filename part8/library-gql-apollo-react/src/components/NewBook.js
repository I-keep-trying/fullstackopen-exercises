import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS } from '../queries'

const NewBook = ({ setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
  })

  const submit = async (event) => {
    event.preventDefault()
    const bookObject = {
      variables: {
        title,
        published,
        author,
        genre,
      },
    }
    createBook(bookObject)

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))

    setGenre('')
  }

  return (
    <div className="card">
      <div className="card-container">
        <h2>Add A Book</h2>

        <form onSubmit={submit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Title
              </span>
            </div>
            <input
              className="form-control"
              name="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Author
              </span>
            </div>
            <input
              className="form-control"
              name="title"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Published
              </span>
            </div>
            <input
              className="form-control"
              name="title"
              type="number"
              value={published}
              onChange={({ target }) => setPublished(Number(target.value))}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Add Genre{' '}
              </span>
            </div>
            <input
              className="form-control"
              name="title"
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
            <button
              className="btn btn-secondary"
              onClick={addGenre}
              type="button"
            >
              add genre
            </button>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span>
                Genres: {genres.join(' ')}
              </span>
            </div>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button className="btn btn-secondary" type="submit">
                Create Book
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewBook

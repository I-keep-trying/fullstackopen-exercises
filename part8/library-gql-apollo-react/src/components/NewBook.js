import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'
import { toast } from 'react-toastify'

const NewBook = ({ setPage, updateCacheWith }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      console.log('error',error)
      toast.error(`💥${error.graphQLErrors[0].message}`, { autoClose: 2000 })
    },
    onCompleted: (data) => {
      console.log('added book in new book component',data.addBook)
      toast(`Book titled "${data.addBook.title}" successfully added.`, {
        autoClose: 2000,
      })
      setPage('books')
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_BOOKS })
      store.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...dataInStore,
          allBooks: [...dataInStore.allBooks, response.data.addBook],
        },
      })
      updateCacheWith(response.data.addBook)
    },
  })


  const handleSubmit = (event) => {
    event.preventDefault()

    createBook({
      variables: {
        title,
        published: Number(published),
        author,
        genres,
      },
    })
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div className="card">
      <div className="card-container">
        <h2>Add A Book</h2>
        <p>
          <small>Required fields marked with *.</small>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                *Title
              </span>
            </div>
            <input
              className="form-control"
              name="title"
              value={title}
              placeholder="minimum of 2 characters"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                *Author
              </span>
            </div>
            <input
              className="form-control"
              name="title"
              value={author}
              placeholder="minimum of 4 characters"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                *Published
              </span>
            </div>
            <input
              className="form-control"
              name="title"
              type="number"
              value={published}
              placeholder="i.e., 1900"
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
              <span>Genres: {genres.join(' ')}</span>
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

import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS_BY_GENRE } from '../queries'

import { v4 as uuidv4 } from 'uuid'

const Books = ({ books, user }) => {
  const initBooks = books.data.allBooks

  const [getBooks, result] = useLazyQuery(ALL_BOOKS_BY_GENRE)
  const [booksToDisplay, setBooks] = useState(initBooks)
  const [genre, setGenre] = useState('')

  const uniqueGenres = booksToDisplay.reduce((acc, v) => {
    const genres = [...new Set(acc.concat(v.genres))]
    return genres
  }, [])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  if (booksToDisplay) {
    return (
      <div>
        <h2>Books</h2>
        <div></div>
        <div>
          {uniqueGenres.map((g) => {
            const id = uuidv4()
            return (
              <span key={id}>
                <button
                  value={g}
                  onClick={({ target }) => {
                    setGenre(target.value)
                    getBooks({ variables: { genreSelection: target.value } })
                  }}
                >
                  {g}{' '}
                </button>
              </span>
            )
          })}

          <hr />
          <button onClick={() => setBooks(initBooks)}>all books</button>
          {user !== null ? (
            <>
              <button
                onClick={({ target }) => {
                  setGenre(target.value)
                  getBooks({
                    variables: { genreSelection: user.favoriteGenre },
                  })
                }}
              >
                favorite genre
              </button>
              <div>Books in your favorite genre, {user.favoriteGenre}:</div>
            </>
          ) : (
            <></>
          )}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Published</th>
            </tr>
          </thead>
          <tbody>
            {booksToDisplay.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return <div>No books</div>
}

export default Books

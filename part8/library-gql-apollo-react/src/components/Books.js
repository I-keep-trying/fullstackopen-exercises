import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const Books = ({ books, user }) => {
  books = books.data.allBooks
  const [bookFilter, setFilter] = useState('')
  const [booksToShow, setBooksToShow] = useState(books)

  const uniqueGenres = books.reduce((acc, v) => {
    const genres = [...new Set(acc.concat(v.genres))]
    return genres
  }, [])

  useEffect(() => {
    if (user !== null) {
      setFilter(user.favoriteGenre)
    }
  }, [user])

  useEffect(() => {
    bookFilter === ''
      ? setBooksToShow(books)
      : setBooksToShow(
          books.filter((book) => {
            return book.genres.some((genre) => genre === bookFilter)
          })
        )
  }, [books, bookFilter, user])

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
                onClick={({ target }) => setFilter(target.value)}
              >
                {g}{' '}
              </button>
            </span>
          )
        })}
        <hr />
        <button value={''} onClick={({ target }) => setFilter(target.value)}>
          all books
        </button>
        {user !== null ? (
          <>
            <button onClick={() => setFilter(user.favoriteGenre)}>
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
          {booksToShow.map((book) => (
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

export default Books

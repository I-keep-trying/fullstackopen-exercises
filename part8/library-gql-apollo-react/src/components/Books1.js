import React, { useState, useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { ALL_BOOKS_BY_GENRE, EDIT_USER } from '../queries'
import { toast } from 'react-toastify'

import { v4 as uuidv4 } from 'uuid'

const Books = ({ books, user }) => {
  const initBooks = books.data.allBooks
  console.log('initbooks', initBooks)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS_BY_GENRE, {
    onError: (error) => {
      console.log('get books by genre error', error)
    },
    onCompleted: (data) => {
      //console.log('data returned from ALL_BOOKS_BY_GENRE', data)
    },
  })
  const [booksToDisplay, setBooks] = useState(initBooks)
  const [favoriteGenre, setGenre] = useState('')
  const [clicked, setClicked] = useState(false)

  const [makeFavorite] = useMutation(EDIT_USER, {
    onError: (error) => {
      console.log('add user favorite error', error)
    },
    onCompleted: (data) => {
      toast(
        `Your favorite genre has been set to "${data.editUser.favoriteGenre}"`
      )
    },
  })

  const uniqueGenres = booksToDisplay.reduce((acc, v) => {
    const genres = [...new Set(acc.concat(v.genres))]
    return genres
  }, [])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  const favoriteBooks = () => {
    if (user) {
      if (user.favoriteGenre) {
        getBooks({ variables: { genreSelection: user.favoriteGenre } })
      }
    }
  }

  useEffect(() => {
    if (user) {
      if (user.favoriteGenre) {
        favoriteBooks(user)
        setClicked(true)
      }
    }
  }, [user]) // eslint-disable-line

  const setFavorite = async (e) => {
    e.preventDefault()
    const username = user.username
    makeFavorite({ variables: { username, favoriteGenre } })
    favoriteBooks(user)
    setClicked(true)
  }

  const allButton = () => {
    setClicked(false)
    setBooks(initBooks)
  }

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
                    setClicked(true)
                    setGenre(g)
                    getBooks({ variables: { genreSelection: target.value } })
                  }}
                >
                  {g}{' '}
                </button>
              </span>
            )
          })}

          <hr />
          <button onClick={allButton}>all books</button>
          {user !== null ? (
            <>
              {user.favoriteGenre === null ? (
                <div>
                  {clicked === false ? (
                    <></>
                  ) : (
                    <>
                      Make {favoriteGenre} your favorite
                      <button onClick={setFavorite}> Set favorite </button>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setClicked(true)
                      getBooks({
                        variables: { genreSelection: user.favoriteGenre },
                      })
                    }}
                  >
                    <span></span>✨{user.favoriteGenre}✨
                  </button>
                </>
              )}
            </>
          ) : (
            <></>
          )}
          {user !== null && user.favoriteGenre !== null && clicked ? (
            <div>Books in your favorite genre, {user.favoriteGenre}:</div>
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
            {booksToDisplay.map((book) => {
              return (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  return <div>No books</div>
}

export default Books

import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Home = () => (
  <div>
    {' '}
    <h3>Home</h3> <h3>Library App</h3>
    <p>
      This is my library app where you can find information about books and
      authors.{' '}
    </p>
  </div>
)

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const [page, setPage] = useState('authors')
  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  let authors = useQuery(ALL_AUTHORS)

  let books = useQuery(ALL_BOOKS)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const content = () => {
    if (authors.loading || books.loading) {
      return <div>Loading...</div>
    }
    authors = authors.data.allAuthors
    books = books.data.allBooks
    if (page === 'home') {
      return <Home />
    } else if (page === 'authors') {
      return <Authors authors={authors} />
    } else if (page === 'books') {
      return <Books books={books} />
    } else if (page === 'newBook') {
      return <NewBook setError={notify} books={books} />
    }
  }

  const padding = {
    padding: 5,
  }

  return (
    <div className="container">
      <div>
      <div style={{marginBottom: 50}} >
      <nav className="fixed-top" >
      <nav className="navbar navbar-expand navbar-dark bg-dark ">
          <div className="navbar-brand">
              <h3>React Apollo Graphql - Library</h3>
          </div>
      <div className="navbar-nav mr-auto">
              <li className="nav-item nav-link" onClick={toPage('home')}>
                home
              </li>
              <li className="nav-item nav-link" onClick={toPage('authors')}>
                authors
              </li>
              <li className="nav-item nav-link" onClick={toPage('books')}>
                books
              </li>
              <li className="nav-item nav-link" onClick={toPage('newBook')}>
                add book
              </li>
            </div>
                </nav>
            </nav>
        </div>
        <div>{content()}</div>
      </div>
    </div>
  )
}

export default App

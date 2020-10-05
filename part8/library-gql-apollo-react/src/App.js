import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Footer from './Footer'

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
    <p>
      This app was built with Apollo Server, MongoDB and Mongoose, Graphql,
      React, and styled with Bootstrap.
    </p>
  </div>
)

const Notify = ({ errorMessage }) => {
  console.log('notify component', errorMessage)
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const [page, setPage] = useState('home')
  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  let authors = useQuery(ALL_AUTHORS)

  let books = useQuery(ALL_BOOKS)

  const content = () => {
    if (page === 'home') {
      return <Home />
    } else if (page === 'authors') {
      return (
        <Authors
          authors={authors}
          books={books}
          setErrorMessage={setErrorMessage}
        />
      )
    } else if (page === 'books') {
      return <Books books={books} />
    } else if (page === 'newBook') {
      return <NewBook setErrorMessage={setErrorMessage} books={books} />
    }
  }

  return (
    <div className="container">
      {authors.loading || books.loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>
            <div style={{ marginBottom: 50 }}>
              <nav className="fixed-top">
                <nav className="navbar navbar-expand navbar-dark bg-dark ">
                  <div className="navbar-brand">
                    <h3>React Apollo Graphql - Library</h3>
                  </div>
                  <div className="navbar-nav mr-auto">
                    <li
                      style={{ cursor: 'pointer' }}
                      className="nav-item nav-link"
                      onClick={toPage('home')}
                    >
                      home
                    </li>
                    <li
                      style={{ cursor: 'pointer' }}
                      className="nav-item nav-link"
                      onClick={toPage('authors')}
                    >
                      authors
                    </li>
                    <li
                      style={{ cursor: 'pointer' }}
                      className="nav-item nav-link"
                      onClick={toPage('books')}
                    >
                      books
                    </li>
                    <li
                      style={{ cursor: 'pointer' }}
                      className="nav-item nav-link"
                      onClick={toPage('newBook')}
                    >
                      add book
                    </li>
                  </div>
                </nav>
              </nav>
            </div>
            <Notify errorMessage={errorMessage} />
            <div>{content()}</div>
          </div>
          <Footer />
        </>
      )}
    </div>
  )
}

export default App

import React, { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import Authors from './components/Authors'
import AuthorForm from './components/AuthorForm'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
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

const Notify = ({ message }) => {
  if (!message) {
    return null
  }
  return <div style={{ color: 'red' }}>{message}</div>
}

const App = () => {
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState(null)
  const [page, setPage] = useState('home')
  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  let authors = useQuery(ALL_AUTHORS)
  console.log('App component authors', authors)
  let books = useQuery(ALL_BOOKS)
  /*   authors = authors.data.allAuthors
  books = books.data.allBooks */
  const authContent = () => {
    if (page === 'home') {
      return <Home />
    } else if (page === 'authors') {
      return (
        <Authors
          authors={authors}
          books={books}
          setMessage={setMessage}
          message={message}
        />
      )
    } else if (page === 'authorForm') {
      return (
        <AuthorForm
          authors={authors}
          books={books}
          setMessage={setMessage}
          message={message}
        />
      )
    } else if (page === 'books') {
      return <Books books={books} />
    } else if (page === 'newBook') {
      return <NewBook setMessage={setMessage} message={message} books={books} />
    }
  }

  const unAuthContent = () => {
    if (page === 'home') {
      return <Home />
    } else if (page === 'authors') {
      return (
        <Authors
          authors={authors}
          books={books}
          setMessage={setMessage}
          message={message}
        />
      )
    } else if (page === 'books') {
      return <Books books={books} />
    } else if (page === 'login') {
      return (
        <LoginForm
          setToken={setToken}
          setMessage={setMessage}
          message={message}
          setPage={setPage}
        />
      )
    }
  }

  if (!token) {
    return (
      <div>
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
                          onClick={toPage('login')}
                        >
                          login
                        </li>
                      </div>
                    </nav>
                  </nav>
                </div>
                <Notify message={message} />
                <div>{unAuthContent()}</div>
              </div>
              <Footer />
            </>
          )}
        </div>
        <Notify message={message} />
      </div>
    )
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
                      onClick={toPage('authorForm')}
                    >
                      edit author
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
                    <li
                      style={{ cursor: 'pointer' }}
                      className="nav-item nav-link"
                      onClick={logout}
                    >
                      logout
                    </li>
                  </div>
                </nav>
              </nav>
            </div>
            <Notify message={message} />
            <div>{authContent()}</div>
          </div>
          <Footer />
        </>
      )}
    </div>
  )
}

export default App

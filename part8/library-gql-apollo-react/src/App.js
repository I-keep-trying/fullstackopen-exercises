import React, { useState } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'
import Authors from './components/Authors'
import AuthorForm from './components/AuthorForm'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Footer from './Footer'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer, toast, Slide } from 'react-toastify'
import './ReactToastify.css'

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

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('home')
  const [user, setUser] = useState(null)

  let authors = useQuery(ALL_AUTHORS)

  let books = useQuery(ALL_BOOKS)

  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.clear()
    client.resetStore()
    toast('Logout successful', { autoClose: 2000 })
    setPage('home')
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      return set
        .map((p) => {
          return p.id
        })
        .includes(object.id)
    }

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      toast(`Book titled "${addedBook.title}" successfully added.`, {
        autoClose: 2000,
      })
      updateCacheWith(addedBook)
    },
  })

  const authContent = () => {
    if (page === 'home') {
      return <Home />
    } else if (page === 'authors') {
      return <Authors authors={authors} books={books} />
    } else if (token && page === 'authorForm') {
      return <AuthorForm authors={authors} books={books} setPage={setPage} />
    } else if (page === 'books') {
      return <Books books={books} user={user} />
    } else if (page === 'newBook') {
      return <NewBook books={books} setPage={setPage} />
    } else if (!token && page === 'login') {
      return (
        <LoginForm
          setToken={setToken}
          setUser={setUser}
          user={user}
          setPage={setPage}
        />
      )
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
                    {token ? (
                      <li
                        style={{ cursor: 'pointer' }}
                        className="nav-item nav-link"
                        onClick={toPage('authorForm')}
                      >
                        edit author
                      </li>
                    ) : (
                      <></>
                    )}
                    <li
                      style={{ cursor: 'pointer' }}
                      className="nav-item nav-link"
                      onClick={toPage('books')}
                    >
                      books
                    </li>

                    {token ? (
                      <>
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
                      </>
                    ) : (
                      <li
                        style={{ cursor: 'pointer' }}
                        className="nav-item nav-link"
                        onClick={toPage('login')}
                      >
                        login
                      </li>
                    )}
                  </div>
                </nav>
              </nav>
            </div>
            <ToastContainer
              pauseOnFocusLoss={false}
              autoClose={2000}
              transition={Slide}
            />
            <div>{authContent()}</div>
          </div>
          <Footer />
        </>
      )}
    </div>
  )
}

export default App

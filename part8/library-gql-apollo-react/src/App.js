import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import './App.css'

const Home = () => (
  <div>
    {' '}
    <h2>Library App</h2>{' '}
  </div>
)

function App() {
  const [page, setPage] = useState('authors')

  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const content = () => {
    if (page === 'home') {
      return <Home />
    } else if (page === 'authors') {
      return <Authors />
    } else if (page === 'books') {
      return <Books />
    } else if (page === 'addBook') {
      return <NewBook />
    }
  }

  const padding = {
    padding: 5,
  }

  return (
    <div className="App">
      <header className="App-header">React Apollo Graphql - Library</header>
{/*       <div className="AppBody">
        <div>
          <button onClick={() => toPage('home')}>home</button>
          <button onClick={() => toPage('authors')}>authors</button>
          <button onClick={() => toPage('books')}>books</button>
          <button onClick={() => toPage('add')}>add book</button>
        </div>
        <div>{content()}</div>
      </div> */}
    </div>
  )
}

export default App

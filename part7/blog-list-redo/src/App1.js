import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch, Route, Link
  } from "react-router-dom"
  
import { initializeBlogs } from './reducers/blogReducer'
import { logoutUser } from './reducers/userReducer'
import blogService from './services/blogs'

import Home from './components/Home'
import Blogs from './components/Blogs'
import Users from './components/Users'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'

import { ToastContainer, toast } from 'react-toastify'
import './ReactToastify.css'

import logo from './blog-icon.png'

import './App.css'

const App = () => {
  const [page, setPage] = useState('home')

  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const dispatch = useDispatch()

  const user = useSelector((state) => {
    return state.user
  })

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(initializeBlogs(blogs)))
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser')
    blogService.setToken('')
    dispatch(logoutUser())
    toast(`Goodbye, ${user.name}! Come back soon!`, {
      autoClose: 2000,
    })
  }

  const content = () => {
    if (page === 'home') {
      return <Home />
    } else if (page === 'blogs') {
      return <Blogs user={user} />
    } else if (page === 'users') {
      return <Users />
    } else if (page === 'login') {
      return <LoginForm user={user} />
    }
  }

  const padding = {
    padding: 5,
  }

  return (
    <div className="App">
      <div className="App-header">
        <div className="App-menu">
          <a href="" onClick={toPage('home')} style={padding}>
            home
          </a>
          <a href="" onClick={toPage('blogs')} style={padding}>
            blogs
          </a>
          <a href="" onClick={toPage('users')} style={padding}>
            users
          </a>
          {user === null ? (
            <a href="" onClick={toPage('login')} style={padding}>
              login
            </a>
          ) : (
            <></>
          )}
        </div>

        {user === null ? (
          <></>
        ) : (
          <>
            <div className="User">
              User <i> {user.name} </i>is logged in
            </div>
            <br />
            <div className="LogInOut" onClick={handleLogout}>
              logout
            </div>
          </>
        )}
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Blog List</h1>
      </div>
      <div className="AppBody">
        <ToastContainer pauseOnFocusLoss={false} />
        {content()}
      </div>
      <Footer />
    </div>
  )
}

export default App

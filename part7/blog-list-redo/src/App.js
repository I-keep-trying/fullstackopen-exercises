import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { logoutUser, getUser } from './reducers/userReducer'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import Footer from './components/Footer'

import logo from './blog-icon.png'

import './App.css'

function App() {
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(initializeBlogs(blogs)))
    dispatch(getUser(user))
  }, [dispatch])

  const user = useSelector((state) => state.user)
  console.log('App.js user state', user)

      useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogAppUser')
    if (loggedUserJSON) {
      blogService.setToken(user.token)
      
    }
  }, [user])

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm logout={handleLogout} />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="Add blog" cancel="cancel" ref={blogFormRef}>
      <NewBlog />
    </Togglable>
  )

  const handleLogout = () => {
    console.log('logout happened', user)
    window.localStorage.removeItem('loggedInBlogAppUser')
    blogService.setToken('')
    dispatch(logoutUser())
  }

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Blog List</h1>
      </div>{' '}
      <div className="AppBody">
        <Notification />
        {user === null ? (
          loginForm()
        ) : (
          <div>
            User <i> {user.name} </i>is logged in{' '}
            <button onClick={handleLogout}>logout</button>
            <button onClick={() => dispatch(getUser(user))}>get user</button>
            {blogForm()}
          </div>
        )}
        <br />
        <Blogs user={user} />
      </div>
      <Footer />
    </div>
  )
}

export default App

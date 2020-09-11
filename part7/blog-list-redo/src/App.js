import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import Footer from './components/Footer'

import { notificationChange } from './reducers/notificationReducer'

import logo from './blog-icon.png'

import './App.css'

function App() {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(initializeBlogs(blogs)))
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await blogService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(notificationChange('Wrong credentials', 2000))
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="Add blog" cancel="cancel" ref={blogFormRef}>
      <NewBlog />
    </Togglable>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken('')
    setUser(null)
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

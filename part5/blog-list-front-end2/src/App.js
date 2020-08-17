import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import logo from './blog-icon.png'

import './App.css'

function App() {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
    })
  }, [])

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
      setErrorMessage({ text: `Welcome, ${user.name}!`, type: 'info' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage({ text: 'Wrong credentials', type: 'error' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage({
        text: `Success! ${returnedBlog.title} by ${returnedBlog.author} has been added. `,
        type: 'info',
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  const blogForm = () => (
    <Togglable buttonLabel="Add blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken('')
    setUser(null)
    setErrorMessage({ text: 'Logged out', type: 'info' })
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Blog List</h1>
      </div>{' '}
      <div className="AppBody">
        <Notification message={errorMessage} />
        {user === null ? (
          loginForm()
        ) : (
          <div>
            <i>{user.name} is logged in </i>
            <button onClick={handleLogout}>logout</button>

            {blogForm()}
          </div>
        )}
        <br />
        <ul>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default App

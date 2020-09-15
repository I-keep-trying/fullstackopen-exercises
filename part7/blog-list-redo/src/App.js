import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { logoutUser } from './reducers/userReducer'
import Blogs from './components/Blogs'
import Users from './components/Users'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify'
import './ReactToastify.css'

import logo from './blog-icon.png'

import './App.css'

function App() {
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const user = useSelector((state) => {
    return state.user
  })

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(initializeBlogs(blogs)))
  }, [dispatch])


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
    window.localStorage.removeItem('loggedInBlogAppUser')
    blogService.setToken('')
    dispatch(logoutUser())
    toast(`Goodbye, ${user.name}! Come back soon!`, {
      autoClose: 2000,
    })
  }
  
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Blog List</h1>
      </div>{' '}
      <div className="AppBody">
        <ToastContainer pauseOnFocusLoss={false} />

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
        <Users />
      </div>
      <Footer />
    </div>
  )
}

export default App

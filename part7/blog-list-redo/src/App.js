import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { logoutUser } from './reducers/userReducer'
import Blogs from './components/Blogs'
import Users from './components/Users'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify'
import './ReactToastify.css'

import logo from './blog-icon.png'

import './App.css'

function App() {
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

  return (
    <div className="App">
      <div className="App-header">
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
      </div>{' '}
      <div className="AppBody">
        <ToastContainer pauseOnFocusLoss={false} />
        <LoginForm user={user} />
        <Blogs user={user} />
        <Users />
      </div>
      <Footer />
    </div>
  )
}

export default App

import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
} from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { logoutUser } from './reducers/userReducer'
//import Blogs from './components/Blogs'
//import { Blog } from './components/Blogs1'
import Users from './components/Users'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import Home from './components/Home'

import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify'
import './ReactToastify.css'

import logo from './blog-icon.png'

import './App.css'

const Blog = ({ blogs }) => {
  const id = useParams().id
  const blog = blogs.find((b) => b.id === Number(id))
  return (
    <div>
      <h2>{blog.title} </h2>
      <div>{blog.author} </div>
    </div>
  )
}

const Blogs = ({ blogs }) => (
  <div>
    <h2>Blogs</h2>
    <ul>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
        </li>
      ))}
    </ul>
  </div>
)

function App() {
  const dispatch = useDispatch()
  const history = useHistory()

  const blogFormRef = useRef()

  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  console.log('current user', user)
  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(initializeBlogs(blogs)))
  }, [dispatch])

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="Add blog" cancel="cancel" ref={blogFormRef}>
      <NewBlog />
    </Togglable>
  )

  const padding = {
    padding: 5,
  }

/*   const logoutUser = () => {
    console.log('is this even happening')
    window.localStorage.removeItem('loggedInBlogAppUser')
    blogService.setToken('')
    dispatch(logoutUser())
    toast(`Goodbye, ${user.name}! Come back soon!`, {
      autoClose: 2000,
    })
    return history.push('/')
  } */

  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <div>
            <Link style={padding} to="/">
              home
            </Link>
            <Link style={padding} to="/blogs">
              blogs
            </Link>
            <Link style={padding} to="/users">
              users
            </Link>
            {user ? (
              <>
                <em> {user.name} logged in</em>
                <Link style={padding} to="/logout">
                  logout
                </Link>
              </>
            ) : (
              <Link style={padding} to="/login">
                login
              </Link>
            )}
          </div>
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Blog List</h1>
        </div>{' '}
        <div className="AppBody">
          <ToastContainer pauseOnFocusLoss={false} />
          <Switch>
            <Route path="/blogs">
              <Blogs blogs={blogs} user={user} />
            </Route>
            <Route path="/users">
              {user ? <Users /> : <Redirect to="/login" />}
            </Route>

            {user ? (
             <></>
            ) : (
              <Route path="/login">
                <LoginForm />
              </Route>
            )}

            <Route path="/">
              <Home />
            </Route>
          </Switch>

          <br />
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App

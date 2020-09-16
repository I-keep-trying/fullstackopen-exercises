import React, { useState, useEffect } from 'react'
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

import {
  initializeBlogs,
  fetchBlog,
  likeBlog,
  deleteYourBlog,
} from './reducers/blogsReducer'
import { logoutUser } from './reducers/userReducer'
import blogService from './services/blogs'

import Home from './pages/Home'
import Blogs from './pages/BlogsPage'
import Blog from './pages/BlogPage'

import { Menu } from './components/Menu'
import Users from './components/Users'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Footer from './components/Footer'

import { ToastContainer, toast } from 'react-toastify'
import './ReactToastify.css'

import logo from './blog-icon.png'

import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()

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
    <Router>
      <div className="App">
        <div className="App-header">
          <div className="App-menu"></div>
          <Menu />

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
          <h1> </h1>
        </div>
        <div className="AppBody">
          <ToastContainer pauseOnFocusLoss={false} />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/blogs" component={Blogs}  ></Route>
            <Route exact path="/blogs/:id" component={Blog} ></Route>

            <Route exact path="/users" component={Users} ></Route>
            <Route exact path="/login" component={LoginForm} ></Route>
            <Route exact path="/newBlog" component={NewBlog} ></Route>
            <Redirect to="/" />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { fetchBlogs } from './reducers/blogsReducer'
import { fetchUsers } from './reducers/allUsersReducer'

import { logoutUser } from './reducers/authReducer'
import blogService from './services/blogs'
import usersService from './services/users'

import Home from './components/Home'
import Blogs from './components/Blogs'
import Blog from './components/Blog'

import { Menu } from './components/Menu'
import Users from './components/Users'
import User from './components/User'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Footer from './components/Footer'

import { ToastContainer, toast } from 'react-toastify'
import './ReactToastify.css'

import logo from './blog-icon.png'

import './App.css'

const App = () => {
  const dispatch = useDispatch()

  const auth = useSelector((state) => {
    return state.auth
  })

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      return dispatch(fetchBlogs(blogs))
    })
    usersService.getAllUsers().then((users) => {
      return dispatch(fetchUsers(users))
    })
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser')
    blogService.setToken('')
    dispatch(logoutUser())
    toast(`Goodbye, ${auth.name}! Come back soon!`, {
      autoClose: 2000,
    })
  }

  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <div className="App-menu"></div>
          <Menu />
          {auth === null ? (
            <></>
          ) : (
            <>
              <div className="User">
                User <i> {auth.name} </i>is logged in
              </div>
              <br />
              <div className="LogInOut" onClick={handleLogout}>
                logout
              </div>
            </>
          )}
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Blog List App </h1>
        </div>
        <div className="AppBody">
          <ToastContainer pauseOnFocusLoss={false} />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/blogs" component={Blogs}></Route>
            <Route exact path="/blogs/:id" component={Blog}></Route>

            <Route exact path="/users" component={Users}></Route>
            <Route exact path="/users/:id" component={User}></Route>
            <Route exact path="/login" component={LoginForm}></Route>
            <Route exact path="/newBlog" component={NewBlog}></Route>
            <Redirect to="/" />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App

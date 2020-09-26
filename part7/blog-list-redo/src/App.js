import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { fetchBlogs } from './reducers/blogsReducer'
import { fetchUsers } from './reducers/allUsersReducer'
import { initializeAuth } from './reducers/authReducer'

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

import { ToastContainer } from 'react-toastify'
import './ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import logo from './blog-icon.png'

import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const history = createBrowserHistory()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      return dispatch(fetchBlogs(blogs))
    })
    usersService.getAllUsers().then((users) => {
      return dispatch(fetchUsers(users))
    })
    dispatch(initializeAuth(window.localStorage.getItem('loggedInBlogAppUser')))
  }, [dispatch])

  useEffect(() => {
    history.listen((location) => {
      console.log('history location', location)
    })
  }, [dispatch])

  return (
    <div className="container">
    <Router history={history}>
      <div>
          <Menu />
        </div>
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

        <Footer />
{/*       </div>
 */}    </Router>
         </div>

  )
}

export default App

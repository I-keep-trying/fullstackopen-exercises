import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { logoutUser } from '../reducers/authReducer'
import logo from '../blog-icon.png'
import 'bootstrap/dist/css/bootstrap.min.css'

import '../App.css'

export const Menu = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => {
    return state.auth
  })

  const handleLogout = () => {
    dispatch(logoutUser(localStorage.removeItem('loggedInBlogAppUser')))
  }
  return (
    <div style={{marginBottom: 150}} >
      <nav class="fixed-top" >
      <nav className="navbar navbar-expand navbar-dark bg-dark ">
        <img src={logo} className="App-logo" alt="logo" />
        {auth.id === '' ? (
          <></>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <div className="nav-link">
                <i> {auth.name} </i>is logged in
              </div>
            </li>
          </div>
        )}
      </nav>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          <h2>Blog List App </h2>
        </Link>

        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home{' '}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/blogs">
              Blogs
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/users">
              Users
            </Link>
          </li>
          {auth.id === '' ? (
            <></>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/newBlog">
                  Add a Blog
                </Link>
              </li>
            </div>
          )}
        </div>

        {auth.id === '' ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </div>
        ) : (
          <>
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <div className="LogInOut" onClick={handleLogout}>
                  logout
                </div>
              </li>
            </div>
          </>
        )}
      </nav>
      </nav>
     
    </div>
  )
}

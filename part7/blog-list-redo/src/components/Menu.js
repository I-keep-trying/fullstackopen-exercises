import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../App.css'

export const Menu = () => {
  const user = useSelector((state) => {
    return state.user
  })
  return (
  <nav className="App-menu">
    <Link className="MenuItem" to="/">
      Home
    </Link>
    <Link className="MenuItem" to="/blogs">
      Blogs
    </Link>
    <Link className="MenuItem" to="/users">
      Users
    </Link>
{user === null ?
    <Link className="MenuItem" to="/login">
      Login
    </Link>
    :
    <Link className="MenuItem" to="/newBlog">
      Add a Blog
    </Link>
    }
  </nav>
)}

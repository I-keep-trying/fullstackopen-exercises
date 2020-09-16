import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

export const Menu = () => (
  <nav className="App-header">
    <section>
      <Link to="/">Home</Link>
      <Link to="/blogs">Blogs</Link>
    </section>
  </nav>
)

import React from 'react'
import { Link } from 'react-router-dom'

export const BlogItem = ({ blog }) => (
  <div>
    <h2>{blog.title}</h2>

    <Link to={`/blogs/${blog.id}`} >
      View Blog
    </Link>
  </div>
)

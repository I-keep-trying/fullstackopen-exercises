import React from 'react'
import { Link } from 'react-router-dom'

export const BlogItem = ({ blog }) => (
  <div>
    <h2>{blog.title}</h2>
    <div>
      Author: {blog.author}
      <br />
      Info: {blog.url}
    </div>BlogItem.js
  </div>
)

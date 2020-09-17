import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogs = useSelector((state) => {
    return state.blogs.blogs
  })

  return blogs.map((blog) => {
    return (
      <div key={blog.id}>
        <h2>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </h2>
      </div>
    )
  })
}

export default Blogs

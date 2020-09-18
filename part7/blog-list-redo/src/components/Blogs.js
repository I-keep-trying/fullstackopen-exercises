import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogs = useSelector((state) => {
    return state.blogs.blogs
  })

  const loading = useSelector((state) => state.blogs.loading)

  return blogs.map((b) => {
    return (
      <div key={b.id}>
        <h2>
          <Link to={`/blogs/${b.id}`}>{b.title}</Link>
        </h2>
        <div>Likes: {b.likes} </div>
      </div>
    )
  })
}

export default Blogs

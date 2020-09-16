import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { fetchBlogs } from '../reducers/blogsReducer'

const BlogsPage = ({ setLocation }) => {
  let history = useHistory()

  const dispatch = useDispatch()
  useEffect(() => {
    console.log('is useEffect even happening???')
    dispatch(fetchBlogs())
  }, [dispatch])

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

export default BlogsPage

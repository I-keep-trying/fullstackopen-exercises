import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs } from '../reducers/blogsReducer'
import Blog from './BlogLink'

const Blogs = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch])
  const blogs = useSelector((state) => {
    return state.blogs.blogs
  })

  return blogs.map((blog) => {
    return (
      <div key={blog.id}>
        <Blog blog={blog} />
      </div>
    )
  })
}

export default Blogs

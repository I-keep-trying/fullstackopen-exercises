import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchBlogs } from '../reducers/blogsReducer'

import { BlogItem } from '../components/BlogItem'

const Blogs = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch])

  const loading = useSelector((state) => state.blogs.loading)
  const blogs = useSelector((state) => state.blogs.blogs)
  const hasErrors = useSelector((state) => state.blogs.hasErrors)

  const renderBlogs = () => {
    if (loading) return <p>Loading blogs...</p>
    if (hasErrors) return <p>Unable to display blogs.</p>

    return blogs.map((blog) => {
        console.log('blogs mapped',blog)
    return <BlogItem key={blog.id} blog={blog} />})
  }

  return (
    <section>
      <h1>Blogs</h1>
      {renderBlogs()}
    </section>
  )
}

export default Blogs

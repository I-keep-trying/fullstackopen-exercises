import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import blogService from '../services/blogs'
import axios from 'axios'

import { initializeBlogs, getBlogsSuccess } from '../reducers/blogsReducer'

const BlogsPage = ({ setLocation }) => {
  let history = useHistory()

  const dispatch = useDispatch()

  const blogs = useSelector((state) => {
    return state.blogs.blogs
  })
  
  return blogs.map((blog) => {
    return (
      <div key={blog.id}>
        <h2>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </h2>
      </div>
    )
  })
}

export default BlogsPage

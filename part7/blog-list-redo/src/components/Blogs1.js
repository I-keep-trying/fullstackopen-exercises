import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { likeBlog, deleteYourBlog } from '../reducers/blogsReducer'
import Blog from './BlogItem'
import { toast } from 'react-toastify'

const Blogs = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = blogs.sort((a, b) => {
    return b.likes - a.likes
  })
  const addLike = (blog) => {
    dispatch(likeBlog(blog))
    toast(`You added 1 like to "${blog.title}". `, {
      autoClose: 2000,
    })
  }

  const removeBlog = (blog) => {
    if (user === null) {
      toast('user null unauthorized', {
        autoClose: 2000,
      })
      return
    } else if (user.id === blog.user.id) {
      if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
        dispatch(deleteYourBlog(blog))
        toast(`Your blog, "${blog.title}", has been deleted. `, {
          autoClose: 2000,
        })
      }
    } else {
      toast('user unauthorized', {
        autoClose: 2000,
      })
    }
  }
  return (
    <>
      <div>
        <ul>
          {sortedBlogs.map((blog) => {
            return (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id} `}>{blog.title} </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Blogs

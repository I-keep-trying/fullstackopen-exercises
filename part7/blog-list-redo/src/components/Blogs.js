import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteYourBlog } from '../reducers/blogReducer'
import { toast } from 'react-toastify'

const Blog = ({ blog }) => {
  return (
    <li>
      Title: {blog.title}
      <br />
      Author: {blog.author}
      <br />
      Url: {blog.url}
      <br />
      Likes: {blog.likes}
    </li>
  )
}

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
      {sortedBlogs.map((blog) => (
        <ul key={blog.id}>
          <Blog blog={blog} />
          <button onClick={() => addLike(blog)}>like</button>

          {user === null || user.id !== blog.user.id ? (
            <div></div>
          ) : (
            <button onClick={() => removeBlog(blog)}>delete</button>
          )}
        </ul>
      ))}
    </>
  )
}

export default Blogs

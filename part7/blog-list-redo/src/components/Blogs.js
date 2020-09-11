import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteYourBlog } from '../reducers/blogReducer'
import { notificationChange } from '../reducers/notificationReducer'

const Blog = ({ blog, handleClick, deleteClick }) => {
  return (
    <li>
      Title: {blog.title}
      <br />
      Author: {blog.author}
      <br />
      Url: {blog.url}
      <br />
      Likes: {blog.likes}
      <button onClick={handleClick}>like</button>
      <button onClick={deleteClick}>delete</button>
    </li>
  )
}

const Blogs = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  const addLike = async (blog) => {
    dispatch(likeBlog(blog))
    dispatch(notificationChange(`You liked "${blog.title}"`, 2000))
  }

  const removeBlog = (blog) => {
    if (user.id === blog.user.id) {
      if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
        dispatch(deleteYourBlog(blog))
        dispatch(notificationChange('blog deleted', 2000))
      }
    } else {
      dispatch(notificationChange('Unauthorized', 2000))
    }
  }
  return (
    <>
      {sortedBlogs.map((blog) => (
        <ul key={blog.id}>
          <Blog
            blog={blog}
            handleClick={() => addLike(blog)}
            deleteClick={() => removeBlog(blog)}
          />
        </ul>
      ))}
    </>
  )
}

export default Blogs

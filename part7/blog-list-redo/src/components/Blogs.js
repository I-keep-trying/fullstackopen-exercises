import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteYourBlog } from '../reducers/blogReducer'

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
    </li>
  )
}

const Blogs = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const sortedBlogs = blogs.sort((a, b) => {
    return b.likes - a.likes
  })
console.log('blogs component', sortedBlogs)
  const addLike = (blog) => {
    console.log('addLike button clicked', blog.title)
    dispatch(likeBlog(blog))
  }

  const removeBlog = (blog) => {
    if (user.id === blog.user.id) {
      if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
        dispatch(deleteYourBlog(blog))
      }
    } else {
      return
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
          <button onClick={addLike}>like</button>
          <button onClick={removeBlog}>delete</button>
        </ul>
      ))}
    </>
  )
}

export default Blogs

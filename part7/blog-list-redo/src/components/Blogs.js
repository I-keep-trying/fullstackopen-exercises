import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { notificationChange } from '../reducers/notificationReducer'

const Blog = ({ blog, handleClick }) => {
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

    </li>
  )
}

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  const addLike = async (blog) => {
    dispatch(likeBlog(blog))
    dispatch(notificationChange(`You liked "${blog.title}"`, 2000))
  }

   return (
    <>
      {sortedBlogs.map((blog) => (
        <ul key={blog.id}>
          <Blog
            blog={blog}
            handleClick={() => addLike(blog)}
            
          />
        </ul>
      ))}
    </>
  )
}

export default Blogs

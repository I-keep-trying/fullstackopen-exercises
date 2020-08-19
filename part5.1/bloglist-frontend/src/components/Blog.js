import React from 'react'
import BlogDetail from './BlogDetail'
import Togglable from './Togglable'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  return (
    <li className="blog-detail">
      <a
        className="App-link"
        href={blog.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {blog.title}
      </a>
      <Togglable buttonLabel="view" cancel="close">
        <BlogDetail
          blog={blog}
          addLike={addLike}
          removeBlog={removeBlog}
          user={user}
        />
      </Togglable>
    </li>
  )
}

export default Blog

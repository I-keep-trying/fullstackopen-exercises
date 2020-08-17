import React from 'react'
import BlogDetail from './BlogDetail'
import Togglable from './Togglable'

const Blog = ({ blog }) => {


  return (
    <li>
        
    <a
    className="App-link"
    href={blog.url}
    target="_blank"
    rel="noopener noreferrer"
    >{blog.title}
        </a>  
        <Togglable buttonLabel="view" >
          <BlogDetail blog={blog} />
        </Togglable>
    </li>
  )
}

export default Blog
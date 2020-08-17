import React from 'react'

const BlogDetail = ({ blog }) => {

  return (
      <div>
          
      Author: {blog.author}
      <br />
     Url: {blog.url}
      <br />
      Likes: {blog.likes}{' '}
      <button>like</button>
      </div>

  )
}

export default BlogDetail
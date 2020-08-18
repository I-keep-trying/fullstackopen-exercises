import React from 'react'

const BlogDetail = ({ blog, addLike, removeBlog, user }) => {

  return (
    <div>
      Author: {blog.author}
      <br />
      Url: {blog.url}
      <br />
      Likes: {blog.likes} <button onClick={addLike}>like</button>
      {user.id === blog.user.id ? (
        <button onClick={removeBlog}>delete</button>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default BlogDetail

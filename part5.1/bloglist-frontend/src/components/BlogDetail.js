import React from 'react'

const BlogDetail = ({ blog, addLike, removeBlog, user }) => {
  const showDeleteButton = () => {
    if (user === null || user.id !== blog.user.id) {
      return <div></div>
    } else if (user.id === blog.user.id) {
      return <button onClick={removeBlog}>delete</button>
    }
  }
  return (
    <div data-testid='author'>
      Author: {blog.author}
      <br />
      Url: {blog.url}
      <br />
      Likes: {blog.likes} <button onClick={addLike}>like</button>
      {showDeleteButton()}
      
    </div>
  )
}

export default BlogDetail

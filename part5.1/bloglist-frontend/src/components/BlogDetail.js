import React from 'react'

const BlogDetail = ({ blog, addLike, removeBlog, user }) => {
  const showDeleteButton = () => {
    const blogUser = blog.user.id === undefined ? blog.user : blog.user.id

    if (user === null || user.id !== blogUser) {
      return <div></div>
    } else if (user.id === blogUser) {
      return (
        <button id="delete" onClick={removeBlog}>
          delete
        </button>
      )
    }
  }
  return (
    <div data-testid="author">
      Author: {blog.author}
      <br />
      <div>Url: {blog.url}</div>
      <div id="likes">
        Likes: {blog.likes}
        <div>
          <button id="add-like" onClick={addLike}>
            like
          </button>
        </div>
      </div>
      {showDeleteButton()}
    </div>
  )
}

export default BlogDetail

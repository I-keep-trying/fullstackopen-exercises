import React from 'react'

const BlogDetail = ({ blog, addLike, removeBlog, user }) => {
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
      {user === null || blog.user.id !== user.id ? (
        <div></div>
      ) : (
        <button id="delete" onClick={removeBlog}>
          delete
        </button>
      )}
    </div>
  )
}

export default BlogDetail

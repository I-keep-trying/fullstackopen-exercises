import React from 'react'
//import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteYourBlog } from '../reducers/blogReducer'
import { toast } from 'react-toastify'

export const Blog = ({ blog }) => {
  /* 
    author: "cupcake"
id: "5f3ea774fd1f7135b834e725"
likes: 50
title: "We want a shrubbery!!"
url: "www.website.com"
    */
  /*   const id = useParams().id
  const blog = blogs.find((n) => n.id === Number(id)) */

  return (
    <div key={blog.id}>
      Title: {blog.title}
      <br />
      Author: {blog.author}
      <br />
      Url: {blog.url}
      <br />
      Likes: {blog.likes}
    </div>
  )
}

const Blogs = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = blogs.sort((a, b) => {
    return b.likes - a.likes
  })
  const addLike = (blog) => {
    dispatch(likeBlog(blog))
    toast(`You added 1 like to "${blog.title}". `, {
      autoClose: 2000,
    })
  }

  const removeBlog = (blog) => {
    if (user === null) {
      toast('user null unauthorized', {
        autoClose: 2000,
      })
      return
    } else if (user.id === blog.user.id) {
      if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
        dispatch(deleteYourBlog(blog))
        toast(`Your blog, "${blog.title}", has been deleted. `, {
          autoClose: 2000,
        })
      }
    } else {
      toast('user unauthorized', {
        autoClose: 2000,
      })
    }
  }
  return (
    <>
      {/*       <ul>
        {sortedBlogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
          </li>
        ))}
      </ul> */}
      {/* 
<Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
*/}

      {sortedBlogs.map((blog) => {
        return (
          <ul key={blog.id}>
            <Blog blog={blog} blogs={sortedBlogs} />
            <button onClick={() => addLike(blog)}>like</button>

            {user === null || user.id !== blog.user.id ? (
              <div>delete unauthorized</div>
            ) : (
              <button onClick={() => removeBlog(blog)}>delete</button>
            )}
          </ul>
        )
      })}
    </>
  )
}

export default Blogs

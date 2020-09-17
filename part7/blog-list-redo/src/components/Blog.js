import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteYourBlog } from '../reducers/blogsReducer'

import { fetchBlog } from '../reducers/blogReducer'

import { toast } from 'react-toastify'

const Blog = ({ match }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const { id } = match.params
console.log('useEffect blog page')
  
    dispatch(fetchBlog(id))
  }, [dispatch, match])

  const blog = useSelector((state) => {
      return state.blog.blog})
  const loading = useSelector((state) => ({
    blog: state.blog.loading,
  }))
  const hasErrors = useSelector((state) => ({
    blog: state.blog.hasErrors,
  }))

  const addLike = () => {
    dispatch(likeBlog(blog))
    toast(`You added 1 like to "${blog.title}". `, {
      autoClose: 2000,
    })
    dispatch(fetchBlog(blog.id))
  } 
  
  /*   const removeBlog = (blog) => {
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
        history.push('/blogs')
      }
    } else {
      toast('user unauthorized', {
        autoClose: 2000,
      })
    }
  } */

  return (
    <section>
     <h2>{blog.title}</h2>
      <div>
        Author: {blog.author}
        <br />
        Info: {blog.url}
        <br />
        Likes: {blog.likes}
      </div>
      <button onClick={addLike}>Add like</button>
    </section>
  )
}

export default Blog

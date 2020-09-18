import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlog } from '../reducers/blogReducer'
import { likeBlog, deleteYourBlog } from '../reducers/blogsReducer'

import { toast } from 'react-toastify'

const Blog = ({ match }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const { id } = match.params

    dispatch(fetchBlog(id))
  }, [dispatch, match])
  const blogs = useSelector((state) => state.blogs.blogs)
  console.log('blogs from Blog componenet', blogs) //like + 1 immediatley
  const blog = useSelector((state) => state.blog.blog)
  console.log('blog from Blog component', blog) //like + 1 after refresh
  const auth = useSelector((state) => state.auth)

  const blogLoading = useSelector((state) => state.blog.loading)
  console.log('blog loading', blogLoading)

  const blogsLoading = useSelector((state) => state.blogs.loading)
  console.log('blogs loading', blogsLoading)

  const addLike = () => {
    if (!blogLoading) {
      console.log('blog???', blog)

      dispatch(likeBlog(blog))
      return dispatch(fetchBlog(blog.id))
    } else {
      return null
    } /*    


toast(`You added 1 like to "${blog.title}". `, {
      autoClose: 2000,
    }) 
    const id = blog.id
    const thisBlog = blogs.filter(b => b.id === id ? b : null )
    */
    // dispatch(fetchBlog(blog.id))
  }
  const blogObject = {
    id: blog.id,
    token: auth.token,
  }
  /*   const removeBlog = () => {
    if (auth === null) {
      toast('user null unauthorized', {
        autoClose: 2000,
      })
      return
    } else if (auth.id === blog.user.id) {
      if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
        dispatch(deleteYourBlog(blogObject))
        toast(`Your blog, "${blog.title}", has been deleted. `, {
          autoClose: 2000,
        })
      }
    } else {
      toast('user unauthorized', {
        autoClose: 2000,
      })
    }
  } */

  return (
    <section>
      <h2>
        {blog.title} Likes: {blog.likes}{' '}
      </h2>
      <button onClick={addLike}>Add like</button>
      {/*     {loading ? (
        <p>Loading blog...</p>
      ) : (
        <>
          <h2>{blog.title}</h2>
          <div>
            Author: {blog.author}
            <br />
            Info: {blog.url}
            <br />
            Likes: {blog.likes}
          </div>
          <button onClick={addLike}>Add like</button>
          {auth.id === blog.user.id ? (
            <button onClick={removeBlog}>Delete</button>
          ) : (
            <></>
          )}
        </>
      )} */}
    </section>
  )
}

export default Blog

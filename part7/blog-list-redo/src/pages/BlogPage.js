import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteYourBlog } from '../reducers/blogsReducer'

import { fetchBlog } from '../reducers/blogReducer'
//import { fetchComments } from '../actions/commentsActions'

//import { Comment } from '../components/Comment'
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
  //const comments = useSelector((state) => state.comments.comments)
  const loading = useSelector((state) => ({
    blog: state.blog.loading,
   // comments: state.comments.loading,
  }))
  const hasErrors = useSelector((state) => ({
    blog: state.blog.hasErrors,
  //  comments: state.comments.hasErrors,
  }))

  const addLike = () => {
    dispatch(likeBlog(blog))
    toast(`You added 1 like to "${blog.title}". `, {
      autoClose: 2000,
    })
    dispatch(fetchBlog(blog.id))
  } 
/*   const renderComments = () => {
    if (loading.comments) return <p>Loading comments...</p>
    if (hasErrors.comments) return <p>Unable to display comments.</p>

    return comments.map((comment) => (
      <Comment key={comment.id} comment={comment} />
    ))
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

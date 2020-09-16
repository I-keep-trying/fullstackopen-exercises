import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchBlog } from '../reducers/blogReducer'
//import { fetchComments } from '../actions/commentsActions'

import { BlogItem } from '../components/BlogItem'
//import { Comment } from '../components/Comment'

const Blog = ({ match }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const { id } = match.params

  //  dispatch(fetchComments(id))
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

  const renderBlog = () => {
    if (loading.blog) return <p>Loading blog...</p>
    if (hasErrors.blog) return <p>Unable to display blog.</p>

    return <BlogItem blog={blog} />
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
      {renderBlog()}
    </section>
  )
}

export default Blog

import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
} from 'react-router-dom'
import { likeBlog, deleteYourBlog } from '../reducers/blogsReducer'
import { toast } from 'react-toastify'

export const BlogItem = ({ match }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const { id } = match.params
    console.log('id', id)
  }, [dispatch, match])

/*   const addLike = () => {
    dispatch(likeBlog(blog))
    toast(`You added 1 like to "${blog.title}". `, {
      autoClose: 2000,
    })

  } */

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
    <div>
      {/*  <h2>{blog.title}</h2>
      <div>
        Author: {blog.author}
        <br />
        Info: {blog.url}
        <br />
        Likes: {blog.likes}
      </div>
      <button onClick={addLike}>Add like</button> */}
    </div>
  )
}

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchBlog } from '../reducers/blogReducer'
import { likeBlog, deleteYourBlog } from '../reducers/blogsReducer'
import blogService from '../services/blogs'
import { toast } from 'react-toastify'
import NewComment from '../components/AddComment'

const BlogList = ({ match }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    const { id } = match.params

    dispatch(fetchBlog(id))
  }, [dispatch, match])

  const loading = useSelector((state) => state.blog.loading)
  const loadingAll = useSelector((state) => state.blogs.loading)

  const blog = useSelector((state) => state.blog.blog)
  const blogUser = useSelector((state) => state.blog.blog.user)
  const auth = useSelector((state) => state.auth)

  const addLike = () => {
    if (!loading) {
      dispatch(likeBlog(blog))
      toast(`You added a like to "${blog.title}". `, { autoClose: 2000 })
      return blog
    } else {
      return null
    }
  }

  const removeBlog = async () => {
    window.confirm(`Are you sure you want to delete "${blog.title}"? `)
    try {
      await blogService.deleteBlog(blog, auth).then((response) => {
        dispatch(deleteYourBlog(blog, auth, response))
        toast(`${blog.title} has been deleted. `, { autoClose: 1000 })
        history.push('/blogs')
      })
    } catch (err) {
      console.log('delete err', err)
    }
  }

  const renderBlog = () => {
    return (
      <div className="container">
        <div>
          <div className="form-group">
            <div>
              <a href={blog.url} >{blog.title}</a>
            </div>
            <div>
              <div>Added by: {blogUser.name}</div>
            </div>
          </div>

          <div className="form-group">
            Likes: {blog.likes}{' '}
            <button
              className="btn btn-secondary"
              type="submit"
              onClick={addLike}
            >
              Like
            </button>
          </div>
          <div>
            {auth.id !== blogUser.id ? (
              <></>
            ) : (
              <div className="form-group">
                Delete this blog:{' '}
                <button
                  className="btn btn-secondary"
                  type="submit"
                  onClick={removeBlog}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <div key={blog.id}>
            <div>
              <NewComment />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {loading || loadingAll ? (
        <div>Loading...</div>
      ) : (
        <div>{renderBlog()} </div>
      )}
    </div>
  )
}

export default BlogList

/* 
 // for commments dates:

  const myDate = new Date
const humanReadableDate = `${myDate.getFullYear()}-${myDate.getMonth()}-${myDate.getDay()}`
console.log(humanReadableDate)

// returns 2020-8-2
  */

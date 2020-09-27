import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createBlog, fetchBlogs } from '../reducers/blogsReducer'
import blogService from '../services/blogs'
import { toast } from 'react-toastify'

const NewBlog = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const auth = useSelector((state) => state.auth)

  const addBlog = async (e) => {
    e.preventDefault()
    const newBlog = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
      likes: 0,
      auth,
    }
    e.target.title.value = ''
    e.target.author.value = ''
    e.target.url.value = ''

    blogService.create(newBlog).then((response) => {
      dispatch(createBlog(response))
      toast(`A new blog, "${response.title}", has been added. `, {
        autoClose: 2000,
      })
      history.push(`/blogs/${response.id}`)
    })
    blogService.getAll().then((blogs) => {
      return dispatch(fetchBlogs(blogs))
    })
  }

  return (
    <div className="card">
      <div className="card-container">
        <h2>Add A Blog</h2>
        <form onSubmit={addBlog}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Title
              </span>
            </div>
            <input className="form-control" name="title" />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Author
              </span>
            </div>
            <input className="form-control" name="author" />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Url
              </span>
            </div>
            <input className="form-control" name="url" />
          </div>

          <div className="form-group">
            <button className="btn btn-secondary btn-block" type="submit">
              add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewBlog

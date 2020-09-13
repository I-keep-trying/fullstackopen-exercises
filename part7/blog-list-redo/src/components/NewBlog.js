import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { toast } from 'react-toastify'

const NewBlog = () => {
  const dispatch = useDispatch()

  const addBlog = (e) => {
    e.preventDefault()
    const newBlog = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
      likes: 0,
      // user,
    }
    e.target.title.value = ''
    e.target.author.value = ''
    e.target.url.value = ''

    blogService.create(newBlog).then((response) => {
      dispatch(createBlog(response))
      toast(`A new blog, "${response.title}", has been added. `, {
        autoClose: 2000,
      })
    })
  }

  return (
    <form onSubmit={addBlog}>
      Title: <input name="title" />
      <br />
      Author: <input name="author" />
      <br />
      Url: <input name="url" />
      <br />
      <button type="submit">add</button>
    </form>
  )
}

export default NewBlog

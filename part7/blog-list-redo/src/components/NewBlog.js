import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'

const NewBlog = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const addBlog = (e) => {
    e.preventDefault()
    const newBlog = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
      likes: 0,
      user,
    }
    e.target.title.value = ''
    e.target.author.value = ''
    e.target.url.value = ''

    console.log('create new blog object from component', newBlog)
    blogService.create(newBlog).then((response) => {
      dispatch(createBlog(response))
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

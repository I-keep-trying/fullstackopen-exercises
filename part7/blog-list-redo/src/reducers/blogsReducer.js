//import blogService from '../services/blogs'
import axios from 'axios'

export const initialState = {
  loading: false,
  hasErrors: false,
  posts: [],
}

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZE': {
      return { ...state, loading: true }
    }
    case 'GET_BLOGS_SUCCESS': {
      console.log('GET_BLOG_SUCCESS action.data', action)
      return { blogs: action.payload, loading: false, hasErrors: false }
    }
    case 'GET_BLOGS_FAILURE':
      return { ...state, loading: false, hasErrors: true }
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'ADD_LIKE': {
      const id = action.blog.id
      return state.map((blog) => (blog.id !== id ? blog : action.blog))
    }
    case 'DELETE': {
      const id = action.blog.id
      const filteredBlogs = state.filter((blog) =>
        blog.id !== id ? blog : null
      )
      return filteredBlogs
    }

    default:
      return state
  }
}

export const initializeBlogs = () => {
  return {
    type: 'INITIALIZE'
  }
}

//blogReducer.js

export const getBlogsSuccess = (blogs) => ({
  type: 'GET_BLOGS_SUCCESS',
  payload: blogs,
})

export const getBlogsFailure = () => ({type: 'GET_BLOGS_FAILURE'})

export const fetchBlogs = () => {
  return async (dispatch) => {
    dispatch(initializeBlogs())

    try {
      const response = await axios.get(`/api/blogs/`)
      console.log('axios response', response)

      const data = await response.data
      console.log('axios response', data)

      dispatch(getBlogsSuccess(data))
    } catch (error) {
      console.log('fetchBlog error', error)
    }
  }
}

export const createBlog = (data) => {
  return {
    type: 'NEW_BLOG',
    data,
  }
}

// blogReducer.js
/* export const likeBlog = (blog) => {
  const likeBlog = { ...blog, likes: blog.likes + 1 }
  blogService.update(likeBlog)
  return {
    type: 'ADD_LIKE',
    blog: likeBlog,
  }
}

export const deleteYourBlog = (blog) => {
  blogService.deleteBlog(blog)
  return {
    type: 'DELETE',
    blog,
  }
} */

export default blogsReducer

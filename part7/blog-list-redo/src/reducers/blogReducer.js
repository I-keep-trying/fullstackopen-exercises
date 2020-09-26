import axios from 'axios'

export const initialState = {
  loading: true,
  hasErrors: false,
  blog: {},
}

export default function blogReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_BLOG':
      return { ...state, loading: true }
    case 'GET_BLOG_SUCCESS': {
      const blog = action.payload
      return { ...state, blog, loading: false, hasErrors: false }
    }
    case 'GET_BLOG_FAILURE':
      return { ...state, loading: false, hasErrors: true }
    case 'ADD_LIKE': {
      const blog = action.blog
      return { ...state, blog, loading: false, hasErrors: false }
    }
    case 'ADD_COMMENT': {
      const blog = action.blog
      return { ...state, blog, loading: false, hasErrors: false }
    }
    case 'LOGOUT': {
      return (state = initialState)
    }
    default:
      return state
  }
}

export const getBlog = () => ({ type: 'GET_BLOG' })
export const getBlogSuccess = (blog) => ({
  type: 'GET_BLOG_SUCCESS',
  payload: blog,
})
export const getBlogFailure = () => ({ type: 'GET_BLOG_FAILURE' })

export function fetchBlog(id) {
  return async (dispatch) => {
    dispatch(getBlog())

    try {
      const response = await axios.get(`/api/blogs/${id} `)
      const data = await response.data
      dispatch(getBlogSuccess(data))
    } catch (error) {
      dispatch(getBlogFailure())
    }
  }
}

export const like1Blog = (blog) => {
  const likeBlog = { ...blog, likes: blog.likes + 1 }
  return {
    type: 'ADD_LIKE',
    blog: likeBlog,
  }
}

export const addNewComment = (blog) => {
  return {
    type: 'ADD_COMMENT',
    blog,
  }
}

export const logoutBlog = (blog) => {
  return {
    type: 'LOGOUT',
  }
}

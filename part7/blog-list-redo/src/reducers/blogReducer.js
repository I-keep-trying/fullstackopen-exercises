import blogService from '../services/blogs'
import axios from 'axios'

export const initialState = {
  loading: true,
  hasErrors: false,
  blog: {},
}

export default function blogReducer(state = initialState, action) {
  console.log('blogReducer state', state)
  switch (action.type) {
    case 'GET_BLOG':
      return { ...state, loading: true }
    case 'GET_BLOG_SUCCESS': {
      console.log('action.payload', action)
      return { blog: action.payload, loading: false, hasErrors: false }
    }
    case 'GET_BLOG_FAILURE':
      return { ...state, loading: false, hasErrors: true }
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
      const response = await blogService.getOne(id)
      console.log('api response', response)
      const data = await response

      dispatch(getBlogSuccess(data))
    } catch (error) {
      dispatch(getBlogFailure())
    }
  }
}

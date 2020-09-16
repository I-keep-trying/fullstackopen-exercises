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
      const response = await axios.get(`/api/blogs/${id} `)

      const data = await response.data
      dispatch(getBlogSuccess(data))
    } catch (error) {
      dispatch(getBlogFailure())
    }
  }
}

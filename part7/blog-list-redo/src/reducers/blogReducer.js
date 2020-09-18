import axios from 'axios'
import blogService from '../services/blogs'

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
      console.log('{blog}',blog)
      return { ...state, blog, loading: false, hasErrors: false }
    }
    case 'GET_BLOG_FAILURE':
      return { ...state, loading: false, hasErrors: true }
    /*     case 'ADD_LIKE': {
      console.log('ADD_LIKE action', action)
      console.log('ADD_LIKE state', state)
      return { blog: action.blog, loading: false, hasErrors: false }
    } */
    /*       case 'DELETE': {
        const id = action.blog.id
        const filteredBlogs = state.blogs.filter((blog) => {
          return blog.id !== id ? blog : null
        })
        return { blogs: filteredBlogs, loading: false, hasErrors: false }
      } */
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
  console.log('fetchBlog id', id)
  return async (dispatch) => {
    dispatch(getBlog())

    try {
      const response = await axios.get(`/api/blogs/${id} `)
console.log('fetch response',response.data)
      const data = await response.data
      dispatch(getBlogSuccess(data))
    } catch (error) {
      dispatch(getBlogFailure())
    }
  }
}

/* export const likeBlog = (blog) => {
  console.log('blog object from reducer, likeBlog', blog)
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
}
 */

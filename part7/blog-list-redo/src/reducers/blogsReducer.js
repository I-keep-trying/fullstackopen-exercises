import blogService from '../services/blogs'
import axios from 'axios'

export const initialState = {
  loading: true,
  hasErrors: false,
  blogs: [],
}

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZE': {
      return { ...state, loading: true }
    }
    case 'GET_BLOGS_SUCCESS': {
      return { blogs: action.payload, loading: false, hasErrors: false }
    }
    case 'GET_BLOGS_FAILURE':
      return { ...state, loading: false, hasErrors: true }
    case 'NEW_BLOG': {
      const newData = action.data.data
      const newBlog = {
        author: newData.author,
        id: newData.id,
        likes: newData.likes,
        title: newData.title,
        url: newData.url,
        user: {
          id: newData.user.id,
          name: newData.user.name,
          username: newData.user.username,
        },
      }
      const id = newBlog.id
      const updatedBlogs = state.blogs.map((blog) =>
        blog.id !== id ? blog : newBlog
      )
      return { blogs: updatedBlogs, loading: false, hasErrors: false }
    }
    case 'ADD_LIKE': {
      const id = action.blog.id
      const updatedBlogs = state.blogs.map((blog) =>
        blog.id !== id ? blog : action.blog
      )
      return {
        blogs: updatedBlogs,
        loading: false,
        hasErrors: false,
      }
    }
    case 'DELETE': {
      const id = action.blog.id
      const filteredBlogs = state.blogs.filter((blog) => {
        return blog.id !== id ? blog : null
      })
      return { blogs: filteredBlogs, loading: false, hasErrors: false }
    }
    default:
      return state
  }
}

export const initializeBlogs = () => ({
  type: 'INITIALIZE',
})

export const getBlogsSuccess = (blogs) => ({
  type: 'GET_BLOGS_SUCCESS',
  payload: blogs,
})

export const getBlogsFailure = () => ({ type: 'GET_BLOGS_FAILURE' })

export const fetchBlogs = () => {
  return async (dispatch) => {
    dispatch(initializeBlogs())

    try {
      const response = await axios.get(`/api/blogs/`)

      const data = await response.data
      dispatch(getBlogsSuccess(data))
    } catch (error) {
      console.log('fetchBlog error', error)
    }
  }
}

/* export const getUpdatedUsers = (data) => {
  return async dispatch => {
    try {
dispatch(usersService.getAllUsers())
    }
  }
} */

export const createBlog = (data) => {
  return {
    type: 'NEW_BLOG',
    data: { data },
  }
}

export const likeBlog = (blog, blogs) => {
  const likeBlog = { ...blog, likes: blog.likes + 1 }
  blogService.update(likeBlog)
  return {
    type: 'ADD_LIKE',
    blog: likeBlog,
    blogs,
  }
}

export const deleteYourBlog = (blog, auth, response) => {
  console.log('deleteYourBlog action creator', blog, '...auth...', auth)
  console.log('delete response action creator', response)
  //blogService.deleteBlog(blog, auth)
  return {
    type: 'DELETE',
    blog,
  }
}

export default blogsReducer

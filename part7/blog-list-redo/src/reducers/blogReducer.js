import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'ADD_LIKE': {
      const id = action.blog.id
      return state.map((blog) => (blog.id !== id ? blog : action.blog))
    }

    default:
      return state
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INITIALIZE',
    data: blogs,
  }
}

export const createBlog = (data) => {
  return {
    type: 'NEW_BLOG',
    data,
  }
}

export const likeBlog = (blog) => {
  const likeBlog = { ...blog, likes: blog.likes + 1 }
  blogService.update(likeBlog)
  return {
    type: 'ADD_LIKE',
    blog: likeBlog,
  }
}



export default blogReducer

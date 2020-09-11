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
    case 'DELETE': {
      const id = action.blog.id
      console.log('delete blog reducer', action.blog)
      console.log('delete blog state', state)
      const filteredBlogs = state.filter((blog) =>
        blog.id !== id ? blog : null
      )
      console.log('filteredBlogs', filteredBlogs)
      return filteredBlogs
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
 //   blogService.create(newBlog)
console.log('create blog action',data)
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

export const deleteYourBlog = (blog) => {
  console.log('blog action', blog)
  blogService.deleteBlog(blog)
  return {
    type: 'DELETE',
    blog,
  }
}

export default blogReducer

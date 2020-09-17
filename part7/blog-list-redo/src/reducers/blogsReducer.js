import blogService from '../services/blogs'
import axios from 'axios'

export const initialState = {
  loading: false,
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
      console.log('NEW_BLOG', action.data.data)
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

      // return [...state.blogs, newBlog] // this no longer works, says 'not iterable' wtf
      return state.blogs.concat(newBlog)
    }
    case 'ADD_LIKE': {
      console.log('add like action', action.blog)
      const id = action.blog.id
      console.log('add like state', state)
      return state.blogs.map((blog) => (blog.id !== id ? blog : action.blog))
    }
    /*     case 'DELETE': {
      const id = action.blog.id
      const filteredBlogs = state.blogs.filter((blog) =>
        blog.id !== id ? blog : null
      )
      return filteredBlogs
    } */

    default:
      return state
  }
}

export const initializeBlogs = () => ({
  type: 'INITIALIZE',
})

//blogReducer.js

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
      //const response = await blogService.getAll()
      const data = await response.data
      dispatch(getBlogsSuccess(data))
    } catch (error) {
      console.log('fetchBlog error', error)
    }
  }
}

export const createBlog = (data) => {
  console.log('reducer action creator', data)
  /* 
  author: "fasdsaf"
id: "5f638cc8a96804245c416f01"
likes: 0
title: "afdssadf"
url: "fasddsfa"
user:
blogs: (17) ["5f3ea774fd1f7135b834e725", "5f58f31cfb73ff084cc6ed94", ...]
id: "5f343d0090c6c131a0729b9f"
name: "test"
username: "Test_User"
  */
  return {
    type: 'NEW_BLOG',
    data: { data },
  }
}

// blogReducer.js
export const likeBlog = (blog) => {
  const likeBlog = { ...blog, likes: blog.likes + 1 }
  blogService.update(likeBlog)
  return {
    type: 'ADD_LIKE',
    blog: likeBlog,
  }
}

/* export const deleteYourBlog = (blog) => {
  blogService.deleteBlog(blog)
  return {
    type: 'DELETE',
    blog,
  }
} */

export default blogsReducer

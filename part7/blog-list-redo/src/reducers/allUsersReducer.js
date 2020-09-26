import axios from 'axios'

const initialState = {
  loading: false,
  hasErrors: false,
  users: [],
}

const allUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZE_USERS': {

      return { ...state, loading: true }
    }
    case 'GET_USERS_SUCCESS': {


      return { users: action.data, loading: false }
    }
    case 'GET_USERS_FAILURE':
      return { ...state, loading: false, hasErrors: true }

    case 'ADD_BLOG': {
      /* 
      author: "ffffffffffff"
id: "5f68fc77f76be70898e947fa"
likes: 0
title: "ffffffffffffff"
url: "ffffffffff"
user: {blogs: Array(4), username: "Test_User", name: "test", id: "5f67da48f76be70898e947e5"}
      */
      /* 
      [0: {blogs: Array(0), username: "Robert_C_Martin", name: "Robert C. Martin", id: "5f3411bee7136c2c942e82b2"}
1: {blogs: Array(0), username: "Edsger_W_Dijkstra", name: "Edsger W. Dijkstra", id: "5f3411ede7136c2c942e82b3"}
2: {blogs: Array(0), username: "cupcake", name: "cupcake", id: "5f3412bb03204f0f6c3d3007"}
3: {blogs: Array(0), username: "Wendy_Woberts", name: "Wendy Woberts", id: "5f3412df73cdcf0facb13f2b"}
4: {blogs: Array(2), username: "Michael_Chan", name: "Michael Chan", id: "5f341adb13d237244c477042"}
5: {blogs: Array(3), username: "Test_User", name: "test", id: "5f67da48f76be70898e947e5"}]
      */

      return state
    }

    default:
      return state
  }
}

export const initializeUsers = () => ({
  type: 'INITIALIZE_USERS',
})

export const getUsersSuccess = (users) => {
  return {
    type: 'GET_USERS_SUCCESS',
    data: users,
  }
}

export const getUsersFailure = () => ({ type: 'GET_USERS_FAILURE' })

export const addBlogToUser = (blog) => {
  return {
    type: 'ADD_BLOG',
    blog,
  }
}

export const fetchUsers = (id) => {
  return async (dispatch) => {
    dispatch(initializeUsers())

    try {
      const response = await axios.get(`/api/users `)

      const data = await response.data
      dispatch(getUsersSuccess(data))
    } catch (error) {
      console.log('error from allUsersReducer', error)
    }
  }
}

export default allUsersReducer

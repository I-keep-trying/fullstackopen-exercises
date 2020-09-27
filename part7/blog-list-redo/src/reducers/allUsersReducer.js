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
      return state
    }
    case 'REGISTER': {

      return {
        ...state,
        users: [...state.users, action.newUser],
        loading: false,
      }
    }
    case 'REGISTRATION_FAILURE': {
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

export const registerUser = (newUser) => {
  return { type: 'REGISTER', newUser }
}

export const registerFail = (newUser) => {
  return {
    type: 'REGISTRATION_FAILURE',
    newUser,
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

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

import axios from 'axios'

export const initialState = {
  loading: true,
  hasErrors: false,
  user: {},
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_USER': {
      console.log('GET_USER action', action, 'state ....', state)
      return { ...state, loading: true }
    }
    case 'GET_USER_SUCCESS': {
      return { user: action.data, loading: false, hasErrors: false }
    }
    case 'GET_USER_FAILURE':
      return { ...state, loading: false, hasErrors: true }

    default:
      return state
  }
}

export const getUser = () => ({ type: 'GET_USER' })
export const getUserSuccess = (user) => ({
  type: 'GET_USER_SUCCESS',
  data: user,
})
export const getUserFailure = () => ({ type: 'GET_USER_FAILURE' })

export function fetchUser(id) {
  return async (dispatch) => {
    dispatch(getUser())

    try {
      const response = await axios.get(`/api/users/${id} `)

      const data = await response.data
      dispatch(getUserSuccess(data))
    } catch (error) {
      dispatch(getUserFailure())
    }
  }
}

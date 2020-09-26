const initialState = {
  id: '',
  name: '',
  token: '',
  username: '',
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZE_AUTH': {
      if (action.auth === null) {
        return state = initialState
      }
      const auth = JSON.parse(action.auth)
      return auth
    }
    case 'LOG_IN_SUCCESS': {
      return action.auth.data
    }
    case 'LOG_IN_FAIL': {
      return { ...state, error: action.err.message }
    }
    case 'LOG_OUT': {
      return (state = initialState)
    }
    default:
      return state
  }
}

export const initializeAuth = (auth) => {
  return {
    type: 'INITIALIZE_AUTH',
    auth,
  }
}

export const loginUser = (auth) => {
  return {
    type: 'LOG_IN_SUCCESS',
    auth,
  }
}

export const loginUserFail = (err) => {
  return {
    type: 'LOG_IN_FAIL',
    err,
  }
}

export const logoutUser = () => {
  return {
    type: 'LOG_OUT',
  }
}

export default authReducer

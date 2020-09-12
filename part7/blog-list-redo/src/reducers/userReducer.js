const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN': {
      return action.user
    }
    case 'LOG_OUT': {
      console.log('LOG_OUT state', state)
      console.log('LOG_OUT action', action)
      return state
    }

    default:
      return state
  }
}

export const loginUser = (user) => {
  console.log('login user action', user)
  return {
    type: 'LOG_IN',
    user,
  }
}

export const logoutUser = (user) => {
  console.log('logout user action', user)
  return {
    type: 'LOG_OUT',
    user,
  }
}

export default userReducer

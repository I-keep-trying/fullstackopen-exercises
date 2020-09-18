const initialState =
  JSON.parse(window.localStorage.getItem('loggedInBlogAppUser')) || null

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN': {
      return action.user
    }
    case 'LOG_OUT': {
      return null
    }
    default:
      return state
  }
}

export const loginUser = (user) => {
  return {
    type: 'LOG_IN',
    user,
  }
}

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('loggedInBlogAppUser')

  dispatch({
    type: 'LOG_OUT',
  })
}

export default authReducer

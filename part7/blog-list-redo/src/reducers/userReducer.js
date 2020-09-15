const initialState =
  JSON.parse(window.localStorage.getItem('loggedInBlogAppUser')) || null

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN': {
      console.log(
        'local storage',
        JSON.parse(window.localStorage.getItem('loggedInBlogAppUser'))
      )
      /* 
      id: "5f343d0090c6c131a0729b9f"
name: "test"
token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3RfVXNlciIsImlkIjoiNWYzNDNkMDA5MGM2YzEzMWEwNzI5YjlmIiwiaWF0IjoxNjAwMTg4Njk5fQ.g2INcdamJcmwtSSqzhEQynvaJXNFvvS1qAwyvqdHspw"
username: "Test_User"
      */
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

export default userReducer

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN': {
        //console.log('login user action', action.user)
        //{token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…Y", 
        //username: "Test_User", name: "test", id: "5f343d0090c6c131a0729b9f"}
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
    console.log('login user action', user)
  return {
    type: 'LOG_IN',
    user,
  }
}

export const logoutUser = (user) => {
    console.log('logoutUser user action', user)
    console.log('window.local ',window.localStorage.getItem('loggedInBlogAppUser'))
  return {
    type: 'LOG_OUT',
    user,
  }
}

export default userReducer

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN': {
        //console.log('login user action', action.user)
        //{token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…Y", 
        //username: "Test_User", name: "test", id: "5f343d0090c6c131a0729b9f"}
      return action.user
    }
    case 'GET_USER': {
        console.log('get logged in user action', action.user)
        /* 
        user:
id: "5f343d0090c6c131a0729b9f"
name: "test"
token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3RfVXNlciIsImlkIjoiNWYzNDNkMDA5MGM2YzEzMWEwNzI5YjlmIiwiaWF0IjoxNTk5OTMzNDEzfQ.asDIafB4Yw9frPME73mJwzAeku4GEj8QIKAMk8LftRw"
username: "Test_User"
        */
const user = {

}
        return action.user
      }
    case 'LOG_OUT': {

      return state
    }

    default:
      return state
  }
}

export const getUser = user => {
    console.log('login user action', user)
  console.log('window.local ',window.localStorage.getItem('loggedInBlogAppUser'))
  return {
    type: 'GET_USER',
    user,
  }
}

export const loginUser = (user) => {

  return {
    type: 'LOG_IN',
    user,
  }
}

export const logoutUser = (user) => {
  return {
    type: 'LOG_OUT',
    user,
  }
}

export default userReducer

const allUsersReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS': {
     // console.log('get users', action)
      return action.data
    }

    default:
      return state
  }
}

export const getUsers = (users) => {
  return {
    type: 'GET_USERS',
    data: users,
  }
}

export default allUsersReducer

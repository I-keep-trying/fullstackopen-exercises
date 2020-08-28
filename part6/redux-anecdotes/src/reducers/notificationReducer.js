const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      return action.notification
    }
    case 'UNSET_NOTIFICATION': {
      return null
    }
    default:
      return state
  }
}

export const notificationChange = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
      time,
    })
    setTimeout(() => {
      dispatch({
        type: 'UNSET_NOTIFICATION',
      })
    }, time * 200)
  }
}

export default notificationReducer

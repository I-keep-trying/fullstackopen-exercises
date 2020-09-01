let timeoutId
const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      return action
    }
    case 'UNSET_NOTIFICATION': {
      return null
    }
    default:
      return state
  }
}

export const notificationChange = (notification, time) => {
  return dispatch => {
    clearTimeout(timeoutId)
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
      time,
      timeoutId,
    })
    timeoutId = setTimeout(() => {
      dispatch({
        type: 'UNSET_NOTIFICATION',
        notification,
        timeoutId,
      })
    }, time)
  }
}

export default notificationReducer

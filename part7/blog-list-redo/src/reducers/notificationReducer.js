let timeoutId
const notificationReducer = (state = null, action) => {
  console.log('hello reducer') //why is this called

  switch (action.type) {
    case 'SET_NOTIFICATION': {
      console.log('notification reducer action',action)//but not this????

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
console.log('notification reducer',notification)
console.log('notification reducer time',time)

  return (dispatch) => {
/*     dispatch({
      type: 'SET_NOTIFICATION',
      notification
    }) */
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

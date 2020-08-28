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

export const notificationChange = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}

export const dismissNotificationChange = notification => {
  return {
    type: 'UNSET_NOTIFICATION',
    notification,
  }
}

export default notificationReducer

import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => {
    if (state.notifications === null) {
      return null
    }
    return state.notifications.notification
  })

  return (
    <div className={notification === null ? 'none' : 'info'}>
      {notification}
    </div>
  )
}

export default Notification

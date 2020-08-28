import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => {
    return state.notifications
  })

  return (
    <div className={notification === null ? 'none' : 'info'}>
      {notification}
    </div>
  )
}

export default Notification

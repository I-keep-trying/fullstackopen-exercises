import React from 'react'
//import { useSelector } from 'react-redux'

const Notification = ({message}) => {
 // console.log('notification message',message)


  return (
    <div className={message === null || message.length === 0 ? 'none' : 'info'}>
      {message}
    </div>
  )
}

export default Notification

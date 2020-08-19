import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  } else if (message.type === 'error') {
    return <div className="error">{message.text} </div>
  } else if (message.type === 'info') {
    return <div className="info">{message.text} </div>
  }
}

export default Notification

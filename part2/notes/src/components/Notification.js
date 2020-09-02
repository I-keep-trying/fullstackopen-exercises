import React from 'react'
import {ToastContainer, toast } from 'react-toastify'
import '../ReactToastify.css'

const Notification = ({ message }) => {
  const notify = () => {

    if (message === null) {
      return null
    } else if (message.type === 'error') {
      toast.error(message.text, { toastId: Date.now() })
    } else if (message.type === 'info') {
      toast(message.text, { toastId: Date.now() })
    }
  }
  return <ToastContainer>{notify()}</ToastContainer>
}

export default Notification

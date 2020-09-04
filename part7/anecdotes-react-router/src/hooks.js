import React, { useState } from 'react'

export const useField = (type) => {
  const initialInput = {
    content: '',
    author: '',
    info: '',
  }
  const [userInput, setUserInput] = useState(initialInput)

  const onChange = (e) => {
    const { name, value } = e.target
    setUserInput({ ...userInput, [name]: value })
  }

  let inputKeys = Object.keys(userInput)

  const inputValues = Object.values(userInput)

  return {
    type,
    userInput,
    onChange,
    inputKeys,
    inputValues,
  }
}


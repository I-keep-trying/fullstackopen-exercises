import { useState } from 'react'

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

  const onReset = (e) => {
    e.preventDefault()
    setUserInput(initialInput)
  }

  return {
    type,
    userInput,
    onChange,
    inputKeys,
    inputValues,
    onReset,
  }
}

export const useFormInput = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  console.log('value', value)
  const onReset = (e) => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    onReset,
  }
}

export const useForm = (callback) => {
  const [values, setValues] = useState({})

  const handleSubmit = (event) => {
    if (event) event.preventDefault()
    callback()
  }
  console.log('values', values)

  const onChange = (event) => {
    event.persist()
    console.log('event.target.value', event.target.value)

    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }))
  }
  
  return {
    onChange,
    handleSubmit,
    values,
    callback,
  }
}

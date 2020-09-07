import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

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

  const handleChange = (event) => {
    event.persist()
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }))
  }

  return {
    handleChange,
    handleSubmit,
    values,
  }
}

import React, { useState } from 'react'

export const useFormInput = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = (e) => {
      setValue(e.target.reset())
  }
  return {
    type,
    value,
    onChange,
    onReset
  }
}

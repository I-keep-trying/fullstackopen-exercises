import React, { useState } from 'react'
import { useField } from './hooks.js'
import Form from './Form2'

const App = () => {
  const name = useField('text')
  const born = useField('date')
  const height = useField('number')

  const resetForm = (e) => {
    e.preventDefault()
    name.onReset()
    born.onReset()
    height.onReset()
  }
  return (
    <div>
      <form>
        name:
        <input {...name} />
        <br />
        birthdate:
        <input
          type={born.type}
          value={born.value}
          onChange={born.onChange}
          onReset={born.onReset}
        />
        <br />
        height:
        <input
          type={height.type}
          value={height.value}
          onChange={height.onChange}
          onReset={height.onReset}
        />
        <button onClick={resetForm}>reset</button>
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
      <hr />
      <Form />
    </div>
  )
}

export default App

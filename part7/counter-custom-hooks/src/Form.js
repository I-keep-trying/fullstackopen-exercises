import React, { useState } from 'react'

const Form = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [height, setHeight] = useState('')
  return (
    <div>
      <h2>User form</h2>
      <div>
        <form>
          name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <br />
          birthdate:
          <input
            type="date"
            value={born}
            onChange={(event) => setBorn(event.target.value)}
          />
          <br />
          height:
          <input
            type="number"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
          />
        </form>
        <div>
          {name} {born} {height}
        </div>
      </div>
    </div>
  )
}

export default Form

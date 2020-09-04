import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const useFormInput = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const CreateNew = ({ anecdotes, setAnecdotes, setMessage, setLocation }) => {
  let history = useHistory()

  useEffect(() => {
    setLocation(history.location.pathname)
  }, [setLocation, history])

  const content = useFormInput('text')
  const author = useFormInput('text')
  const info = useFormInput('text')

  const anecdote = {
    content: content.value,
    author: author.value,
    info: info.value,
    votes: 0,
    id: Date.now(),
  }
  console.log('addNew',anecdote)

  const addNew = (e) => {
    e.preventDefault()
    setAnecdotes([...anecdotes, anecdote])
    history.push('/anecdotes')
    setMessage({
      text: `A new anecdote "${anecdote.content}" was created!`,
      type: 'info',
    })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Add Anecdote</h2>
      <form onSubmit={addNew}>
        <input
          type={content.type}
          value={content.value}
          onChange={content.onChange}
        />
        <br />
        <input
          type={author.type}
          value={author.value}
          onChange={author.onChange}
        />
        <br />
        <input type={info.type} value={info.value} onChange={info.onChange} />
        <br />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default CreateNew

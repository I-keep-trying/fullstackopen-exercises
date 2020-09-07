import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useFormInput } from '../hooks'

const CreateNew = ({ anecdotes, setAnecdotes, setMessage, setLocation }) => {
  let history = useHistory()

  useEffect(() => {
    setLocation(history.location.pathname)
  }, [setLocation, history])

  const content = useFormInput('text')
  const author = useFormInput('text')
  const info = useFormInput('text')

  const resetForm = (e) => {
    e.preventDefault()

    content.onReset()
    author.onReset()
    info.onReset()
  }
  const anecdote = {
    
    content: content.value,
    author: author.value,
    info: info.value,
  }

  const addNew = (e) => {
    e.preventDefault()
    const newAnecdote = { ...anecdote, votes: 0, id: Date.now() }
    setAnecdotes([...anecdotes, newAnecdote])
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
      <form>
        <input {...content} />
        <br />
        <input {...author} />
        <br />
        <input {...info} />
        <br />

        <br />
        <button onClick={addNew}>save</button>
        <button onClick={resetForm}>reset</button>
      </form>
      
    </div>
  )
}

export default CreateNew

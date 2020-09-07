import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({ anecdotes, setAnecdotes, setMessage, setLocation }) => {
  let history = useHistory()
  // Sets the page title using pathname
  useEffect(() => {
    setLocation(history.location.pathname)
  }, [setLocation, history])

  const fieldProps = useField('text')
  const handleChange = fieldProps.onChange
  const anecdote = fieldProps.userInput
  const userInputKeys = fieldProps.inputKeys //  Object.keys for field names and placeholder
  const inputValues = fieldProps.inputValues //  Object.values for placing values
  const resetForm = fieldProps.onReset


  const addNew = (e) => {
    e.preventDefault()
    const newAnecdote = { ...anecdote, votes: 0, id: Date.now() }
    setAnecdotes([...anecdotes, newAnecdote])
    history.push('/anecdotes')
    setMessage({
      text: `A new anecdote "${newAnecdote.content}" was created!`,
      type: 'info',
    })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  // Mapping over the <input> 
  return (
    <div>
      <form>
        {userInputKeys.map((_, i) => {
          return (
            <div key={i}>
              <input
                placeholder={
                  userInputKeys[i].charAt(0).toUpperCase() +
                  userInputKeys[i].slice(1)
                }
                name={userInputKeys[i]}
                value={inputValues[i]}
                onChange={handleChange}
              />
              <br />
            </div>
          )
        })}

        <button onClick={addNew}>save</button>
        <button onClick={resetForm}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew

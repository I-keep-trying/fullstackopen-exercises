import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({ anecdotes, setAnecdotes, setMessage, setLocation }) => {
  let history = useHistory()

  useEffect(() => {
    setLocation(history.location.pathname)
  }, [setLocation, history])

  const fieldProps = useField('text')
  const handleChange = fieldProps.onChange
  const userInput = fieldProps.userInput
  const userInputKeys = fieldProps.inputKeys
  const inputValues = fieldProps.inputValues

  const resetInput = useField('reset')

  const anecdote = {
    content: userInput.content,
    author: userInput.author,
    info: userInput.info,
    votes: 0,
  }
  const inputParams = Object.keys(anecdote)

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

  // Mapping over the <input> 
  return (
    <div>
      <form onSubmit={addNew}>
        {userInputKeys.map((_, i) => {
          return (
            <div key={i}>
              <input
                placeholder={
                  inputParams[i].charAt(0).toUpperCase() +
                  inputParams[i].slice(1)
                }
                name={inputParams[i]}
                value={inputValues[i]}
                onChange={handleChange}
              />
              <br />
            </div>
          )
        })}

        <button type="submit">save</button>
        <input type={resetInput.type} value="reset"></input>
      </form>
    </div>
  )
}

export default CreateNew

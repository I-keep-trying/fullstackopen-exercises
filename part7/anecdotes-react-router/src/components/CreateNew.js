import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const CreateNew = ({ anecdotes, setAnecdotes, setMessage, setLocation }) => {
  let history = useHistory()

  useEffect(() => {
    setLocation(history.location.pathname)
  }, [setLocation])

  const initialInput = {
    content: '',
    author: '',
    info: '',
  }
  const [userInput, setUserInput] = useState(initialInput)

  const handleChange = (evt) => {
    const { name, value } = evt.target

    setUserInput({ ...userInput, [name]: value })
  }

  const id = Date.now()
  const anecdote = {
    content: userInput.content,
    author: userInput.author,
    info: userInput.info,
    votes: 0,
    id: id,
  }


  const addNew = (e) => {
    e.preventDefault()
    setAnecdotes(anecdotes.concat(anecdote))
    history.push('/anecdotes')
    setMessage({
      text: `A new anecdote "${anecdote.content}" was created!`,
      type: 'info',
    })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  let userInputKeys = Object.keys(userInput)

  return (
    <div>
      <h2>Add Anecdote</h2>
      <form onSubmit={addNew}>
        {userInputKeys.map((string, i) => {
          return (
            <div key={i}>
              <input
                placeholder={string.charAt(0).toUpperCase() + string.slice(1)}
                name={string}
                value={userInput.string}
                onChange={handleChange}
              />
              <br />
            </div>
          )
        })}

        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default CreateNew

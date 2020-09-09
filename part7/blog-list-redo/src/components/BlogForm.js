import React, { useState } from 'react'

const initialInput = {
  title: '',
  author: '',
  url: '',
}

const BlogForm = ({ createBlog }) => {
  const [userInput, setUserInput] = useState(initialInput)

  const handleChange = (evt) => {
    const { name, value } = evt.target

    setUserInput({ ...userInput, [name]: value })
  }

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: userInput.title,
      author: userInput.author,
      url: userInput.url,
      likes: 0,
    })
  }

  let userInputKeys = Object.keys(userInput)
  const reset = () =>
    setUserInput({
      title: '',
      author: '',
      url: '',
    })
  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        {userInputKeys.map((string, i) => {
          return (
            <div key={i}>
              <input
                id={string}
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
        <button onClick={reset}>reset</button>
      </form>
    </div>
  )
}

export default BlogForm

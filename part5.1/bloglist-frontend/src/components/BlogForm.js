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
    setUserInput(initialInput)
  }

  let userInputKeys = Object.keys(userInput)

  return (
    <div>
      <form onSubmit={addBlog}>
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

export default BlogForm

import React from 'react'
import { useDispatch } from 'react-redux'
import { loginUser, getUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import { notificationChange } from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const loginHandler = (e) => {
    e.preventDefault()
    const userData = {
      username: e.target.username.value,
      password: e.target.password.value,
    }
    e.target.username.value = ''
    e.target.password.value = ''

    blogService.login(userData).then((response) => {
      dispatch(loginUser(response))
      dispatch(notificationChange(`Welcome, ${response.name} !`, 2000))
      window.localStorage.setItem(
        'loggedInBlogAppUser',
        JSON.stringify(response.token)
      )
    })
  }
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={loginHandler}>
        <div>
          <label>username</label>
          <input name="username" />
        </div>
        <div>
          <label>password</label>
          <input name="password" type="password" />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm

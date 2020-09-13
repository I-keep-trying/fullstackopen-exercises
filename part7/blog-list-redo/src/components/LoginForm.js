import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import blogService from '../services/blogs'

const LoginForm = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const loginHandler = (e) => {
    e.preventDefault()
    const userData = {
      username: e.target.username.value,
      password: e.target.password.value,
    }
    e.target.username.value = ''
    e.target.password.value = ''

    blogService.login(userData).then((response) => {
      console.log('login response LoginForm', response)
      /* 
      id: "5f343d0090c6c131a0729b9f"
      name: "test"
      token: "eyJhbGciOiJIUzI1NiIsInR5c..."
      username: "Test_User"
      */
      dispatch(loginUser(response)) 
      window.localStorage.setItem(
        'loggedInBlogAppUser',
        JSON.stringify(response.token)
      )
      blogService.setToken(response.token)
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

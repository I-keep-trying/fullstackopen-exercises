import React from 'react'
//import { Link, useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import { toast } from 'react-toastify'

const LoginForm = () => {
  const dispatch = useDispatch()
 // const history = useHistory()

  const loginHandler = (e) => {
    e.preventDefault()
    const userData = {
      username: e.target.username.value,
      password: e.target.password.value,
    }
    e.target.username.value = ''
    e.target.password.value = ''

    blogService.login(userData)
    .then((response) => {
      console.log('login response', response)
      dispatch(loginUser(response))
/*       window.localStorage.setItem('loggedInBlogAppUser', response.token)
      blogService.setToken(response.token) */
      toast(`Welcome, ${response.name}!`, {
        autoClose: 2000,
      })
    })
 //   history.push('/')
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={loginHandler}>
        <div>
          <label>username</label>
          <input name="username" />
          Test_User
        </div>
        <div>
          <label>password</label>
          <input name="password" type="password" />
          password
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm

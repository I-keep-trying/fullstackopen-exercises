import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loginUser } from '../reducers/authReducer'
import blogService from '../services/blogs'
import { toast } from 'react-toastify'
import NewBlog from '../components/NewBlog'
import Togglable from '../components/Togglable'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const blogFormRef = useRef()

  const auth = useSelector((state) => state.auth)
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
      toast(`Welcome, ${response.name}!`, {
        autoClose: 2000,
      })
    })
    history.push('/')
  }

  const blogForm = () => (
    <Togglable buttonLabel="Add blog" cancel="cancel" ref={blogFormRef}>
      <NewBlog />
    </Togglable>
  )

  return (
    <div>
      {auth === null ? (
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
      ) : (
        <div>{blogForm()}</div>
      )}
    </div>
  )
}

export default LoginForm

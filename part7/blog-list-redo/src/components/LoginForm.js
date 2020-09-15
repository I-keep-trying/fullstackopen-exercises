import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser, logoutUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import { toast } from 'react-toastify'
import NewBlog from '../components/NewBlog'
import Togglable from '../components/Togglable'

const LoginForm = ({ user }) => {
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const loginHandler = (e) => {
    e.preventDefault()
    const userData = {
      username: e.target.username.value,
      password: e.target.password.value,
    }
    e.target.username.value = ''
    e.target.password.value = ''

    blogService.login(userData).then((response) => {
      console.log('login response', response)
      dispatch(loginUser(response))
      toast(`Welcome, ${response.name}!`, {
        autoClose: 2000,
      })
    })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser')
    blogService.setToken('')
    dispatch(logoutUser())
    toast(`Goodbye, ${user.name}! Come back soon!`, {
      autoClose: 2000,
    })
  }

  const blogForm = () => (
    <Togglable buttonLabel="Add blog" cancel="cancel" ref={blogFormRef}>
      <NewBlog />
    </Togglable>
  )

  return (
    <div>
      {user === null ? (
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
        <div>
          {blogForm()}
        </div>
      )}
    </div>
  )
}

export default LoginForm

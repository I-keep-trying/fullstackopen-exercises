import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import blogService from '../services/blogs'
import { loginUser, loginUserFail } from '../reducers/authReducer'
import { toast } from 'react-toastify'
import NewBlog from '../components/NewBlog'
import Togglable from '../components/Togglable'

const LoginForm = ({ user, setUser }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const blogFormRef = useRef()

  const auth = useSelector((state) => {
    return state.auth
  })
  const handleLogin = async (e) => {
    e.preventDefault()
    const credentials = {
      username: e.target.username.value,
      password: e.target.password.value,
    }
    e.target.username.value = ''
    e.target.password.value = ''
    try {
      await blogService.login(credentials).then((response) => {
        dispatch(loginUser(response))
        toast(`Welcome, ${response.data.name}!`)
        history.push('/blogs')
      })
    } catch (err) {
      dispatch(loginUserFail(err))
      toast.error(`Login failed 🙁... ${auth.error} `, { autoClose: 2000 })
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="Add blog" cancel="cancel" ref={blogFormRef}>
      <NewBlog />
    </Togglable>
  )
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
        <div className="form-group">
        <label htmlFor="username">Username</label>

            <input className="form-control" name="username" placeholder="Username" />
            <div style={{ color: 'white' }}>Test_User Robert_C_Martin</div>
          </div>
          <div className="form-group">
          <label htmlFor="password">Password</label>

            <input className="form-control" name="password" type="password" placeholder="Password" />
            <div style={{ color: 'white' }}>password</div>
          </div>
          <div className="form-group">
          <button className="btn btn-secondary btn-block" type="submit">
            Login
          </button>
          </div>
          
        </form>
      </div>
      <div>{blogForm()}</div>
    </div>
  )
}

export default LoginForm

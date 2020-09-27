import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import usersService from '../services/users'
import {
  registerUser,
  registerFail,
} from '../reducers/allUsersReducer'
import { loginUser } from '../reducers/authReducer'
import { toast } from 'react-toastify'

const Registration = ({ user, setUser }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleRegister = async (e) => {
    e.preventDefault()
    const newUser = {
      name: e.target.name.value,
      username: e.target.username.value,
      password: e.target.password.value,
    }
    e.target.name.value = ''
    e.target.username.value = ''
    e.target.password.value = ''
    try {
        console.log('new user input',newUser)
        if (newUser.name.length === 0) {
           return toast('Please enter name')
        } else if (newUser.username.length === 0) {
           return toast('Please enter username') 
        } else if (newUser.password.length < 8) {
           return toast('Password must be at least 8 characters')
        }
      await usersService.createUser(newUser).then((response) => {
        dispatch(registerUser(response))
         toast(`Registration successful, ${response.name}!`)
         dispatch(loginUser({data: response}))
         history.push('/newBlog')
      })
    } catch (err) {
      dispatch(registerFail(err))
    }
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h2>Register</h2>

        <form onSubmit={handleRegister}>
        <div className="form-group">
            <label htmlFor="username">Name</label>

            <input
              className="form-control"
              name="name"
              placeholder="Name"
            />
            <div style={{ color: 'white' }}>Test_User Robert_C_Martin</div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>

            <input
              className="form-control"
              name="username"
              placeholder="Username"
            />
            <div style={{ color: 'white' }}>Test_User Robert_C_Martin</div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
            />
            <div style={{ color: 'white' }}>password</div>
          </div>
          <div className="form-group">
            <button className="btn btn-secondary btn-block" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registration

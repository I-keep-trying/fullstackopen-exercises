import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userService from '../services/users'
import { getUsers } from '../reducers/allUsersReducer'
import Togglable from '../components/Togglable'

const UserDetail = ({ user }) => {
  return (
    <>
      {user.blogs.map((blog) => (
        <div key={blog.id}>Title: {blog.title}</div>
      ))}
    </>
  )
}

const User = ({ user }) => {
  const userDetail = () => (
    <Togglable buttonLabel="details">
      <UserDetail user={user} />
    </Togglable>
  )

  return (
    <li key={user.id}>
      Name: {user.name}
      <br />
      Blogs: {user.blogs.length}
      {user.blogs.length === 0 ? <div></div> : userDetail()}
    </li>
  )
}

const Users = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    userService.getAllUsers().then((users) => dispatch(getUsers(users)))
  }, [dispatch])
  const users = useSelector((state) => state.users)

  return (
    <>
      <h2>Users</h2>
      {users.map((user) => (
        <ul key={user.id}>
          <User user={user} />
        </ul>
      ))}
    </>
  )
}

export default Users

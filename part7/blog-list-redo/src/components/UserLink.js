import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  return (
    <div key={user.id} >
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </div>
  )
}

export default User

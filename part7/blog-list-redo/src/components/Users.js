import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users.users)
  const loading = useSelector((state) => state.users.loading)
  return (
    <>
      {loading ? (
        <div>Loading users...</div>
      ) : (
        <>
          <table>
            <h2>
              Users
              <tbody>
                <tr>
                  <td></td>
                  <td>blogs total</td>
                </tr>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      {' '}
                      <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </td>
                    <td>{user.blogs.length} </td>
                  </tr>
                ))}
              </tbody>
            </h2>
          </table>
        </>
      )}
    </>
  )
}

export default Users

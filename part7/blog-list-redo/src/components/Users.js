import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../reducers/allUsersReducer'
import User from './UserLink'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const users = useSelector((state) => state.users.users)
  const loading = useSelector((state) => state.users.loading)
  return (
    <>
      {loading ? (
        <div>Loading users...</div>
      ) : (
        <>
          <div>
            <div className="list-group">
              <div className="list-group-item d-flex justify-content-between">
                <strong className="mb-1">User</strong>
                <strong> Blogs Created </strong>
              </div>
            </div>
            {users.map((user) => {
              return (
                <div key={user.id} className="list-group">
                  <div className="list-group-item d-flex justify-content-between">
                    <User key={user.id} user={user} />
                    <div>{user.blogs.length}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}

export default Users

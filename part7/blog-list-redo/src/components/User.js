import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../reducers/userReducer'

const User = ({ match }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const { id } = match.params

    dispatch(fetchUser(id))
  }, [dispatch, match])

  const user = useSelector((state) => state.user.user)

  const loading = useSelector((state) => state.user.loading)

  return (
    <section>
      {loading ? (
        <p>Loading user...</p>
      ) : (
        <>
          <h2>{user.name}'s added blogs</h2>
          <div>
            {user.blogs.length === 0 ? (
              <h2>😐 No blogs from {user.name} </h2>
            ) : (
              <>
                {user.blogs.map((blog) => (
                  <ul>
                    <li>
                      {' '}
                      <h3>{blog.title} </h3>
                    </li>
                  </ul>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </section>
  )
}

export default User

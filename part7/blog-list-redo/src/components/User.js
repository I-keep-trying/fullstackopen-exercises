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
    <section key={user.id}>
      {loading ? (
        <p>Loading user...</p>
      ) : (
        <>
          <div class="list-group">
            <div class="list-group-item list-group-item-action">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{user.name}'s added blogs</h5>
              </div>
            </div>

            {user.blogs.length === 0 ? (
              <div class="list-group-item list-group-item-action">
                <div class="mb-1">
                  <span role="img" aria-label="frown">
                    😐
                  </span>
                  No blogs from {user.name}{' '}
                </div>
              </div>
            ) : (
              <>
                {user.blogs.map((blog) => (
                  <div class="list-group-item list-group-item-action">
                    <div class="mb-1" key={blog.id}>
                      <div class="mb-1">{blog.title}</div>
                    </div>
                  </div>
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

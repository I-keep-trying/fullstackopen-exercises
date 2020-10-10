import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import { toast } from 'react-toastify'

const LoginForm = ({ setToken, setPage, setUser }) => {
  const [username, setUsername] = useState('aaa')
  const [password, setPassword] = useState('secret')

  const [login] = useMutation(LOGIN, {
    onError: (error) => {
      toast.error(`💥${error.graphQLErrors[0].message}`)
    },
    onCompleted: (data) => {
      setToken(data.login.value)
      setUser(data.login.user)
      localStorage.setItem('library-user-token', data.login.value)
      toast(`🐸Welcome, ${data.login.user.username}!`, { autoClose: 1000 })
      setPage('home')
    },
  })

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm

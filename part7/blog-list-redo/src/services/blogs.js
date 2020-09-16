import axios from 'axios'

const baseUrl = '/api/blogs'
const loginUrl = '/api/login'

let token

const login = async (credentials) => {
  const response = await axios.post(loginUrl, credentials)
  window.localStorage.setItem(
    'loggedInBlogAppUser',
    JSON.stringify(response.data)
  )
  setToken(response.data.token)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  console.log('axios getAll request',request)
  return request.then((response) => response.data)
}

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then((response) => {
    return response.data
  })
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (changeObject) => {
  const likes = { likes: changeObject.likes }
  const response = await axios.patch(`${baseUrl}/${changeObject.id}`, likes)
  return response.data
}

const deleteBlog = (deleteObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${deleteObject.id}`, config)
  return request.then((response) => {
    return response.status
  })
}

export default {
  getAll,
  getOne,
  create,
  update,
  login,
  setToken,
  deleteBlog,
  token,
}

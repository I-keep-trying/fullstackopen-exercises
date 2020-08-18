import axios from 'axios'
const baseUrl = '/api/blogs'
const loginUrl = '/api/login'

const login = async (credentials) => {
  const response = await axios.post(loginUrl, credentials)
  console.log('response',response.data)
  return response.data
}

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)

  return request.then((response) => response.data)
}

const getOne = (blogObject) => {
  console.log('blogObject',`${baseUrl}/${blogObject.id}`)
  const request = axios.get(`${baseUrl}/${blogObject.id}`)

  return request.then((response) => {
    console.log('response.data',response.data)
    return response.data})
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  console.log('create blog response',response.data)
  return response.data
}

const update = (changeObject) => {
  const request = axios.patch(`${baseUrl}/${changeObject.id}`, changeObject)
  return request.then((response) => response.data)
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
}

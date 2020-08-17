import axios from 'axios'
const baseUrl = '/api/blogs'
const loginUrl = '/api/login'

const login = async (credentials) => {
  const response = await axios.post(loginUrl, credentials)
  return response.data
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (newObject) => {
  console.log('newObject', newObject)
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return request.then((response) => response.data)
}

export default {
  getAll,
  create,
  update,
  login,
  setToken
}

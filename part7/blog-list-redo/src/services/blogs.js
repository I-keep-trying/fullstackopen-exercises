import axios from 'axios'
const baseUrl = '/api/blogs'
const loginUrl = '/api/login'

const login = async (credentials) => {
  const response = await axios.post(loginUrl, credentials)
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
  const request = axios.get(`${baseUrl}/${blogObject.id}`)
  return request.then((response) => {
    return response.data
  })
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  console.log('axios create new response', response.data)
  return response.data
}

const update = async (changeObject) => {
  // patch request {id: "5f455c901187c53d0cd22b97", likes: 22}
  const likes = { likes: changeObject.likes }
  const response = await axios.patch(`${baseUrl}/${changeObject.id}`, likes)
  return response.data
}

const deleteBlog = (deleteObject) => {
  console.log('axios delete request', deleteObject.id)
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

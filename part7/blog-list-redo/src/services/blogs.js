import axios from 'axios'

const baseUrl = '/api/blogs'
const loginUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(loginUrl, credentials)
  console.log('response',response.data)
  window.localStorage.setItem(
    'loggedInBlogAppUser',
    JSON.stringify(response.data)
  )
  return response
  
}

const getAll = () => {
  const request = axios.get(baseUrl)
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
    headers: { Authorization: `bearer ${newObject.auth.token}` },
  }
  const blogObject = {
    title: newObject.title,
    author: newObject.author,
    url: newObject.url,
    likes: newObject.likes,
  }
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const update = async (changeObject) => {
  const likes = { likes: changeObject.likes }
  const response = await axios.patch(`${baseUrl}/${changeObject.id}`, likes)
  return response.data
}

const deleteBlog = (deleteObject, auth) => {
  const config = {
    headers: { Authorization: `bearer ${auth.token} ` },
  }
  const request = axios.delete(`${baseUrl}/${deleteObject.id}`, config)

  return request.then((response) => {
    return response.status
  })
}

const addComment = async (comment, blogId) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, comment)
  return response.data
}

export default {
  getAll,
  getOne,
  create,
  update,
  login,
  //setToken,
  deleteBlog,
  addComment,
}

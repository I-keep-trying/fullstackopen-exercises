import axios from 'axios'
const baseUrl = 'http://localhost:3005/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

const deleteRecord = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  console.log('axios request', request)
  return request.then((response) => response.data)
}

export default {
  getAll,
  create,
  deleteRecord,
}

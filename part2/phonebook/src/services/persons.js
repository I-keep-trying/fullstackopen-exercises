import axios from 'axios'
const baseUrl = '/api/persons'
const infoUrl = '/api/info'

const getInfo = () => {
  const request = axios.get(infoUrl)
  return request.then((response) => {
    return response.data
  })
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

const deleteRecord = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

export default {
  getAll,
  create,
  update,
  deleteRecord,
  getInfo,
}

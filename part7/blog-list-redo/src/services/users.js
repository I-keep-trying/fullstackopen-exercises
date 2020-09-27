import axios from 'axios'

const baseUrlUsers = '/api/users'

const getAllUsers = () => {
  const request = axios.get(baseUrlUsers)
  return request.then((response) => {
      return response.data})
}

const getOneUser = (userObject) => {
  const request = axios.get(`${baseUrlUsers}/${userObject.id}`)
  return request.then((response) => {
    return response.data
  })
}

const createUser = async (userObject) => {
  const newUserObject = {
    name: userObject.name,
    username: userObject.username,
    password: userObject.password
  }
  const response = await axios.post(baseUrlUsers, newUserObject)
  console.log('createUser axios response',response)
  return response.data
}

export default { getAllUsers, getOneUser, createUser }

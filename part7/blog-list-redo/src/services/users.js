import axios from 'axios'

const baseUrlUsers = '/api/users'

const getAllUsers = () => {
  const request = axios.get(baseUrlUsers)
  return request.then((response) => {
     // console.log('api request users',response.data)
      return response.data})
}

const getOneUser = (userObject) => {
  const request = axios.get(`${baseUrlUsers}/${userObject.id}`)
  return request.then((response) => {
    return response.data
  })
}

export default { getAllUsers, getOneUser }

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1pY2hhZWxfQ2hhbiIsImlkIjoiNWYzNDFhZGIxM2QyMzcyNDRjNDc3MDQyIiwiaWF0IjoxNjAwMDk0MDcxfQ.U8DQE3s3YFbIbdxUy0AP2BGUiCbiMcmBCZs_WJusgX4
//loggedInBlogAppUser: ""eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1pY2hhZWxfQ2hhbiIsImlkIjoiNWYzNDFhZGIxM2QyMzcyNDRjNDc3MDQyIiwiaWF0IjoxNjAwMDk0MDcxfQ.U8DQE3s3YFbIbdxUy0AP2BGUiCbiMcmBCZs_WJusgX4""
//token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1pY2hhZWxfQ2hhbiIsImlkIjoiNWYzNDFhZGIxM2QyMzcyNDRjNDc3MDQyIiwiaWF0IjoxNjAwMDk0MDcxfQ.U8DQE3s3YFbIbdxUy0AP2BGUiCbiMcmBCZs_WJusgX4"

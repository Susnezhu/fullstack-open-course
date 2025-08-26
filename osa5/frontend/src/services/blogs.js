import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getLoggedUser = async (username, password) => {
  const loginResponse = await axios.post('/api/login', { username, password })
  const loginData = loginResponse.data

  const userResponse = await axios.get('/api/users')
  const userData = userResponse.data.find(u => u.username === username)

  return {
    username: loginData.username,
    name: loginData.name,
    token: loginData.token,
    id: userData.id
  }
}

export default { getAll, getLoggedUser }
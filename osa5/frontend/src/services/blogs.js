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

const createNewBlog = async (blog) => {
  const user = JSON.parse(window.localStorage.getItem("user")) // kirjautunut käyttäjä

  if (user) {
    const response = await axios
      .post(
        baseUrl, 
        blog,
        {headers: {Authorization: `Bearer ${user.token}`}} //kirjautuneen käyttäjän token
      )

    return response
  }
}

const likeBlog = async (blogId) => {

  const blog = await axios.get(`${baseUrl}/${blogId}`);
  const newLikeValue = blog.data.likes + 1; // vanha "likes" arvo + 1

  const response = await axios
    .put(
      `${baseUrl}/${blogId}`,
      {"likes": newLikeValue}
    );

  return (
    response
  )
}

const deleteBlog = async (blogId) => {
  const user = JSON.parse(window.localStorage.getItem("user"))

  const response = await axios
    .delete(
      `${baseUrl}/${blogId}`,
      {headers: {Authorization: `Bearer ${user.token}`}}
    )

    return (
      response
    )
}

export default { getAll, getLoggedUser, createNewBlog, likeBlog, deleteBlog }
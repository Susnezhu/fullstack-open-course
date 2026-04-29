export const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem("user")
  if (loggedUserJSON) {
    return JSON.parse(loggedUserJSON)
  }

  return null
}

export const saveUser = (userData) => { 
  window.localStorage.setItem("user", JSON.stringify(userData))
}

export const removeUser = () => { 
  window.localStorage.removeItem("user");
}

export default {getUser, saveUser, removeUser}
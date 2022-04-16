const NAME = 'bloglistUser'

export const setStorage = user => {
  if (user && user.id && user.username) {
    localStorage.setItem(NAME, JSON.stringify(user))
    return true
  }
  return false
}

export const getStorage = () => {
  const userInStorage = localStorage.getItem(NAME)
  if (userInStorage) {
    return JSON.parse(userInStorage)
  }
  return null
}

export const clearStorage = () => {
  localStorage.clear()
}
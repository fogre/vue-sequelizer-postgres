import axios from 'axios'

const API_URL = 'http://localhost:3001/api'

export const apiGet = async resource => await axios.get(`${API_URL}${resource}`)

export const apiPost = async (resource, body) =>  {
  return await axios.post(`${API_URL}${resource}`, body, {
    withCredentials: true
  })
}

export const apiDelete = async resource => {
  return await axios.delete(`${API_URL}${resource}`, {
    withCredentials: true
  })
}

export const apiGetUser = async id => await apiGet(`/users/${id}`)

export const apiGetWithSearch = async (resource, searchParams) => {
  if (searchParams) {
    const parsedParams = searchParams.search.replace(/\s/g, '+')
    return await apiGet(`${resource}?search=${parsedParams}`)
  }
  return await apiGet(resource)
}

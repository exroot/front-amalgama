import useHttpClient from '@/utils/client'
import { ENDPOINTS } from '@/utils/endpoints'

const getUsers = async () => {
  const httpClient = useHttpClient()
  try {
    const { data } = await httpClient.get(`${ENDPOINTS.users}`)
    return data
  } catch (err) {
    console.error('Error at getUsers: ', err)
    throw err
  }
}

const getUser = async (userId: number) => {
  const httpClient = useHttpClient()
  try {
    const { data } = await httpClient.get(`${ENDPOINTS.users}/${userId}/`)
    return data
  } catch (err) {
    console.error('Error at getUser: ', err)
    throw err
  }
}

const saveUser = async (userData: any) => {
  const httpClient = useHttpClient()
  try {
    const { data } = await httpClient.post(`${ENDPOINTS.users}`, userData)
    return data
  } catch (err) {
    console.error('Error at saveUser: ', err)
    throw err
  }
}

const updateUser = async (userId: number, userData: any) => {
  const httpClient = useHttpClient()
  try {
    const { data } = await httpClient.put(`${ENDPOINTS.users}/${userId}`)
    return data
  } catch (err) {
    console.error('Error at updateUser: ', err)
    throw err
  }
}

const deleteUser = async (userId: number) => {
  const httpClient = useHttpClient()
  try {
    const { data } = await httpClient.delete(`${ENDPOINTS.users}/${userId}`)
    return data
  } catch (err) {
    console.error('Error at deleteUser: ', err)
    throw err
  }
}

export { getUsers, getUser, saveUser, updateUser, deleteUser }

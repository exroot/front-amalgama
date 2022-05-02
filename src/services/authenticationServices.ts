import useHttpClient from '@/utils/client'
import { ENDPOINTS } from '@/utils/endpoints'
import axios from 'axios'

const login = async (body: any) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${ENDPOINTS.authentication.login}`,
      body
    )
    return data
  } catch (err) {
    console.error('Error at login: ', err)
    throw err
  }
}

const signup = async (body: any) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${ENDPOINTS.authentication.signup}`,
      body
    )
    return data
  } catch (err) {
    console.error('Error at signup: ', err)
    throw err
  }
}

const getSession = async () => {
  const httpClient = useHttpClient()
  try {
    const { data } = await httpClient.get(`${ENDPOINTS.authentication.me}`)
    return data
  } catch (err) {
    console.error('Error at signup: ', err)
    throw err
  }
}

const logout = async (refreshToken: string) => {
  const httpClient = useHttpClient()
  try {
    const { data } = await httpClient.post(
      `${ENDPOINTS.authentication.logout}`,
      {
        refresh_token: refreshToken,
      }
    )
    return data
  } catch (err) {
    console.error('Error at logout: ', err)
    throw err
  }
}

export { login, signup, getSession, logout }

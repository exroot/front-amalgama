import axios from 'axios'
import { ENDPOINTS } from 'src/utils/endpoints'

const CALL_TIMEOUT = 15000

const useHttpClient = () => {
  try {
    const session = localStorage.getItem('access') || null
    const userLoggedIn = session && session !== 'null'
    const httpClient = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + ENDPOINTS.baseURL,
      headers: {
        Authorization: userLoggedIn ? `Bearer ${session}` : '',
      },
      timeout: CALL_TIMEOUT,
    })
    return httpClient
  } catch (err) {
    console.error('error: ', err)
  }
}

export default useHttpClient

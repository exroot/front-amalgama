import useHttpClient from '@/utils/client'
import { ENDPOINTS } from '@/utils/endpoints'

const getRegistries = async (url) => {
  const httpClient = useHttpClient()
  try {
    const { data } = await httpClient.get(url)
    return data
  } catch (err) {
    console.error('Error at getRegistries: ', err)
    throw err
  }
}

const getRegistry = async (registryId: number) => {
  const httpClient = useHttpClient()
  try {
    const { data } = await httpClient.get(
      `${ENDPOINTS.registries}/${registryId}/`
    )
    return data
  } catch (err) {
    console.error('Error at getRegistry: ', err)
    throw err
  }
}

const saveRegistry = async (registryData: any) => {
  const httpClient = useHttpClient()
  try {
    const { data } = await httpClient.post(
      `${ENDPOINTS.registries}`,
      registryData
    )
    return data
  } catch (err) {
    console.error('Error at saveRegistry: ', err)
    throw err
  }
}

export { getRegistries, getRegistry, saveRegistry }

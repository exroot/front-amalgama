import useHttpClient from '@/utils/client'
import { ENDPOINTS } from '@/utils/endpoints'

const getCurrencies = async (url: any) => {
  const httpClient = useHttpClient()
  try {
    const { data } = await httpClient.get(url)
    return data
  } catch (err) {
    console.error('Error at getCurrencies: ', err)
    throw err
  }
}

const getCurrency = async (currencyId: number) => {
  const httpClient = useHttpClient()
  try {
    const { data } = await httpClient.get(
      `${ENDPOINTS.currencies}/${currencyId}/`
    )
    return data
  } catch (err) {
    console.error('Error at getCurrency: ', err)
    throw err
  }
}

const saveCurrency = async (currencyData: any) => {
  const httpClient = useHttpClient()
  try {
    const { data } = await httpClient.post(
      `${ENDPOINTS.baseURL}${ENDPOINTS.currencies}`,
      currencyData
    )
    return data
  } catch (err) {
    console.error('Error at saveCurrency: ', err)
    throw err
  }
}

const updateCurrency = async (currencyId: number, currencyData: any) => {
  const httpClient = useHttpClient()
  try {
    const { data } = await httpClient.put(
      `${ENDPOINTS.currencies}/${currencyId}`
    )
    return data
  } catch (err) {
    console.error('Error at updateCurrency: ', err)
    throw err
  }
}

const deleteCurrency = async (currencyId: number) => {
  const httpClient = useHttpClient()
  try {
    const { data } = await httpClient.delete(
      `${ENDPOINTS.currencies}/${currencyId}`
    )
    return data
  } catch (err) {
    console.error('Error at deleteCurrency: ', err)
    throw err
  }
}

export {
  getCurrencies,
  getCurrency,
  saveCurrency,
  updateCurrency,
  deleteCurrency,
}

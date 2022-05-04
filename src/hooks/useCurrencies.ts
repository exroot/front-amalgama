import { getCurrencies } from 'src/services/currenciesServices'
import { ENDPOINTS } from 'src/utils/endpoints'
import useSWR from 'swr'

const useCurrencies = ({ page = 1, limit = 10, showMeta = true }: any) => {
  const { data, mutate, error } = useSWR(
    `${ENDPOINTS.currencies}?page=${page}&limit=${limit}&show_meta=${showMeta}`,
    getCurrencies
  )
  return {
    data,
    error,
    mutate,
    isLoading: !data && !error,
  }
}

export default useCurrencies

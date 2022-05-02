import { getCurrencies } from '@/services/currenciesServices'
import { ENDPOINTS } from '@/utils/endpoints'
import useSWR from 'swr'

const useCurrencies = ({ page = 1, limit = null, showMeta = true }: any) => {
  const { data, error } = useSWR(
    `${ENDPOINTS.currencies}?page=${page}&limit=${limit}&show_meta=${showMeta}`,
    getCurrencies
  )
  return {
    data,
    error,
    isLoading: !data && !error,
  }
}

export default useCurrencies

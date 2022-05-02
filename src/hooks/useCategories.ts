import { getCategories } from '@/services/categoriesServices'
import { ENDPOINTS } from '@/utils/endpoints'
import useSWR from 'swr'

const useCategories = ({ page = 1, limit = null, showMeta = true }: any) => {
  const { data, error } = useSWR(
    `${ENDPOINTS.categories}?page=${page}&limit=${limit}&show_meta=${showMeta}`,
    getCategories
  )
  return {
    data,
    error,
    isLoading: !data && !error,
  }
}

export default useCategories

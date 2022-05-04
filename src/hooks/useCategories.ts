import { getCategories } from 'src/services/categoriesServices'
import { ENDPOINTS } from 'src/utils/endpoints'
import useSWR from 'swr'

const useCategories = ({ page = 1, limit = null, showMeta = true }: any) => {
  console.log('use categories')
  const { data, error, mutate } = useSWR(
    `${ENDPOINTS.categories}?page=${page}&limit=${limit}&show_meta=${showMeta}`,
    getCategories
  )
  return {
    data,
    error,
    mutate,
    isLoading: !data && !error,
  }
}

export default useCategories

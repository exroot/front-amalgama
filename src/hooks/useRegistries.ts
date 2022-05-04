import { getRegistries } from 'src/services/registriesServices'
import { ENDPOINTS } from 'src/utils/endpoints'
import useSWR from 'swr'

const useRegistries = ({
  page = 1,
  month = null,
  category = null,
  type = null,
}: any) => {
  const { data, error, mutate } = useSWR(
    `${ENDPOINTS.registries}?page=${page}&month=${month}&category=${category}&type=${type}&show_meta`,
    getRegistries
  )
  return {
    data,
    mutate,
    error,
    isLoading: !data && !error,
  }
}

export default useRegistries

import { getUsers } from 'src/services/usersServices'
import { ENDPOINTS } from 'src/utils/endpoints'
import useSWR from 'swr'

const useUsers = ({ page = 1, limit = 10, showMeta = true }: any) => {
  const { data, error, mutate } = useSWR(
    `${ENDPOINTS.users}?page=${page}&limit=${limit}&show_meta=${showMeta}`,
    getUsers
  )
  return {
    data,
    mutate,
    error,
    isLoading: !data && !error,
  }
}

export default useUsers

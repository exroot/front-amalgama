import { getUsers } from '@/services/usersServices'
import { ENDPOINTS } from '@/utils/endpoints'
import useSWR from 'swr'

const useUsers = (
  page: any = 1,
  month: any = null,
  category: any = null,
  special: any = null
) => {
  const { data, error } = useSWR(
    `${ENDPOINTS.users}?page=${page}&month=${month}&category=${category}&special=${special}`,
    getUsers
  )
  return {
    data,
    error,
    isLoading: !data && !error,
  }
}

export default useUsers

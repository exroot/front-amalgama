import { useEffect } from 'react'
import { getSession } from '@/services/authenticationServices'
import { ENDPOINTS } from '@/utils/endpoints'
import redirectToRoute from '@/utils/redirectTo'
import useSWR from 'swr'

const useSession = ({
  redirectTo = false,
  redirectIfFound = false,
  oneCall = false,
  initialData = null,
}: any) => {
  const {
    data: user,
    mutate: mutateUser,
    error,
  } = useSWR(`${ENDPOINTS.authentication.me}`, getSession, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: oneCall ? 0 : 1 * 1000 * 60 * 5,
    dedupingInterval: 1 * 1000 * 60 * 5, // Relay call to USER_ENDPOINT
    fallbackData: initialData,
  })

  useEffect(() => {
    if (!redirectTo || !user) return
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.is_logged_in) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.is_logged_in)
    ) {
      redirectToRoute(redirectTo)
    }
  }, [user, error, redirectTo, redirectIfFound])

  return {
    user,
    mutateUser,
    error,
    isLoading: !user && !error,
  }
}

export default useSession

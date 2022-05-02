import type { AppProps } from 'next/app'
import { ToastProvider } from 'react-toast-notifications'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider
      placement="bottom-right"
      autoDismiss
      autoDismissTimeout={3000}
    >
      <Component {...pageProps} />
    </ToastProvider>
  )
}

export default MyApp

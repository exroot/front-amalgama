import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { ToastProvider } from "react-toast-notifications";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}

export default MyApp;

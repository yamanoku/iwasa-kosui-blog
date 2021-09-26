import '../styles/globals.css'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/dist/client/router'
import GoogleAnalytics from '../components/GoogleAnalytics'
import { GOOGLE_ANALYTICS_ID, handleRouteChange } from '../lib/gtag'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    if (GOOGLE_ANALYTICS_ID === '') {
      return
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <>
    <GoogleAnalytics />
    <Component {...pageProps} />
  </>
}
export default MyApp

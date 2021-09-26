import '../styles/globals.css'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/dist/client/router'
import GoogleAnalytics from '../components/GoogleAnalytics'
import { NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, pageview } from '../lib/gtag'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    if (NEXT_PUBLIC_GOOGLE_ANALYTICS_ID === '') {
      return
    }

    router.events.on('routeChangeComplete', pageview)

    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events])

  return <>
    <GoogleAnalytics />
    <Component {...pageProps} />
  </>
}
export default MyApp

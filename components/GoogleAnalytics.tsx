import Script from 'next/script'
import { NEXT_PUBLIC_GOOGLE_ANALYTICS_ID } from '../lib/gtag'

const GoogleAnalytics = () => (
    <>
        {NEXT_PUBLIC_GOOGLE_ANALYTICS_ID !== '' && (
            <>
                <Script defer src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`} strategy="afterInteractive" />
                <Script id="googleanalytics" defer strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag() { dataLayer.push(arguments); }
                        gtag('js', new Date());    
                        gtag('config', '${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
                            page_path: window.location.pathname,
                        });
                    `}
                </Script>
            </>
        )}
    </>
)

export default GoogleAnalytics
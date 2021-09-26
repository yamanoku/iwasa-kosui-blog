import Script from 'next/script'
import { NEXT_PUBLIC_GOOGLE_ANALYTICS_ID } from '../lib/gtag'

const GoogleAnalytics = () => (
    <>
        {NEXT_PUBLIC_GOOGLE_ANALYTICS_ID !== '' && (
            <>
                <Script defer src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`} strategy="afterInteractive" />
                <Script id="ga" defer strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());    
                        gtag('config', '${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
                    `}
                </Script>
            </>
        )}
    </>
)

export default GoogleAnalytics
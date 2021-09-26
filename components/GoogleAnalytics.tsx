import Script from 'next/script'
import { GOOGLE_ANALYTICS_ID } from '../lib/gtag'

const GoogleAnalytics = () => (
    <>
        {GOOGLE_ANALYTICS_ID !== '' && (
            <>
                <Script defer src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`} strategy="afterInteractive" />
                <Script id="ga" defer strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());    
                        gtag('config', '${GOOGLE_ANALYTICS_ID}');
                    `}
                </Script>
            </>
        )}
    </>
)

export default GoogleAnalytics
export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID || ''

export const handleRouteChange = (path: string) => {
  window.gtag('config', GOOGLE_ANALYTICS_ID, {
    page_path: path,
  })
}

type Event = {action: string, category: string, label: string, value:string }

export const event = (event: Event) => {
  if (GOOGLE_ANALYTICS_ID === '') {
    return
  }
  const { action, category, label, value } = event

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  })
}
export const NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''

export const pageview = (path: string) => {
  window.gtag('config', NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
    page_path: path,
  })
}

type Event = {action: string, category: string, label: string, value: string }

export const event = (event: Event) => {
  if (NEXT_PUBLIC_GOOGLE_ANALYTICS_ID === '') {
    return
  }
  const { action, category, label, value } = event

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  })
}
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useAnalytics = () => {
  const location = useLocation()

  useEffect(() => {
    // Implement your analytics tracking here
    const trackPageView = (path: string) => {
      // Add your analytics implementation
      console.log(`Page view: ${path}`)
    }

    trackPageView(location.pathname)
  }, [location])
}
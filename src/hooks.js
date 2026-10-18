import { useEffect, useState } from 'react'
import { BUSINESS } from './data'

function istNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(new Date())
  const get = (t) => Number(parts.find((p) => p.type === t).value) % 24
  return get('hour') + get('minute') / 60
}

/** Open/closed status based on the shop's 6-9 AM window in IST. */
export function useOpenStatus() {
  const compute = () => {
    const now = istNow()
    if (now >= BUSINESS.openHour && now < BUSINESS.closeHour) return { open: true, label: 'Open now' }
    return { open: false, label: now < BUSINESS.openHour ? 'Opens at 6:00 AM' : 'Closed. Opens tomorrow 6:00 AM' }
  }
  const [status, setStatus] = useState(compute)
  useEffect(() => {
    const t = setInterval(() => setStatus(compute()), 60000)
    return () => clearInterval(t)
  }, [])
  return status
}

/** Scroll to the element named in the URL hash (needed for in-page links through the router). */
export function useHashScroll(location) {
  useEffect(() => {
    if (!location.hash) {
      if (location.pathname === '/') window.scrollTo(0, 0)
      return
    }
    const id = location.hash.slice(1)
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60)
    return () => clearTimeout(t)
  }, [location])
}

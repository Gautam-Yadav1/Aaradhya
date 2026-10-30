import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { MENU, ADDONS, BUSINESS } from './data'

const CartContext = createContext(null)
const STORAGE_KEY = 'aaradhya-cart-v1'

const lineKey = (itemId, addons) => `${itemId}|${[...addons].sort().join(',')}`

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    // drop anything that no longer exists in the menu
    return raw.filter((l) => MENU.some((m) => m.id === l.itemId))
  } catch {
    return []
  }
}

export function lineUnitPrice(line) {
  const item = MENU.find((m) => m.id === line.itemId)
  const extra = line.addons.reduce((s, id) => s + (ADDONS.find((a) => a.id === id)?.price || 0), 0)
  return (item?.price || 0) + extra
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(load)
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* storage unavailable, cart just won't persist */
    }
  }, [lines])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(t)
  }, [toast])

  const addItem = useCallback((itemId, addons = [], qty = 1) => {
    const key = lineKey(itemId, addons)
    setLines((prev) => {
      const found = prev.find((l) => l.key === key)
      if (found) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l))
      return [...prev, { key, itemId, addons: [...addons], qty }]
    })
    const item = MENU.find((m) => m.id === itemId)
    setToast(`${item.name} added to cart`)
  }, [])

  const changeQty = useCallback((key, delta) => {
    setLines((prev) =>
      prev.flatMap((l) => {
        if (l.key !== key) return [l]
        const qty = l.qty + delta
        return qty > 0 ? [{ ...l, qty }] : []
      }),
    )
  }, [])

  const removeLine = useCallback((key) => setLines((prev) => prev.filter((l) => l.key !== key)), [])
  const clear = useCallback(() => setLines([]), [])

  const count = lines.reduce((s, l) => s + l.qty, 0)
  const total = lines.reduce((s, l) => s + l.qty * lineUnitPrice(l), 0)

  const value = useMemo(
    () => ({ lines, count, total, open, setOpen, toast, addItem, changeQty, removeLine, clear }),
    [lines, count, total, open, toast, addItem, changeQty, removeLine, clear],
  )
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)

export function buildWhatsAppMessage(lines, total, customer = {}) {
  const rows = lines.map((l, i) => {
    const item = MENU.find((m) => m.id === l.itemId)
    const extras = l.addons.map((id) => ADDONS.find((a) => a.id === id)?.name).filter(Boolean)
    const extraText = extras.length ? `\n   + ${extras.join(', ')}` : ''
    return `${i + 1}. ${item.name} x ${l.qty} = ₹${l.qty * lineUnitPrice(l)}${extraText}`
  })
  const parts = [
    `Hello ${BUSINESS.name}! 🙏`,
    'I want to order these items:',
    '',
    ...rows,
    '',
    `*Total: ₹${total}*`,
  ]
  if (customer.name) parts.push('', `Name: ${customer.name}`)
  if (customer.address) parts.push(`Delivery address: ${customer.address}`)
  if (customer.note) parts.push(`Note: ${customer.note}`)
  parts.push('', 'I will pay using the QR code shown at checkout and send the payment screenshot here.', 'Please confirm my order. Thank you!')
  return parts.join('\n')
}

export function buildWhatsAppUrl(lines, total, customer = {}) {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(buildWhatsAppMessage(lines, total, customer))}`
}

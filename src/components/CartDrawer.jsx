import { useEffect, useState } from 'react'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart, lineUnitPrice, buildWhatsAppUrl } from '../CartContext'
import { MENU, ADDONS } from '../data'
import { WhatsAppIcon } from './Icons'

export default function CartDrawer() {
  const { lines, total, count, open, setOpen, changeQty, removeLine, clear } = useCart()
  const [name, setName] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, setOpen])

  const order = () => {
    const url = buildWhatsAppUrl(lines, total, { name: name.trim(), note: note.trim() })
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <div className={`overlay ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open} aria-label="Your cart">
        <header className="drawer__head">
          <h3>
            <ShoppingBag size={20} /> Your Cart {count > 0 && <small>({count})</small>}
          </h3>
          <button onClick={() => setOpen(false)} aria-label="Close cart">
            <X size={22} />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="drawer__empty">
            <div className="drawer__emoji">🥣</div>
            <p>Your cart is empty.</p>
            <small>Add something fresh from our menu.</small>
            <a href="#menu" className="btn btn--primary" onClick={() => setOpen(false)}>
              Browse Menu
            </a>
          </div>
        ) : (
          <>
            <ul className="drawer__list">
              {lines.map((l) => {
                const item = MENU.find((m) => m.id === l.itemId)
                const extras = l.addons.map((id) => ADDONS.find((a) => a.id === id)?.name).filter(Boolean)
                return (
                  <li key={l.key} className="line">
                    <img src={item.image} alt="" />
                    <div className="line__info">
                      <strong>{item.name}</strong>
                      {extras.length > 0 && <small>+ {extras.join(', ')}</small>}
                      <div className="line__row">
                        <div className="stepper stepper--sm">
                          <button onClick={() => changeQty(l.key, -1)} aria-label="Decrease">
                            <Minus size={14} />
                          </button>
                          <span>{l.qty}</span>
                          <button onClick={() => changeQty(l.key, 1)} aria-label="Increase">
                            <Plus size={14} />
                          </button>
                        </div>
                        <b>₹{l.qty * lineUnitPrice(l)}</b>
                      </div>
                    </div>
                    <button className="line__remove" onClick={() => removeLine(l.key)} aria-label={`Remove ${item.name}`}>
                      <Trash2 size={16} />
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="drawer__foot">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name (optional)" maxLength={60} />
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Any note? e.g. less sweet, pickup time (optional)"
                rows={2}
                maxLength={200}
              />
              <div className="drawer__total">
                <span>Total</span>
                <b>₹{total}</b>
              </div>
              <button className="btn btn--whatsapp btn--block" onClick={order}>
                <WhatsAppIcon size={20} /> Order on WhatsApp
              </button>
              <button className="link-btn" onClick={clear}>
                Clear cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

import { useState } from 'react'
import { Plus, Minus, Check } from 'lucide-react'
import { MENU, ADDONS } from '../data'
import { useCart } from '../CartContext'

function MenuCard({ item }) {
  const { addItem, lines, changeQty } = useCart()
  const [addons, setAddons] = useState([])
  const [flash, setFlash] = useState(false)

  const extra = addons.reduce((s, id) => s + ADDONS.find((a) => a.id === id).price, 0)
  const toggle = (id) => setAddons((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  // plain (no add-on) line of this item, so the card can show a +/- stepper
  const plainKey = `${item.id}|`
  const plain = lines.find((l) => l.key === plainKey)

  const add = () => {
    addItem(item.id, addons)
    setAddons([])
    setFlash(true)
    setTimeout(() => setFlash(false), 900)
  }

  return (
    <article className="card">
      <div className="card__media">
        <img src={item.image} alt={item.name} loading="lazy" />
        <span className="card__badge">{item.badge}</span>
        <span className="card__price">₹{item.price}</span>
      </div>
      <div className="card__body">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <ul className="chips">
          {item.ingredients.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>

        <div className="addons">
          <span className="addons__title">Make it extra</span>
          <div className="addons__list">
            {ADDONS.map((a) => (
              <button
                key={a.id}
                type="button"
                className={`addon ${addons.includes(a.id) ? 'is-on' : ''}`}
                onClick={() => toggle(a.id)}
                aria-pressed={addons.includes(a.id)}
              >
                {a.name.replace('Extra ', '+ ')} <b>₹{a.price}</b>
              </button>
            ))}
          </div>
        </div>

        <div className="card__actions">
          <button className={`btn btn--primary btn--block ${flash ? 'is-done' : ''}`} onClick={add}>
            {flash ? (
              <>
                <Check size={18} /> Added
              </>
            ) : (
              <>
                <Plus size={18} /> Add to cart · ₹{item.price + extra}
              </>
            )}
          </button>
          {plain && (
            <div className="incart">
              In your cart
              <div className="stepper" aria-label={`${item.name} quantity in cart`}>
                <button onClick={() => changeQty(plain.key, -1)} aria-label="Decrease">
                  <Minus size={16} />
                </button>
                <span>{plain.qty}</span>
                <button onClick={() => changeQty(plain.key, 1)} aria-label="Increase">
                  <Plus size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default function MenuSection() {
  return (
    <section className="section" id="menu">
      <div className="container">
        <header className="section__head">
          <span className="eyebrow">Our Menu</span>
          <h2>Healthy &amp; Balanced. Every Bite Counts.</h2>
          <p>Build your order, add your favourite extras and send it straight to us on WhatsApp.</p>
        </header>
        <div className="grid">
          {MENU.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        <div className="addon-table">
          <h3>Add-ons</h3>
          <ul>
            {ADDONS.map((a) => (
              <li key={a.id}>
                <span>{a.name}</span>
                <i />
                <b>₹{a.price}</b>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingBag } from 'lucide-react'
import Logo from './Logo'
import { useCart } from '../CartContext'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/#menu', label: 'Menu', hash: true },
  { to: '/#about', label: 'About', hash: true },
  { to: '/#visit', label: 'Visit Us', hash: true },
  { to: '/contact', label: 'Contact & Feedback' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { count, setOpen: openCart } = useCart()
  const location = useLocation()

  useEffect(() => setOpen(false), [location])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <Link to="/" aria-label="Aaradhya home">
          <Logo />
        </Link>

        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {links.map((l) =>
            l.hash ? (
              <Link key={l.to} to={l.to} className="nav__link">
                {l.label}
              </Link>
            ) : (
              <NavLink key={l.to} to={l.to} end={l.end} className="nav__link">
                {l.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="nav__actions">
          <button className="cart-btn" onClick={() => openCart(true)} aria-label={`Open cart, ${count} items`}>
            <ShoppingBag size={20} />
            <span className="cart-btn__label">Cart</span>
            {count > 0 && <span className="cart-btn__badge">{count}</span>}
          </button>
          <button className="nav__toggle" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  )
}

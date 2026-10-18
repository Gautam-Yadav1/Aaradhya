import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import Contact from './pages/Contact'
import { useCart } from './CartContext'
import { useHashScroll } from './hooks'
import { ShoppingBag } from 'lucide-react'

function FloatingCart() {
  const { count, total, setOpen } = useCart()
  if (!count) return null
  return (
    <button className="cart-float" onClick={() => setOpen(true)}>
      <ShoppingBag size={20} />
      <span>
        {count} item{count > 1 ? 's' : ''} · ₹{total}
      </span>
      <b>View Cart</b>
    </button>
  )
}

export default function App() {
  const location = useLocation()
  useHashScroll(location)
  const { toast } = useCart()

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
      <FloatingCart />
      <div className={`toast ${toast ? 'is-on' : ''}`} role="status">
        {toast}
      </div>
    </>
  )
}

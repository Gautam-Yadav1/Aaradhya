import { Clock, MapPin, Sparkles } from 'lucide-react'
import { BUSINESS, MENU } from '../data'
import { WhatsAppIcon, Leaf } from './Icons'
import { useOpenStatus } from '../hooks'
import { useCart } from '../CartContext'

export default function Hero() {
  const status = useOpenStatus()
  const { setOpen } = useCart()
  const [oats, chia, sandwich] = MENU

  return (
    <section className="hero" id="home">
      <Leaf className="hero__leaf hero__leaf--1" />
      <Leaf className="hero__leaf hero__leaf--2" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <span className="pill">
            <Sparkles size={14} /> Nutrient Rich Meals
          </span>
          <h1>
            Fresh Fuel.
            <br />
            <span>Everyday.</span>
          </h1>
          <p>
            Wholesome oats bowls, creamy chia pudding and loaded peanut butter sandwiches, made fresh every morning with real,
            clean ingredients. No added sugar. Naturally good.
          </p>
          <div className="hero__cta">
            <a href="#menu" className="btn btn--primary">
              Explore Menu
            </a>
            <button className="btn btn--ghost" onClick={() => setOpen(true)}>
              <WhatsAppIcon size={18} /> View Cart & Order
            </button>
          </div>
          <ul className="hero__facts">
            <li>
              <Clock size={18} />
              <span>
                {BUSINESS.timing}
                <em className={status.open ? 'on' : 'off'}>{status.label}</em>
              </span>
            </li>
            <li>
              <MapPin size={18} />
              <span>{BUSINESS.address.split(',')[0]}, Delhi</span>
            </li>
          </ul>
        </div>

        <div className="hero__art" aria-hidden="true">
          <div className="hero__blob" />
          <img className="hero__img hero__img--main" src={oats.image} alt="" />
          <img className="hero__img hero__img--a" src={chia.image} alt="" />
          <img className="hero__img hero__img--b" src={sandwich.image} alt="" />
          <div className="hero__tag hero__tag--price">
            from <b>₹59</b>
          </div>
          <div className="hero__tag hero__tag--fresh">100% Fresh</div>
        </div>
      </div>
    </section>
  )
}

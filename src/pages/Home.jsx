import { Leaf as LeafIcon, ShieldCheck, Dumbbell, HeartHandshake, Zap, Clock, MapPin, Phone, Navigation } from 'lucide-react'
import Hero from '../components/Hero'
import MenuSection from '../components/MenuSection'
import { BUSINESS } from '../data'
import { InstagramIcon, WhatsAppIcon } from '../components/Icons'
import { useOpenStatus } from '../hooks'
import { Link } from 'react-router-dom'

const features = [
  { icon: LeafIcon, title: 'Fresh Ingredients', text: 'Fruits, seeds and dry fruits picked and prepped fresh every morning.' },
  { icon: ShieldCheck, title: 'Clean Ingredients', text: 'Real food you can recognise. No shortcuts, no nasties.' },
  { icon: Dumbbell, title: 'High Protein', text: 'Peanut butter, oats, chia and seeds to keep you fuelled for hours.' },
  { icon: HeartHandshake, title: 'No Added Sugar', text: 'Sweetened naturally with fruits and a drizzle of honey.' },
]

const steps = [
  { n: '1', title: 'Pick your meal', text: 'Choose from oats, chia pudding, sandwiches and more.' },
  { n: '2', title: 'Add extras', text: 'Top up with peanut butter, dry fruits, seeds or honey.' },
  { n: '3', title: 'Send on WhatsApp', text: 'Your cart goes to us as a ready-made message. We confirm instantly.' },
]

export default function Home() {
  const status = useOpenStatus()
  return (
    <>
      <Hero />

      <section className="features">
        <div className="container features__grid">
          {features.map((f) => (
            <div key={f.title} className="feature">
              <span className="feature__icon">
                <f.icon size={24} />
              </span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <MenuSection />

      <section className="section section--tint" id="about">
        <div className="container about">
          <div className="about__copy">
            <span className="eyebrow">About Aaradhya</span>
            <h2>Real ingredients. Nutrient rich. Stay energized.</h2>
            <p>
              Aaradhya is a neighbourhood breakfast corner in New Ashok Nagar built around one simple idea: a good day starts
              with good fuel. Every bowl and sandwich is put together fresh with fruits, seeds, dry fruits, peanut butter and
              honey, with nothing artificial and no added sugar.
            </p>
            <ul className="ticks">
              <li><Zap size={18} /> Nutrient rich, energy packed</li>
              <li><LeafIcon size={18} /> Real, clean, fresh ingredients</li>
              <li><HeartHandshake size={18} /> Pure. Tasty. Healthy.</li>
            </ul>
          </div>
          <div className="steps">
            <h3>How ordering works</h3>
            {steps.map((s) => (
              <div key={s.n} className="step">
                <span>{s.n}</span>
                <div>
                  <strong>{s.title}</strong>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="visit">
        <div className="container">
          <header className="section__head">
            <span className="eyebrow">Visit Us</span>
            <h2>Come hungry, leave energized</h2>
          </header>
          <div className="visit">
            <div className="visit__info">
              <div className="info">
                <MapPin size={22} />
                <div>
                  <strong>Find us</strong>
                  <p>
                    {BUSINESS.address}
                    <br />
                    {BUSINESS.landmark}
                  </p>
                  <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                    <Navigation size={14} /> Get directions
                  </a>
                </div>
              </div>
              <div className="info">
                <Clock size={22} />
                <div>
                  <strong>Timing</strong>
                  <p>
                    {BUSINESS.timing} <em className={`status ${status.open ? 'on' : 'off'}`}>{status.label}</em>
                  </p>
                </div>
              </div>
              <div className="info">
                <Phone size={22} />
                <div>
                  <strong>Call &amp; WhatsApp</strong>
                  <p>
                    <a href={`tel:+91${BUSINESS.phone}`}>{BUSINESS.phone}</a>
                  </p>
                </div>
              </div>
              <div className="info">
                <InstagramIcon size={22} />
                <div>
                  <strong>Instagram</strong>
                  <p>
                    {BUSINESS.instagram.map((i, idx) => (
                      <span key={i.handle}>
                        {idx > 0 && ' & '}
                        <a href={i.url} target="_blank" rel="noopener noreferrer">@{i.handle}</a>
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <div className="visit__btns">
                <a className="btn btn--whatsapp" href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon size={18} /> WhatsApp
                </a>
                <Link className="btn btn--ghost-dark" to="/contact">Send feedback</Link>
              </div>
            </div>
            <div className="visit__map">
              <iframe title="Aaradhya location map" src={BUSINESS.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

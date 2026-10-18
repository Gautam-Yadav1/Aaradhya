import { Link } from 'react-router-dom'
import { Phone, MapPin, Clock } from 'lucide-react'
import Logo from './Logo'
import { BUSINESS } from '../data'
import { InstagramIcon, WhatsAppIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Logo light />
          <p className="footer__about">Nutrient-rich, freshly made meals to start your day right. Real ingredients. No added sugar.</p>
          <div className="footer__social">
            {BUSINESS.instagram.map((i) => (
              <a key={i.handle} href={i.url} target="_blank" rel="noopener noreferrer">
                <InstagramIcon size={16} /> @{i.handle}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/#menu">Menu</Link></li>
            <li><Link to="/#about">About</Link></li>
            <li><Link to="/#visit">Visit Us</Link></li>
            <li><Link to="/contact">Contact &amp; Feedback</Link></li>
          </ul>
        </div>

        <div>
          <h4>Get in touch</h4>
          <ul className="footer__contact">
            <li><Phone size={16} /> <a href={`tel:+91${BUSINESS.phone}`}>{BUSINESS.phone}</a></li>
            <li>
              <WhatsAppIcon size={16} />
              <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
            </li>
            <li><MapPin size={16} /> {BUSINESS.address}, {BUSINESS.landmark}</li>
            <li><Clock size={16} /> {BUSINESS.timing}</li>
          </ul>
        </div>
      </div>
      <div className="footer__bar">
        <div className="container">© {new Date().getFullYear()} Aaradhya. Fresh Fuel. Everyday.</div>
      </div>
    </footer>
  )
}

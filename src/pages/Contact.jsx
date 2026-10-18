import { useState } from 'react'
import { Send, CheckCircle2, AlertCircle, Star, Phone, MapPin, Clock } from 'lucide-react'
import { BUSINESS } from '../data'
import { WhatsAppIcon, InstagramIcon } from '../components/Icons'

// FormSubmit (https://formsubmit.co) is a free service that forwards form posts to an email inbox.
// The very first submission triggers a one-time activation email to this address.
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/bfa29ad336170811d6010c3f8529c863'

const initial = { name: '', mobile: '', email: '', topic: 'Feedback', rating: 0, message: '', website: '' }

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name'
  if (!/^(\+?91)?[6-9]\d{9}$/.test(v.mobile.replace(/[\s-]/g, ''))) e.mobile = 'Enter a valid 10-digit mobile number'
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Enter a valid email address'
  if (v.message.trim().length < 5) e.message = 'Please write a short message'
  return e
}

export default function Contact() {
  const [v, setV] = useState(initial)
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const set = (k) => (e) => setV((p) => ({ ...p, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (v.website) return // honeypot: bots fill hidden fields
    const errs = validate(v)
    setErrors(errs)
    if (Object.keys(errs).length) return

    setState('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Name: v.name.trim(),
          Mobile: v.mobile.trim(),
          Email: v.email.trim() || 'Not provided',
          Topic: v.topic,
          Rating: v.rating ? `${v.rating} / 5` : 'Not rated',
          Message: v.message.trim(),
          _subject: `Aaradhya website: ${v.topic} from ${v.name.trim()}`,
          _template: 'table',
          _captcha: 'false',
          ...(v.email ? { _replyto: v.email.trim() } : {}),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data.success === 'false' || data.success === false) throw new Error(data.message || 'Request failed')
      setState('success')
      setV(initial)
    } catch (err) {
      setErrorMsg(err instanceof TypeError ? 'Network problem. Check your internet connection and try again.' : err.message)
      setState('error')
    }
  }

  return (
    <div className="page contact">
      <div className="page__hero">
        <div className="container">
          <span className="eyebrow eyebrow--light">Contact &amp; Feedback</span>
          <h1>We'd love to hear from you</h1>
          <p>Questions, bulk orders or feedback on your last meal. Drop us a message and we'll get back to you.</p>
        </div>
      </div>

      <div className="container contact__grid">
        <form className="form" onSubmit={submit} noValidate>
          {state === 'success' ? (
            <div className="form__success">
              <CheckCircle2 size={48} />
              <h3>Thank you!</h3>
              <p>Your message has been sent. We'll get back to you shortly.</p>
              <button type="button" className="btn btn--primary" onClick={() => setState('idle')}>
                Send another message
              </button>
            </div>
          ) : (
            <>
              <div className="form__row">
                <label className={errors.name ? 'has-error' : ''}>
                  <span>Full name *</span>
                  <input value={v.name} onChange={set('name')} placeholder="Your name" autoComplete="name" />
                  {errors.name && <small>{errors.name}</small>}
                </label>
                <label className={errors.mobile ? 'has-error' : ''}>
                  <span>Mobile number *</span>
                  <input value={v.mobile} onChange={set('mobile')} placeholder="98765 43210" inputMode="tel" autoComplete="tel" />
                  {errors.mobile && <small>{errors.mobile}</small>}
                </label>
              </div>

              <div className="form__row">
                <label className={errors.email ? 'has-error' : ''}>
                  <span>Email</span>
                  <input type="email" value={v.email} onChange={set('email')} placeholder="you@example.com" autoComplete="email" />
                  {errors.email && <small>{errors.email}</small>}
                </label>
                <label>
                  <span>Topic</span>
                  <select value={v.topic} onChange={set('topic')}>
                    <option>Feedback</option>
                    <option>Question</option>
                    <option>Bulk / Party order</option>
                    <option>Complaint</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>

              <div className="form__rating">
                <span>How was your experience?</span>
                <div role="radiogroup" aria-label="Rating">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      role="radio"
                      aria-checked={v.rating === n}
                      aria-label={`${n} star${n > 1 ? 's' : ''}`}
                      className={n <= v.rating ? 'is-on' : ''}
                      onClick={() => setV((p) => ({ ...p, rating: p.rating === n ? 0 : n }))}
                    >
                      <Star size={26} />
                    </button>
                  ))}
                </div>
              </div>

              <label className={errors.message ? 'has-error' : ''}>
                <span>Message *</span>
                <textarea rows={5} value={v.message} onChange={set('message')} placeholder="Tell us what's on your mind…" />
                {errors.message && <small>{errors.message}</small>}
              </label>

              {/* honeypot */}
              <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={v.website} onChange={set('website')} />

              {state === 'error' && (
                <div className="form__error">
                  <AlertCircle size={18} /> {errorMsg || "Couldn't send right now."} You can also message us on WhatsApp.
                </div>
              )}

              <button className="btn btn--primary btn--block" disabled={state === 'sending'}>
                {state === 'sending' ? (
                  'Sending…'
                ) : (
                  <>
                    <Send size={18} /> Send message
                  </>
                )}
              </button>
            </>
          )}
        </form>

        <aside className="contact__side">
          <div className="side-card">
            <h3>Reach us directly</h3>
            <ul>
              <li><Phone size={18} /><a href={`tel:+91${BUSINESS.phone}`}>{BUSINESS.phone}</a></li>
              <li>
                <WhatsAppIcon size={18} />
                <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              </li>
              <li><MapPin size={18} /><span>{BUSINESS.address}, {BUSINESS.landmark}</span></li>
              <li><Clock size={18} /><span>{BUSINESS.timing}</span></li>
              {BUSINESS.instagram.map((i) => (
                <li key={i.handle}>
                  <InstagramIcon size={18} />
                  <a href={i.url} target="_blank" rel="noopener noreferrer">@{i.handle}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="side-card side-card--map">
            <iframe title="Aaradhya location map" src={BUSINESS.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </aside>
      </div>
    </div>
  )
}

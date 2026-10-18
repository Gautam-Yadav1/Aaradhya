import { BUSINESS } from '../data'
import { WhatsAppIcon } from './Icons'

export default function WhatsAppFloat() {
  const href = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hello Aaradhya! I have a question.')}`
  return (
    <a className="wa-float" href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
      <WhatsAppIcon size={30} />
      <span className="wa-float__tip">Chat with us</span>
    </a>
  )
}

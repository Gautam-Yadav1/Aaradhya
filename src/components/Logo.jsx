import { Leaf } from './Icons'

export default function Logo({ light = false }) {
  return (
    <span className={`logo ${light ? 'logo--light' : ''}`}>
      <Leaf className="logo__leaf" />
      <span className="logo__text">
        <strong>AARADHYA</strong>
        <small>Fresh Fuel. Everyday.</small>
      </span>
    </span>
  )
}

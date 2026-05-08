import { useGlitch } from '../hooks/useGlitch'
import styles from './GlitchText.module.css'

export default function GlitchText({ text, as: Tag = 'span', className = '', interval = 3500 }) {
  const { display, ghost1, ghost2 } = useGlitch(text, interval)

  return (
    <Tag className={`${styles.wrap} ${className}`}>
      {display}
      <span
        className={styles.ghost}
        style={{
          color: '#ff003c',
          transform: `translate(${ghost1.x}px, ${ghost1.y}px)`,
          clipPath: ghost1.clip,
          opacity: ghost1.opacity,
        }}
      >
        {ghost1.text}
      </span>
      <span
        className={styles.ghost}
        style={{
          color: '#00ffe1',
          transform: `translate(${ghost2.x}px, ${ghost2.y}px)`,
          clipPath: ghost2.clip,
          opacity: ghost2.opacity,
        }}
      >
        {ghost2.text}
      </span>
    </Tag>
  )
}

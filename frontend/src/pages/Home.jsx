import { useState } from 'react'
import ShortenerForm from '../components/ShortenerForm'
import ResultCard from '../components/ResultCard'
import GlitchText from '../components/GlitchText'
import styles from './Home.module.css'

export default function Home() {
  const [result, setResult] = useState(null)

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.corners}>
          <span className={`${styles.corner} ${styles.tl}`} />
          <span className={`${styles.corner} ${styles.tr}`} />
          <span className={`${styles.corner} ${styles.bl}`} />
          <span className={`${styles.corner} ${styles.br}`} />
        </div>
        <GlitchText
          text="LinkDo"
          as="h1"
          className={styles.title}
          interval={3500}
        />
        <p className={styles.sub}>// Acorta y comparte tus links de mejor forma.</p>
      </header>

      <ShortenerForm onResult={setResult} />
      {result && <ResultCard result={result} />}
    </div>
  )
}

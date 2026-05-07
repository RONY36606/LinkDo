import { useState } from 'react'
import ShortenerForm from '../components/ShortenerForm'
import ResultCard from '../components/ResultCard'
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
        <h1 className={styles.title} data-text="CYBERNETIC URL SHORTENER">CYBERNETIC URL SHORTENER</h1>
        <p className={styles.sub}>// Comprime. Comparte. Traza.</p>
      </header>

      <ShortenerForm onResult={setResult} />

      {result && <ResultCard result={result} />}
    </div>
  )
}

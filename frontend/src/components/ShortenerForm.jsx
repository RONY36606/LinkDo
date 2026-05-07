import { useState } from 'react'
import api from '../lib/api'
import styles from './ShortenerForm.module.css'

export default function ShortenerForm({ onResult }) {
  const [url, setUrl] = useState('')
  const [slug, setSlug] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setError('// ERROR: URL debe comenzar con http:// o https://')
      return
    }
    setLoading(true)
    try {
      const res = await api.post('/links', { url, slug: slug || undefined })
      onResult(res.data)
      setUrl('')
      setSlug('')
    } catch (e) {
      setError(e.response?.data?.error || '// ERROR: No se pudo acortar el enlace')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.panel}>
      <div className={styles.label}>// Acortar enlace</div>

      <div className={styles.inputRow}>
        <input
          className={styles.input}
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="https://url-muy-larga.com/con/muchos/parametros"
        />
        <button
          className={styles.btn}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'PROCESANDO...' : 'EJECUTAR'}
        </button>
      </div>

      <div className={styles.customRow}>
        <div className={styles.prefix}>link.do/</div>
        <input
          className={`${styles.input} ${styles.slug}`}
          type="text"
          value={slug}
          onChange={e => setSlug(e.target.value.replace(/[^a-z0-9-]/gi, ''))}
          placeholder="slug-personalizado (opcional)"
          maxLength={20}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

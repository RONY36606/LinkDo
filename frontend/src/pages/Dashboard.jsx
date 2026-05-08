import { useEffect, useState } from 'react'
import api from '../lib/api'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/links')
      .then(r => setLinks(r.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const totalClicks = links.reduce((a, l) => a + (l.clicks || 0), 0)

  return (
    <div>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statVal}>{links.length}</div>
          <div className={styles.statLabel}>// Links activos</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statVal}>{totalClicks}</div>
          <div className={styles.statLabel}>// Total clics</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statVal}>{links.length ? Math.round(totalClicks / links.length) : 0}</div>
          <div className={styles.statLabel}>// Promedio clics</div>
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.label}>// Historial de enlaces</div>

        {loading && <p className={styles.empty}>// Cargando...</p>}
        {!loading && !links.length && <p className={styles.empty}>// Sin registros aún</p>}

        {!loading && links.map(link => (
          <div key={link.id} className={styles.row}>
            <span className={styles.slug}>linkdoapp.vercel.app/{link.slug}</span>
            <span className={styles.orig}>{link.url}</span>
            <span className={styles.clicks}>{link.clicks} CLICS</span>
            <span className={styles.badge}>ACTIVO</span>
          </div>
        ))}
      </div>
    </div>
  )
}

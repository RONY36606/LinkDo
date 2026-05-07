import { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import styles from './ResultCard.module.css'

export default function ResultCard({ result }) {
  const [showQR, setShowQR] = useState(false)
  const [copied, setCopied] = useState(false)

  const shortUrl = `${import.meta.env.VITE_BASE_URL || 'https://link.do'}/${result.slug}`

  const copy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadQR = () => {
    const canvas = document.getElementById('qr-canvas')
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.download = `qr-${result.slug}.png`
    a.href = url
    a.click()
  }

  return (
    <div className={styles.panel}>
      <div className={styles.label}>// Enlace generado</div>

      <div className={styles.resultRow}>
        <span className={styles.url}>{shortUrl}</span>
        <div className={styles.actions}>
          <button className={styles.actionBtn} onClick={copy}>
            {copied ? '✓ COPIADO' : 'COPIAR'}
          </button>
          <button className={styles.actionBtn} onClick={() => setShowQR(v => !v)}>
            {showQR ? 'OCULTAR QR' : 'VER QR'}
          </button>
        </div>
      </div>

      <div className={styles.meta}>
        <span>ORIGINAL: <span className={styles.metaVal}>{result.url.slice(0, 60)}{result.url.length > 60 ? '…' : ''}</span></span>
        <span>CREADO: <span className={styles.metaVal}>{new Date(result.createdAt).toLocaleDateString('es-GT')}</span></span>
      </div>

      {showQR && (
        <div className={styles.qrSection}>
          <div className={styles.qrWrap}>
            <QRCodeCanvas
              id="qr-canvas"
              value={shortUrl}
              size={128}
              bgColor="#ffffff"
              fgColor="#000000"
              level="M"
            />
          </div>
          <div className={styles.qrInfo}>
            <div className={styles.label}>// Código QR</div>
            <p className={styles.qrMeta}>Apunta a: <b>{shortUrl}</b></p>
            <p className={styles.qrMeta}>Tamaño: <b>128 × 128 px</b></p>
            <button className={styles.actionBtn} onClick={downloadQR} style={{ marginTop: '0.75rem' }}>
              DESCARGAR PNG
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

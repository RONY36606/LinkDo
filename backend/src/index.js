import express from 'express'
import cors from 'cors'
import linksRouter from './routes/links.js'
import { initDB, getLink, incrementClicks } from './db.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/links', linksRouter)

// Redirect short links
app.get('/:slug', async (req, res) => {
  try {
    const link = await getLink(req.params.slug)
    if (!link) return res.status(404).json({ error: 'Enlace no encontrado' })
    await incrementClicks(link.id)
    res.redirect(301, link.url)
  } catch (e) {
    res.status(500).json({ error: 'Error interno' })
  }
})

// Arrancar servidor después de inicializar DB
initDB()
  .then(() => {
    app.listen(PORT, () => console.log(`[LINK.DO] Backend corriendo en http://localhost:${PORT}`))
  })
  .catch(err => {
    console.error('[DB] Error al inicializar:', err)
    process.exit(1)
  })

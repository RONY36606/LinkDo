import express from 'express'
import cors from 'cors'
import linksRouter from './routes/links.js'
import { initDB } from './db.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }))
app.use(express.json())

// API routes
app.use('/api/links', linksRouter)

// Redirect short links
app.get('/:slug', async (req, res) => {
  const { getLink, incrementClicks } = await import('./db.js')
  const link = getLink(req.params.slug)
  if (!link) return res.status(404).json({ error: 'Enlace no encontrado' })
  incrementClicks(link.id)
  res.redirect(301, link.url)
})

initDB()
app.listen(PORT, () => console.log(`[LINK.DO] Backend corriendo en http://localhost:${PORT}`))

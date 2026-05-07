import { Router } from 'express'
import { nanoid } from 'nanoid'
import { createLink, getLink, getAllLinks, deleteLink } from '../db.js'

const router = Router()

// GET /api/links — listar todos
router.get('/', (req, res) => {
  const links = getAllLinks()
  res.json(links)
})

// POST /api/links — crear link corto
router.post('/', (req, res) => {
  const { url, slug } = req.body

  if (!url) return res.status(400).json({ error: 'La URL es requerida' })

  try { new URL(url) } catch {
    return res.status(400).json({ error: 'URL inválida' })
  }

  const finalSlug = slug || nanoid(6)

  // Validar slug
  if (!/^[a-zA-Z0-9_-]+$/.test(finalSlug)) {
    return res.status(400).json({ error: 'El slug solo puede tener letras, números, guiones y guiones bajos' })
  }

  // Verificar si el slug ya existe
  if (getLink(finalSlug)) {
    return res.status(409).json({ error: 'El slug ya está en uso' })
  }

  const link = createLink({ slug: finalSlug, url })
  res.status(201).json(link)
})

// DELETE /api/links/:id — eliminar link
router.delete('/:id', (req, res) => {
  deleteLink(Number(req.params.id))
  res.json({ ok: true })
})

export default router

import { Router } from 'express'
import { nanoid } from 'nanoid'
import { createLink, getLink, getAllLinks, deleteLink } from '../db.js'

const router = Router()

// GET /api/links
router.get('/', async (req, res) => {
  try {
    const links = await getAllLinks()
    res.json(links)
  } catch (e) {
    res.status(500).json({ error: 'Error al obtener links' })
  }
})

// POST /api/links
router.post('/', async (req, res) => {
  const { url, slug } = req.body

  if (!url) return res.status(400).json({ error: 'La URL es requerida' })
  try { new URL(url) } catch {
    return res.status(400).json({ error: 'URL inválida' })
  }

  const finalSlug = slug || nanoid(6)

  if (!/^[a-zA-Z0-9_-]+$/.test(finalSlug)) {
    return res.status(400).json({ error: 'Slug inválido' })
  }

  try {
    const existing = await getLink(finalSlug)
    if (existing) return res.status(409).json({ error: 'El slug ya está en uso' })

    const link = await createLink({ slug: finalSlug, url })
    res.status(201).json(link)
  } catch (e) {
    res.status(500).json({ error: 'Error al crear el link' })
  }
})

// DELETE /api/links/:id
router.delete('/:id', async (req, res) => {
  try {
    await deleteLink(Number(req.params.id))
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: 'Error al eliminar' })
  }
})

export default router

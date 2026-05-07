// Node.js 22.5+ incluye SQLite de forma nativa en node:sqlite
// No requiere instalar nada ni compilar código nativo
import { DatabaseSync } from 'node:sqlite'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '../../data')
const DB_PATH = path.join(DATA_DIR, 'linkdo.db')

let db

export function initDB() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })

  db = new DatabaseSync(DB_PATH)
  db.exec(`
    CREATE TABLE IF NOT EXISTS links (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      slug      TEXT    NOT NULL UNIQUE,
      url       TEXT    NOT NULL,
      clicks    INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
    )
  `)
  console.log('[DB] SQLite nativo inicializado en', DB_PATH)
}

export function createLink({ slug, url }) {
  db.prepare('INSERT INTO links (slug, url) VALUES (?, ?)').run(slug, url)
  return getLink(slug)
}

export function getLink(slug) {
  return db.prepare('SELECT * FROM links WHERE slug = ?').get(slug)
}

export function getLinkById(id) {
  return db.prepare('SELECT * FROM links WHERE id = ?').get(id)
}

export function getAllLinks() {
  return db.prepare('SELECT * FROM links ORDER BY createdAt DESC').all()
}

export function incrementClicks(id) {
  db.prepare('UPDATE links SET clicks = clicks + 1 WHERE id = ?').run(id)
}

export function deleteLink(id) {
  db.prepare('DELETE FROM links WHERE id = ?').run(id)
}

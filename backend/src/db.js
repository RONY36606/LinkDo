import { createClient } from '@libsql/client'

let db

export function initDB() {
  db = createClient({
    url: process.env.TURSO_URL,
    authToken: process.env.TURSO_TOKEN,
  })

  console.log('[DB] Turso client inicializado')
  return setupTables()
}

async function setupTables() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS links (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      slug      TEXT    NOT NULL UNIQUE,
      url       TEXT    NOT NULL,
      clicks    INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
    )
  `)
  console.log('[DB] Tabla links lista')
}

export async function createLink({ slug, url }) {
  await db.execute({
    sql: 'INSERT INTO links (slug, url) VALUES (?, ?)',
    args: [slug, url],
  })
  return getLink(slug)
}

export async function getLink(slug) {
  const res = await db.execute({
    sql: 'SELECT * FROM links WHERE slug = ?',
    args: [slug],
  })
  return res.rows[0] ?? null
}

export async function getAllLinks() {
  const res = await db.execute('SELECT * FROM links ORDER BY createdAt DESC')
  return res.rows
}

export async function incrementClicks(id) {
  await db.execute({
    sql: 'UPDATE links SET clicks = clicks + 1 WHERE id = ?',
    args: [id],
  })
}

export async function deleteLink(id) {
  await db.execute({
    sql: 'DELETE FROM links WHERE id = ?',
    args: [id],
  })
}

# LINK.DO — Cybernetic URL Shortener

Acortador de enlaces con generador de QR integrado.  
Stack: React + Vite (frontend) · Express + SQLite (backend)

---

## Estructura

```
nxlink/
├── frontend/          # React + Vite + CSS Modules
│   └── src/
│       ├── components/   # ShortenerForm, ResultCard, Layout
│       ├── pages/        # Home, Dashboard
│       └── lib/          # api.js (axios)
└── backend/           # Express + better-sqlite3
    ├── src/
    │   ├── routes/    # links.js
    │   ├── db.js      # SQLite helpers
    │   └── index.js   # Entry point
    └── data/          # nxlink.db (auto-generado)
```

---

## Instalación y uso

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
# → http://localhost:5173
```

### Backend
```bash
cd backend
npm install
mkdir data
cp .env.example .env
npm run dev
# → http://localhost:3001
```

---

## API Endpoints

| Método | Ruta              | Descripción              |
|--------|-------------------|--------------------------|
| GET    | /api/links        | Listar todos los links   |
| POST   | /api/links        | Crear link corto         |
| DELETE | /api/links/:id    | Eliminar link            |
| GET    | /:slug            | Redirigir al URL original|

### POST /api/links
```json
// Request
{ "url": "https://ejemplo.com/muy/largo", "slug": "mi-slug" }

// Response 201
{ "id": 1, "slug": "mi-slug", "url": "...", "clicks": 0, "createdAt": "..." }
```

---

## Variables de entorno

**Frontend** (`.env`)
```
VITE_API_URL=http://localhost:3001/api
VITE_BASE_URL=https://nxlink.io
```

**Backend** (`.env`)
```
PORT=3001
FRONTEND_URL=http://localhost:5173
```

---

## Deploy sugerido

- **Frontend** → [Vercel](https://vercel.com) (`npm run build` → dist/)
- **Backend** → [Railway](https://railway.app) o [Fly.io](https://fly.io)
- **DB producción** → Migrar a [Turso](https://turso.tech) (SQLite en la nube) o PostgreSQL
# LinkDo

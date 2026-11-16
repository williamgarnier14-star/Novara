// Avis clients : GET (avis publiés), POST (nouvel avis en attente),
// GET ?admin=MOT_DE_PASSE et PATCH (modération).
//
// Stockage : base Redis Upstash (gratuite), à connecter dans Vercel :
//   Vercel > projet > Storage > Upstash for Redis > Connect
// Variables utilisées (créées automatiquement par Vercel) :
//   KV_REST_API_URL et KV_REST_API_TOKEN (ou UPSTASH_REDIS_REST_URL / _TOKEN)
// Mot de passe de modération : variable ADMIN_PASSWORD à ajouter dans Vercel.

const KEY = 'novara:avis'
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

async function redis(...command) {
  const res = await fetch(URL_, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  })
  if (!res.ok) throw new Error(`Redis ${res.status}`)
  return (await res.json()).result
}

async function readAll() {
  const raw = await redis('GET', KEY)
  return raw ? JSON.parse(raw) : []
}
const writeAll = (list) => redis('SET', KEY, JSON.stringify(list))

const clean = (s, max) => String(s ?? '').replace(/[<>]/g, '').trim().slice(0, max)

export default async function handler(req, res) {
  if (!URL_ || !TOKEN) {
    // Stockage pas encore branché : le site s'affiche quand même, sans avis.
    if (req.method === 'GET' && !req.query.admin) return res.status(200).json({ avis: [] })
    return res.status(503).json({ error: 'Stockage des avis non configuré.' })
  }

  const admin = process.env.ADMIN_PASSWORD
  try {
    if (req.method === 'GET') {
      const list = await readAll()
      if (req.query.admin !== undefined) {
        if (!admin || req.query.admin !== admin) return res.status(401).json({ error: 'Non autorisé' })
        return res.status(200).json({ avis: list })
      }
      const publics = list
        .filter((a) => a.status === 'approved')
        .map(({ id, name, rating, comment }) => ({ id, name, rating, comment }))
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
      return res.status(200).json({ avis: publics })
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
      const name = clean(body.name, 60)
      const comment = clean(body.comment, 500)
      const rating = Math.round(Number(body.rating))
      if (!name || !comment || !(rating >= 1 && rating <= 5)) return res.status(400).json({ error: 'Avis incomplet' })
      const list = await readAll()
      list.unshift({ id: crypto.randomUUID(), name, rating, comment, status: 'pending', createdAt: new Date().toISOString() })
      await writeAll(list.slice(0, 500))
      return res.status(201).json({ ok: true })
    }

    if (req.method === 'PATCH') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
      if (!admin || body.password !== admin) return res.status(401).json({ error: 'Non autorisé' })
      const list = await readAll()
      const next =
        body.action === 'approve'
          ? list.map((a) => (a.id === body.id ? { ...a, status: 'approved' } : a))
          : list.filter((a) => a.id !== body.id)
      await writeAll(next)
      return res.status(200).json({ ok: true })
    }

    res.setHeader('Allow', 'GET, POST, PATCH')
    return res.status(405).json({ error: 'Méthode non autorisée' })
  } catch {
    return res.status(500).json({ error: 'Erreur serveur' })
  }
}

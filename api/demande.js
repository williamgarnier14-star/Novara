// Réception des formulaires « Projet web » et « Automatisations & IA »
// puis enregistrement dans le CRM RTB d'Agence Novara.
//
// Les identifiants du CRM restent ici, côté serveur (variables d'environnement Vercel) :
//   RTB_API_URL      URL de l'API RTB qui enregistre une demande (obligatoire)
//   RTB_API_KEY      clé ou jeton d'accès RTB (obligatoire)
//   RTB_AUTH_HEADER  nom de l'en-tête d'authentification (facultatif, défaut : Authorization)
//   RTB_AUTH_PREFIX  préfixe du jeton (facultatif, défaut : « Bearer »)
//
// Le format exact attendu par RTB (« mapping » des champs, rattachement au contact existant,
// événement « nouvelle demande ») est à confirmer : voir docs/raccordement-rtb.md.
// En attendant, la demande est envoyée dans le format générique ci-dessous.

const TYPES = {
  'projet-web': {
    label: 'Projet web',
    required: ['nom', 'email', 'telephone', 'activite', 'message'],
    questions: {
      nom: 'Prénom et nom',
      activite: 'Activité',
      email: 'E-mail',
      telephone: 'Téléphone',
      formule: 'Formule envisagée',
      message: 'Votre projet',
    },
  },
  automatisations: {
    label: 'Automatisations & IA',
    required: ['nom', 'activite', 'email', 'telephone', 'organisation', 'tache'],
    questions: {
      nom: 'Prénom et nom',
      activite: 'Activité',
      email: 'E-mail',
      telephone: 'Téléphone',
      entreprise: 'Entreprise ou nom commercial',
      organisation: 'Vous travaillez seul ou en équipe ?',
      equipe: 'Si vous êtes en équipe, combien de personnes et quels services sont concernés ?',
      tache: 'Pensez à une tâche qui revient souvent. Comment la faites-vous aujourd’hui et qu’est-ce qui vous prend le plus de temps ?',
      outils: 'Quels outils utilisez-vous aujourd’hui ?',
    },
  },
}

const MAX = 3000
const clean = (v) => String(v ?? '').replace(/\u0000/g, '').trim().slice(0, MAX)
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

export function buildPayload(body, now = new Date()) {
  const def = TYPES[body.type]
  const data = {}
  for (const key of Object.keys(def.questions)) data[key] = clean(body[key])
  if (data.organisation !== 'En équipe') delete data.equipe

  return {
    evenement: 'nouvelle_demande',
    contact: {
      // L'e-mail sert de clé pour rattacher la demande à un contact existant
      cle: data.email.toLowerCase(),
      nom: data.nom,
      email: data.email.toLowerCase(),
      telephone: data.telephone,
      entreprise: data.entreprise || '',
      activite: data.activite,
    },
    demande: {
      type: def.label,
      type_code: body.type,
      source: clean(body.source).slice(0, 500) || 'agencenovara.fr',
      date_envoi: now.toISOString(),
      reponses: Object.entries(def.questions)
        .filter(([k]) => data[k] !== undefined && data[k] !== '')
        .map(([k, question]) => ({ champ: k, question, reponse: data[k] })),
    },
  }
}

export function validate(body) {
  const def = TYPES[body?.type]
  if (!def) return 'Type de formulaire inconnu.'
  for (const k of def.required) if (!clean(body[k])) return `Champ obligatoire manquant : ${def.questions[k]}`
  if (!isEmail(clean(body.email))) return 'Adresse e-mail invalide.'
  if (body.type === 'automatisations' && !['Seul', 'En équipe'].includes(clean(body.organisation))) return 'Organisation invalide.'
  return null
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Méthode non autorisée' })
  }
  let body = req.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body || '{}') } catch { return res.status(400).json({ ok: false, error: 'Requête invalide' }) }
  }
  body = body || {}

  // Champ piège rempli : c'est un robot, on ne fait rien
  if (clean(body.website)) return res.status(200).json({ ok: true })

  const error = validate(body)
  if (error) return res.status(400).json({ ok: false, error })

  const missing = ['RTB_API_URL', 'RTB_API_KEY'].filter((k) => !process.env[k])
  if (missing.length) {
    console.error('CRM RTB non configuré. Variables manquantes :', missing.join(', '))
    return res.status(503).json({ ok: false, error: 'Enregistrement momentanément indisponible.' })
  }

  const payload = buildPayload(body)
  const header = process.env.RTB_AUTH_HEADER || 'Authorization'
  const prefix = process.env.RTB_AUTH_PREFIX ?? 'Bearer'
  try {
    const crm = await fetch(process.env.RTB_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [header]: prefix ? `${prefix} ${process.env.RTB_API_KEY}` : process.env.RTB_API_KEY,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    })
    if (!crm.ok) {
      console.error('RTB a refusé la demande', crm.status, (await crm.text()).slice(0, 300))
      return res.status(502).json({ ok: false, error: 'Enregistrement refusé par le CRM.' })
    }
    // Succès confirmé par RTB : seulement maintenant le visiteur voit le message de confirmation
    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error('RTB injoignable', e?.message)
    return res.status(502).json({ ok: false, error: 'CRM injoignable.' })
  }
}

import { useEffect, useState } from 'react'
import { CheckCircle2, LoaderCircle, RotateCcw } from 'lucide-react'
import { inputCls, card } from './ui.jsx'
import { PLANS } from '../content.js'

// Envoi vers /api/demande, qui enregistre la demande dans le CRM RTB.
// Le message de succès ne s'affiche qu'après confirmation de l'enregistrement.
// En cas d'échec, les réponses restent dans le formulaire pour réessayer.
async function sendDemande(type, data) {
  const res = await fetch('/api/demande', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type,
      source: typeof window !== 'undefined' ? window.location.href : '',
      ...data,
    }),
  })
  let body = {}
  try { body = await res.json() } catch { /* réponse vide */ }
  if (!res.ok || !body.ok) throw new Error(body.error || 'Échec de l’enregistrement')
  return body
}

function Field({ id, label, required, hint, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-semibold text-white">
        {label}
        {required ? <span className="text-blue-soft"> *</span> : <span className="font-normal text-slate-body"> (facultatif)</span>}
      </label>
      {children}
      {hint && <p className="text-[12.5px] leading-relaxed text-slate-body">{hint}</p>}
    </div>
  )
}

function useSubmit(type) {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [error, setError] = useState('')
  async function submit(data) {
    setStatus('sending')
    setError('')
    try {
      await sendDemande(type, data)
      setStatus('success')
    } catch {
      setStatus('error')
      setError('L’envoi n’a pas abouti. Vos réponses sont conservées : vérifiez votre connexion puis réessayez. Vous pouvez aussi nous écrire à contact@agencenovara.fr.')
    }
  }
  return { status, error, submit }
}

function Honeypot({ id, value, onChange }) {
  // Champ invisible pour bloquer les robots de spam
  return (
    <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
      <label htmlFor={id}>Ne pas remplir</label>
      <input id={id} tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

function ErrorBox({ message }) {
  return (
    <div role="alert" className="flex items-start gap-2.5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-[13.5px] leading-relaxed text-red-200">
      <RotateCcw size={16} className="mt-0.5 flex-none" />
      <p>{message}</p>
    </div>
  )
}

function Success({ children }) {
  return (
    <div role="status" className="flex flex-col items-center gap-4 py-6 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-glow/15 text-blue-soft">
        <CheckCircle2 size={24} />
      </span>
      <p className="max-w-md text-[15px] leading-relaxed text-white">{children}</p>
    </div>
  )
}

function SubmitButton({ sending, label }) {
  return (
    <button
      type="submit"
      disabled={sending}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-glow px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-soft disabled:opacity-60"
      style={{ boxShadow: '0 0 24px rgba(59,108,224,0.35)' }}
    >
      {sending && <LoaderCircle size={16} className="animate-spin" />}
      {sending ? 'Envoi en cours…' : label}
    </button>
  )
}

function PrivacyNote({ text }) {
  return (
    <p className="text-[12.5px] leading-relaxed text-slate-body">
      {text}{' '}
      <a href="/confidentialite" className="text-blue-soft underline underline-offset-2 hover:text-white">Politique de confidentialité</a>
    </p>
  )
}

/* ---------- Formulaire Projet web (accueil) ---------- */

export function ProjetWebForm() {
  const { status, error, submit } = useSubmit('projet-web')
  const [f, setF] = useState({ nom: '', email: '', telephone: '', activite: '', formule: 'Je ne sais pas encore', message: '', website: '' })
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }))

  // Un clic sur « Choisir Essentiel / Pro / Signature » présélectionne la formule
  useEffect(() => {
    const onPick = (e) => setF((s) => ({ ...s, formule: e.detail }))
    window.addEventListener('novara:formule', onPick)
    return () => window.removeEventListener('novara:formule', onPick)
  }, [])

  if (status === 'success') {
    return <Success>Merci, nous avons bien reçu votre demande. Nous vous recontactons très vite pour convenir d’un premier échange de 30 minutes, offert et sans engagement.</Success>
  }

  return (
    <form
      className="relative flex flex-col gap-5 text-left"
      onSubmit={(e) => { e.preventDefault(); submit(f) }}
      noValidate={false}
    >
      <Honeypot id="pw-hp" value={f.website} onChange={(v) => setF((s) => ({ ...s, website: v }))} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="pw-nom" label="Prénom et nom" required>
          <input id="pw-nom" required autoComplete="name" value={f.nom} onChange={set('nom')} className={inputCls} />
        </Field>
        <Field id="pw-activite" label="Activité" required>
          <input id="pw-activite" required value={f.activite} onChange={set('activite')} placeholder="Ex. artisan menuisier, coach, agence immobilière" className={inputCls} />
        </Field>
        <Field id="pw-email" label="E-mail" required>
          <input id="pw-email" type="email" required autoComplete="email" value={f.email} onChange={set('email')} className={inputCls} />
        </Field>
        <Field id="pw-tel" label="Téléphone" required>
          <input id="pw-tel" type="tel" required autoComplete="tel" value={f.telephone} onChange={set('telephone')} className={inputCls} />
        </Field>
      </div>
      <Field id="pw-formule" label="Formule envisagée">
        <select id="pw-formule" value={f.formule} onChange={set('formule')} className={`${inputCls} [&>option]:bg-navy-900`}>
          <option>Je ne sais pas encore</option>
          {PLANS.map((p) => <option key={p.name}>{`${p.name} (${p.price})`}</option>)}
        </select>
      </Field>
      <Field id="pw-message" label="Votre projet" required>
        <textarea id="pw-message" required rows={4} maxLength={2000} value={f.message} onChange={set('message')} placeholder="Ce que vous attendez de votre site, vos délais, un site que vous aimez…" className={`resize-y ${inputCls}`} />
      </Field>
      {status === 'error' && <ErrorBox message={error} />}
      <div className="flex flex-col gap-3">
        <SubmitButton sending={status === 'sending'} label="Envoyer ma demande" />
        <PrivacyNote text="Vos informations servent uniquement à vous recontacter au sujet de votre projet." />
      </div>
    </form>
  )
}

/* ---------- Questionnaire Automatisations & IA ---------- */

export function QuestionnaireForm() {
  const { status, error, submit } = useSubmit('automatisations')
  const [f, setF] = useState({
    nom: '', activite: '', email: '', telephone: '', entreprise: '',
    organisation: '', equipe: '', tache: '', outils: '', website: '',
  })
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }))

  if (status === 'success') {
    return (
      <Success>
        Merci, nous avons bien reçu vos réponses. Si votre rendez-vous est déjà fixé, nous les utiliserons pour préparer notre échange. Sinon, nous vous recontacterons pour convenir d’un créneau.
      </Success>
    )
  }

  return (
    <form className="relative flex flex-col gap-5 text-left" onSubmit={(e) => { e.preventDefault(); submit(f) }}>
      <Honeypot id="q-hp" value={f.website} onChange={(v) => setF((s) => ({ ...s, website: v }))} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="q-nom" label="Prénom et nom" required>
          <input id="q-nom" required autoComplete="name" value={f.nom} onChange={set('nom')} className={inputCls} />
        </Field>
        <Field id="q-activite" label="Activité" required>
          <input id="q-activite" required value={f.activite} onChange={set('activite')} placeholder="Ex. plombier, conseillère immobilière, formateur" className={inputCls} />
        </Field>
        <Field id="q-email" label="E-mail" required>
          <input id="q-email" type="email" required autoComplete="email" value={f.email} onChange={set('email')} className={inputCls} />
        </Field>
        <Field id="q-tel" label="Téléphone" required>
          <input id="q-tel" type="tel" required autoComplete="tel" value={f.telephone} onChange={set('telephone')} className={inputCls} />
        </Field>
      </div>
      <Field id="q-entreprise" label="Entreprise ou nom commercial">
        <input id="q-entreprise" autoComplete="organization" value={f.entreprise} onChange={set('entreprise')} className={inputCls} />
      </Field>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-[13px] font-semibold text-white">Vous travaillez seul ou en équipe ?<span className="text-blue-soft"> *</span></legend>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          {['Seul', 'En équipe'].map((opt) => (
            <label key={opt} className={`flex flex-1 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${f.organisation === opt ? 'border-blue-glow bg-blue-glow/10 text-white' : 'border-white/10 bg-white/[0.03] text-slate-body hover:border-white/20'}`}>
              <input type="radio" name="organisation" value={opt} required checked={f.organisation === opt} onChange={set('organisation')} className="accent-[#3B6CE0]" />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>

      {f.organisation === 'En équipe' && (
        <Field id="q-equipe" label="Combien de personnes et quels services sont concernés ?">
          <input id="q-equipe" value={f.equipe} onChange={set('equipe')} placeholder="Ex. 4 personnes : accueil, commercial, comptabilité" className={inputCls} />
        </Field>
      )}

      <Field id="q-tache" label="Pensez à une tâche qui revient souvent. Comment la faites-vous aujourd’hui et qu’est-ce qui vous prend le plus de temps ?" required>
        <textarea
          id="q-tache"
          required
          rows={5}
          maxLength={3000}
          value={f.tache}
          onChange={set('tache')}
          placeholder="Je reçois mes demandes par e-mail, je les recopie dans un tableau et je dois penser à vérifier si j’ai relancé le client."
          className={`resize-y ${inputCls}`}
        />
      </Field>
      <Field id="q-outils" label="Quels outils utilisez-vous aujourd’hui ?">
        <input id="q-outils" value={f.outils} onChange={set('outils')} placeholder="Ex. Gmail, Google Agenda, Excel, un logiciel de devis" className={inputCls} />
      </Field>

      {status === 'error' && <ErrorBox message={error} />}
      <div className="flex flex-col gap-3">
        <SubmitButton sending={status === 'sending'} label="Envoyer mon questionnaire" />
        <PrivacyNote text="Vos réponses servent à préparer notre premier échange. La commande, elle, se fait uniquement par acceptation d’un devis." />
      </div>
    </form>
  )
}

export function pickFormule(name) {
  window.dispatchEvent(new CustomEvent('novara:formule', { detail: name }))
}

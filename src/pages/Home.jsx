import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUpRight, Bot, Check, ChevronDown, Globe, LifeBuoy, LoaderCircle, Palette, Play, Star, Wallet, X, Zap } from 'lucide-react'
import { PROFILES, KEY_FACTS, WHY, STEPS, PLANS, PROJECTS, FAQ, SERVICES, FORM_WEB, EXTERNAL } from '../content.js'
import { Shell, SectionHead, Stars, inputCls } from '../components/ui.jsx'
import projectThumb from '../assets/emilie-project-thumb.jpg'
import PresentationVideo from '../components/PresentationVideo.jsx'

const ICONS = { zap: Zap, palette: Palette, wallet: Wallet, lifebuoy: LifeBuoy }

function Hero() {
  return (
    <section className="px-6 pb-16 pt-32 text-center md:pb-20 md:pt-40">
      <div className="mx-auto max-w-[880px]">
        <div className="fade-up inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[13px] font-medium text-slate-body">
          <span className="animate-dot-pulse inline-block h-1.5 w-1.5 rounded-full bg-blue-glow" />
          Sites web dès 490 € · livrés en 1 à 3 jours
        </div>
        <h1 className="fade-up fade-up-1 mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-7xl">
          Plus de visibilité, <span className="font-serif italic text-blue-soft">plus de clients</span>.
        </h1>
        <p className="fade-up fade-up-2 mx-auto mt-6 max-w-[620px] text-lg leading-relaxed text-slate-body md:text-xl">
          Je conçois et développe des sites sur mesure pour les indépendants et petites entreprises qui veulent un site rapide, soigné, et pensé pour convertir — pas un simple gabarit.
        </p>
        <div className="fade-up fade-up-3 mt-10 flex flex-col justify-center gap-3.5 sm:flex-row">
          <a
            href={FORM_WEB}
            {...EXTERNAL}
            className="rounded-xl bg-blue-glow px-7 py-3.5 font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-blue-soft"
            style={{ boxShadow: '0 0 24px rgba(59,108,224,0.35)' }}
          >
            Démarrer mon projet
          </a>
          <a
            href="#realisations"
            className="rounded-xl border-2 border-white/15 px-7 py-3.5 font-semibold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/[0.03]"
          >
            Voir mes réalisations
          </a>
        </div>
        <PresentationVideo className="fade-up fade-up-4 mt-10" src="/presentation.mp4" poster="/presentation-poster.jpg" duration="0:45" label="Voir ma présentation" />
        <a
          href="#services"
          aria-label="Découvrir"
          className="fade-up fade-up-4 mt-10 inline-flex flex-col items-center gap-2 text-[13px] font-medium text-slate-body transition-colors duration-200 hover:text-white"
        >
          Découvrir
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15">
            <ChevronDown size={16} />
          </span>
        </a>
      </div>
    </section>
  )
}

function Services() {
  const icons = { web: Globe, auto: Bot }
  return (
    <section id="services" className="mx-auto max-w-[1080px] scroll-mt-24 px-6 pt-24 md:pt-32">
      <SectionHead eyebrow="Nos services" title="Deux façons de vous faire gagner du temps et des clients" className="mx-auto max-w-2xl" />
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {SERVICES.map((s, i) => {
          const Icon = icons[s.id]
          return (
            <article key={s.id} className={`fade-up fade-up-${i + 1} flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm`}>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-glow/15 text-blue-soft">
                <Icon size={20} />
              </div>
              <h3 className="mt-5 text-xl font-bold text-white">{s.title}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-body">{s.text}</p>
              <a
                href={s.href}
                className="mt-7 inline-flex items-center gap-2 self-start rounded-xl border-2 border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/[0.03]"
              >
                {s.cta} <ArrowRight size={15} />
              </a>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[720px] scroll-mt-24 px-6 py-24 text-center md:py-32">
      <div className="fade-up rounded-3xl border border-white/10 bg-white/[0.04] p-12 backdrop-blur-sm md:p-16">
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Prêt à avoir un site qui vous ressemble ?</h2>
        <p className="mx-auto mt-4 max-w-lg text-[15.5px] text-slate-body">
          Décrivez votre projet en quelques minutes. Nous vous recontactons pour un premier échange de 30 minutes, offert et sans engagement.
        </p>
        <a
          href={FORM_WEB}
          {...EXTERNAL}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-glow px-7 py-3.5 font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-blue-soft"
          style={{ boxShadow: '0 0 24px rgba(59,108,224,0.35)' }}
        >
          Démarrer mon projet <ArrowUpRight size={17} />
        </a>
        <p className="mt-8 border-t border-white/10 pt-6 text-[14px] text-slate-body">
          Vous souhaitez plutôt automatiser des tâches ?{' '}
          <a href="/automatisations" className="font-semibold text-blue-soft hover:text-white">Découvrir les automatisations</a>
        </p>
      </div>
    </section>
  )
}

function ForWho() {
  return (
    <section className="mx-auto max-w-[1080px] px-6 py-24 md:py-32">
      <SectionHead eyebrow="Pour qui" title="Deux profils, une seule exigence : un site qui travaille pour vous." className="mx-auto max-w-lg" />
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {PROFILES.map((p, i) => (
          <div key={p.n} className={`fade-up fade-up-${i + 1} rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm`}>
            <p className="text-5xl font-extrabold leading-none text-white/10">{p.n}</p>
            <span className="mt-4 inline-block rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-body">{p.badge}</span>
            <h3 className="mt-4 text-xl font-bold text-white">{p.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-body">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// GEO : un bloc de faits courts et précis que Google et les IA peuvent citer tel quel
function KeyFacts() {
  return (
    <section id="en-bref" className="mx-auto max-w-[1080px] scroll-mt-24 px-6 pb-24 md:pb-32" aria-labelledby="en-bref-title">
      <div className="fade-up rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm md:p-10">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-blue-soft">En bref</p>
        <h2 id="en-bref-title" className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
          Création de site web sur mesure pour indépendants, artisans et PME
        </h2>
        <p className="mt-4 max-w-[760px] text-[15px] leading-relaxed text-slate-body">
          Agence Novara crée des sites internet sur mesure, rapides et optimisés pour Google, pour les indépendants et les petites entreprises qui veulent transformer leurs visiteurs en clients. Chaque site est conçu à partir de zéro, sans modèle générique, avec un prix fixe annoncé dès le départ.
        </p>
        <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {KEY_FACTS.map((f) => (
            <div key={f.label} className="border-t border-white/10 pt-4">
              <dt className="text-[12px] font-semibold uppercase tracking-wide text-blue-soft">{f.label}</dt>
              <dd className="mt-1.5 text-[14.5px] leading-relaxed text-white">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Why() {
  return (
    <section className="bg-navy-900/50 py-24 md:py-32">
      <div className="mx-auto max-w-[1080px] px-6">
        <SectionHead eyebrow="Pourquoi Agence Novara" title="Une approche simple, sans mauvaise surprise" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => {
            const Icon = ICONS[w.icon]
            return (
              <div key={w.title} className={`fade-up fade-up-${i + 1} rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-glow/15 text-blue-soft">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{w.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-body">{w.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="process" className="scroll-mt-24 bg-navy-900/50 py-24 md:py-32">
      <div className="mx-auto max-w-[1080px] px-6">
        <SectionHead eyebrow="Comment ça marche" title="Un process simple, en 4 étapes" />
        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          <div className="absolute inset-x-0 top-3 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:block" aria-hidden="true" />
          {STEPS.map((s, i) => (
            <li key={s.n} className={`fade-up fade-up-${i + 1} relative`}>
              <p className="text-2xl font-extrabold text-blue-soft">{s.n}</p>
              <h3 className="mt-3 text-base font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-body">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="tarifs" className="mx-auto max-w-[1080px] scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHead eyebrow="Tarifs" title="Un prix clair, sans surprise" />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {PLANS.map((p, i) => (
          <div
            key={p.name}
            className={`fade-up fade-up-${i + 1} relative flex flex-col rounded-2xl border p-8 backdrop-blur-sm ${p.highlight ? 'border-blue-glow bg-white/[0.06]' : 'border-white/10 bg-white/[0.04]'}`}
          >
            {p.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-glow px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                Le plus choisi
              </span>
            )}
            <h3 className="text-lg font-bold text-white">{p.name}</h3>
            <p className="mt-2 text-3xl font-extrabold text-white">{p.price}</p>
            <p className="mt-3 text-[14px] leading-relaxed text-slate-body">{p.tagline}</p>
            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[14px] text-slate-body">
                  <Check size={16} className="mt-0.5 flex-none text-blue-soft" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={FORM_WEB}
              {...EXTERNAL}
              className={`mt-8 rounded-xl px-6 py-3 text-center text-sm font-semibold transition-all duration-200 ${p.highlight ? 'bg-blue-glow text-white hover:bg-blue-soft' : 'border-2 border-white/15 text-white hover:border-white/30 hover:bg-white/[0.03]'}`}
            >
              Choisir {p.name}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  const p = PROJECTS[0]
  return (
    <section id="realisations" className="mx-auto max-w-[1180px] scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHead eyebrow="Réalisations" title="Des sites pensés pour convertir" />
      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        className="fade-up fade-up-2 group mx-auto mt-14 flex max-w-[880px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-colors duration-200 hover:border-white/20"
      >
        <div className="overflow-hidden">
          <img
            src={projectThumb}
            alt={p.alt}
            width="1600"
            height="1000"
            className="aspect-[16/10] w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wide text-blue-soft">{p.category}</p>
            <p className="mt-1.5 text-lg font-semibold text-white">{p.name}</p>
            <p className="mt-1 text-[14px] text-slate-body">{p.text}</p>
          </div>
          <span className="inline-flex flex-none items-center gap-1.5 rounded-full border-2 border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 group-hover:border-white/30">
            Voir le site <ArrowUpRight size={15} />
          </span>
        </div>
      </a>
    </section>
  )
}

function Reviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/avis')
      .then((r) => r.json())
      .then((d) => setReviews(d.avis || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0

  async function submit(e) {
    e.preventDefault()
    setError('')
    if (!name.trim() || !comment.trim() || rating < 1) {
      setError('Merci de remplir votre nom, une note et un commentaire.')
      return
    }
    setSending(true)
    try {
      const res = await fetch('/api/avis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, comment }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
      setName('')
      setRating(0)
      setComment('')
    } catch {
      setError('Une erreur est survenue, réessayez dans un instant.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="mx-auto max-w-[1080px] px-6 py-24 md:py-32">
      <SectionHead eyebrow="Avis clients" title="Ce que disent mes clients" />
      <div className="fade-up fade-up-2 mx-auto mt-14 max-w-2xl">
        {loading ? (
          <div className="flex justify-center py-10 text-slate-body">
            <LoaderCircle size={22} className="animate-spin" />
          </div>
        ) : reviews.length > 0 ? (
          <>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-sm">
              <div className="flex justify-center"><Stars rating={Math.round(avg)} size={22} /></div>
              <p className="mt-4 text-2xl font-bold text-white">{avg.toFixed(1)}/5</p>
              <p className="mx-auto mt-2 max-w-xs text-[14.5px] leading-relaxed text-slate-body">
                Sur {reviews.length} avis client{reviews.length > 1 ? 's' : ''}.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              {reviews.map((r) => (
                <div key={r.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-white">{r.name}</p>
                    <Stars rating={r.rating} />
                  </div>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-slate-body">{r.comment}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-10 text-center backdrop-blur-sm">
            <p className="text-[15px] text-slate-body">Aucun avis pour le moment — soyez le premier à en laisser un.</p>
          </div>
        )}
      </div>
      <div className="fade-up fade-up-3 mx-auto mt-10 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
        {sent ? (
          <p className="text-center text-[15px] text-white">Merci pour votre avis ! Il sera visible sur le site après validation.</p>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4">
            <p className="text-center text-[15px] font-semibold text-white">Laisser un avis</p>
            <input type="text" id="avis-nom" value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom" maxLength={60} aria-label="Votre nom" className={inputCls} />
            <div className="flex items-center justify-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`${i + 1} étoile${i > 0 ? 's' : ''}`}
                  onClick={() => setRating(i + 1)}
                  className="text-blue-soft transition-transform duration-150 hover:scale-110"
                >
                  <Star size={26} fill={i < rating ? 'currentColor' : 'none'} className={i < rating ? '' : 'text-white/20'} />
                </button>
              ))}
            </div>
            <textarea id="avis-commentaire" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Votre commentaire" maxLength={500} rows={4} aria-label="Votre commentaire" className={`resize-none ${inputCls}`} />
            {error && <p className="text-center text-[13px] text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={sending}
              className="rounded-xl bg-blue-glow px-7 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-soft disabled:opacity-60"
            >
              {sending ? 'Envoi...' : 'Envoyer mon avis'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`fade-up fade-up-${Math.min(index + 1, 4)} overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm`}>
      <h3>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        >
          <span className="text-[15px] font-semibold text-white">{q}</span>
          <ChevronDown size={18} className={`flex-none text-slate-body transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
      </h3>
      {/* La réponse reste dans la page (lisible par Google et les IA), seulement masquée à l'écran */}
      <p hidden={!open} className="px-6 pb-5 text-[14.5px] leading-relaxed text-slate-body">{a}</p>
    </div>
  )
}

function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-[760px] scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHead eyebrow="Questions fréquentes" title="Tout ce qu'il faut savoir" />
      <div className="mt-14 flex flex-col gap-4">
        {FAQ.map((f, i) => <FaqItem key={f.q} q={f.q} a={f.a} index={i} />)}
      </div>
    </section>
  )
}

function Admin() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState('')

  async function load(pw) {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/avis?admin=${encodeURIComponent(pw)}`)
      const data = await res.json()
      if (!res.ok) throw new Error()
      setItems(data.avis || [])
      setAuthed(true)
    } catch {
      setError('Mot de passe incorrect.')
    } finally {
      setLoading(false)
    }
  }

  async function act(id, action) {
    setBusy(id)
    try {
      await fetch('/api/avis', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action, password }),
      })
      await load(password)
    } finally {
      setBusy('')
    }
  }

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
        <p className="text-center text-sm font-semibold text-white">Espace avis — Agence Novara</p>
        <form onSubmit={(e) => { e.preventDefault(); load(password) }} className="mt-6 flex flex-col gap-3">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" className={inputCls} />
          {error && <p className="text-center text-[13px] text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="rounded-xl bg-blue-glow px-7 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-soft disabled:opacity-60">
            {loading ? 'Connexion...' : 'Entrer'}
          </button>
        </form>
      </div>
    )
  }

  const pending = items.filter((r) => r.status === 'pending')
  const approved = items.filter((r) => r.status === 'approved')
  return (
    <div className="mx-auto min-h-screen max-w-2xl px-6 py-16">
      <p className="text-2xl font-bold text-white">Modération des avis</p>
      {loading ? (
        <div className="mt-10 flex justify-center text-slate-body"><LoaderCircle size={22} className="animate-spin" /></div>
      ) : (
        <>
          <p className="mt-8 text-[13px] font-semibold uppercase tracking-wide text-blue-soft">En attente ({pending.length})</p>
          <div className="mt-4 flex flex-col gap-3">
            {pending.length === 0 && <p className="text-[14px] text-slate-body">Aucun avis en attente.</p>}
            {pending.map((r) => (
              <div key={r.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-white">{r.name}</p>
                  <Stars rating={r.rating} size={14} />
                </div>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-body">{r.comment}</p>
                <div className="mt-4 flex gap-2">
                  <button type="button" disabled={busy === r.id} onClick={() => act(r.id, 'approve')} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-glow px-4 py-2 text-[13px] font-semibold text-white hover:bg-blue-soft disabled:opacity-60">
                    <Check size={14} /> Valider
                  </button>
                  <button type="button" disabled={busy === r.id} onClick={() => act(r.id, 'reject')} className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-4 py-2 text-[13px] font-semibold text-white hover:bg-white/[0.05] disabled:opacity-60">
                    <X size={14} /> Rejeter
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[13px] font-semibold uppercase tracking-wide text-blue-soft">Publiés ({approved.length})</p>
          <div className="mt-4 flex flex-col gap-3">
            {approved.length === 0 && <p className="text-[14px] text-slate-body">Aucun avis publié.</p>}
            {approved.map((r) => (
              <div key={r.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-white">{r.name}</p>
                  <button type="button" disabled={busy === r.id} onClick={() => act(r.id, 'reject')} className="text-[12px] font-medium text-slate-body hover:text-white">Retirer</button>
                </div>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-body">{r.comment}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function Home({ admin = false }) {
  if (admin) return <Admin />
  return (
    <Shell current="/">
      <Hero />
      <Services />
      <ForWho />
      <KeyFacts />
      <Why />
      <Process />
      <Pricing />
      <Projects />
      <Reviews />
      <Faq />
      <Contact />
    </Shell>
  )
}

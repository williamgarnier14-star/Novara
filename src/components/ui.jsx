import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, Star, X } from 'lucide-react'
import { NAV, FOOTER_LINKS, IDENTITY, FORM_WEB, EXTERNAL } from '../content.js'

export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-navy-950" />
      <div
        className="animate-breathe absolute h-[900px] w-[900px] rounded-full blur-[120px]"
        style={{ top: '-200px', right: '-200px', background: 'radial-gradient(circle, rgba(59,108,224,0.18) 0%, transparent 70%)' }}
      />
      <div
        className="animate-breathe absolute h-[600px] w-[600px] rounded-full blur-[100px]"
        style={{ bottom: '-150px', left: '-100px', background: 'radial-gradient(circle, rgba(110,143,232,0.10) 0%, transparent 70%)', animationDelay: '2s' }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  )
}

const FADE = '.fade-up, .fade-up-1, .fade-up-2, .fade-up-3, .fade-up-4'
export function RevealOnScroll() {
  useEffect(() => {
    document.documentElement.classList.remove('no-js')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    document.querySelectorAll(FADE).forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return null
}

export function ScrollProgress() {
  const bar = useRef(null)
  useEffect(() => {
    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0
      if (bar.current) bar.current.style.width = `${pct}%`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden="true">
      <div ref={bar} className="h-full bg-blue-glow transition-[width] duration-100 ease-linear" style={{ width: '0%', boxShadow: '0 0 8px rgba(59,108,224,0.6)' }} />
    </div>
  )
}

export function Logo({ className = 'text-lg', size = 46 }) {
  return (
    <span className={`inline-flex items-center gap-3.5 ${className}`}>
      <img
        src="/logo-novara.png"
        alt=""
        width={size}
        height={size}
        className="flex-none rounded-full"
        style={{ width: size, height: size, boxShadow: '0 0 18px rgba(59,108,224,0.35)' }}
      />
      <span className="font-display font-semibold tracking-[0.04em] text-white">
        <span className="whitespace-nowrap">AGENCE NOVARA</span>
      </span>
    </span>
  )
}

export function Header({ current = '/', cta = { label: 'Démarrer mon projet', href: FORM_WEB } }) {
  const ext = cta.href.startsWith('http') ? EXTERNAL : {}
  const [open, setOpen] = useState(false)
  const isCurrent = (href) => href === current
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-navy-950/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-6 py-5">
        <a href="/" aria-label="Agence Novara, accueil"><Logo /></a>
        <nav className="hidden gap-7 text-sm font-medium text-slate-body lg:flex" aria-label="Navigation principale">
          {NAV.map((l) => (
            <a
              key={l.label}
              href={l.href}
              aria-current={isCurrent(l.href) ? 'page' : undefined}
              className={`transition-colors duration-200 hover:text-white ${isCurrent(l.href) ? 'text-white' : ''}`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={cta.href}
          {...ext}
          className="hidden flex-none items-center gap-1.5 rounded-full bg-blue-glow px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-soft lg:inline-flex"
        >
          {cta.label} <ArrowUpRight size={15} />
        </a>
        <button type="button" onClick={() => setOpen((o) => !o)} aria-label="Ouvrir le menu" aria-expanded={open} className="text-white lg:hidden">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {/* Onglets mobiles : passer d'une offre à l'autre, toujours visibles en haut */}
      <div className="mx-auto max-w-[1180px] px-6 pb-4 lg:hidden">
        <nav className="grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1" aria-label="Nos offres">
          {[
            { label: 'Site web', href: '/' },
            { label: 'Automatisation', href: '/automatisations' },
          ].map((t) => {
            const active = current === t.href
            return (
              <a
                key={t.href}
                href={t.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-lg py-2.5 text-center text-sm font-semibold transition-colors duration-200 ${active ? 'bg-blue-glow text-white' : 'text-slate-body hover:text-white'}`}
                style={active ? { boxShadow: '0 0 18px rgba(59,108,224,0.35)' } : undefined}
              >
                {t.label}
              </a>
            )
          })}
        </nav>
      </div>
      {open && (
        <div className="border-b border-white/[0.06] bg-navy-900 lg:hidden">
          <nav className="mx-auto flex max-w-[1180px] flex-col px-6" aria-label="Navigation mobile">
            {NAV.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isCurrent(l.href) ? 'page' : undefined}
                className={`border-t border-white/[0.05] py-3.5 text-base ${isCurrent(l.href) ? 'text-white' : 'text-slate-body'}`}
              >
                {l.label}
              </a>
            ))}
            <a href={cta.href} {...ext} onClick={() => setOpen(false)} className="my-4 rounded-xl bg-blue-glow px-5 py-3 text-center text-sm font-semibold text-white">
              {cta.label}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-10">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-5 md:flex-row">
        <Logo className="text-sm" size={36} />
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] text-slate-body" aria-label="Liens utiles">
          {FOOTER_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors duration-200 hover:text-white">{l.label}</a>
          ))}
        </nav>
        <p className="text-[13px] text-slate-body">© 2026 {IDENTITY.brand} — Sites web et automatisations sur mesure</p>
      </div>
    </footer>
  )
}

export function SectionHead({ eyebrow, title, className = '', id }) {
  return (
    <div className="text-center">
      <p className="fade-up text-[13px] font-semibold uppercase tracking-[0.14em] text-blue-soft">{eyebrow}</p>
      <h2 id={id} className={`fade-up fade-up-1 mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl ${className}`}>{title}</h2>
    </div>
  )
}

export function Stars({ rating, size = 16 }) {
  return (
    <div className="flex gap-0.5 text-blue-soft">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill={i < rating ? 'currentColor' : 'none'} className={i < rating ? '' : 'text-white/20'} />
      ))}
    </div>
  )
}

export const inputCls =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-body/70 focus:border-blue-glow focus:outline-none'
export const card = 'rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm'

export function Shell({ current, cta, children }) {
  return (
    <>
      <Background />
      <RevealOnScroll />
      <ScrollProgress />
      <div className="relative z-10">
        <Header current={current} cta={cta} />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

import { ArrowRight, MapPin, HeartHandshake, Lightbulb } from 'lucide-react'
import { Shell, card } from '../components/ui.jsx'
import { IDENTITY } from '../content.js'

const VALUES = [
  { icon: HeartHandshake, title: 'Partir de votre réalité', text: 'Chaque projet commence par votre façon de travailler, pas par un outil à vous vendre.' },
  { icon: Lightbulb, title: 'Simple et utile', text: 'Un site qui donne envie de vous contacter, une automatisation qui vous fait vraiment gagner du temps.' },
  { icon: MapPin, title: 'Proche de vous', text: 'Basée dans le Pays de Saint-Malo, en visio partout en France et en présentiel sur rendez-vous.' },
]

export default function APropos() {
  return (
    <Shell current="/a-propos">
      <section className="px-6 pb-16 pt-28 md:pt-36">
        <div className="mx-auto grid max-w-[1080px] items-center gap-12 md:grid-cols-[320px_1fr]">
          <div className="fade-up mx-auto flex aspect-square w-60 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-navy-800 to-navy-900 md:w-full" style={{ boxShadow: '0 0 60px rgba(59,108,224,0.25)' }}>
            {/* Remplacer par une photo d'Émilie : src/assets/emilie.jpg */}
            <span className="font-display text-6xl font-semibold text-blue-soft" aria-hidden="true">ÉC</span>
          </div>
          <div>
            <p className="fade-up text-[13px] font-semibold uppercase tracking-[0.14em] text-blue-soft">À propos</p>
            <h1 className="fade-up fade-up-1 mt-3 text-4xl font-extrabold tracking-tight text-white md:text-5xl">{IDENTITY.owner}, fondatrice d’{IDENTITY.brand}</h1>
            <div className="fade-up fade-up-2 mt-6 flex flex-col gap-4 text-[16px] leading-relaxed text-slate-body">
              <p>
                Entrepreneure indépendante dans l’immobilier sur le Pays de Saint-Malo, je connais de l’intérieur le quotidien des indépendants : les demandes qui arrivent de partout, les notes prises entre deux rendez-vous, les relances à ne pas oublier.
              </p>
              <p>
                J’ai créé {IDENTITY.brand} pour aider les indépendants et les petites entreprises à gagner en visibilité et en temps : des sites web sur mesure qui transforment les visiteurs en clients, et des automatisations conçues à partir de leurs habitudes de travail.
              </p>
              <p>Mon approche reste la même : écouter, simplifier, puis vous rendre autonome.</p>
            </div>
            <div className="fade-up fade-up-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/#contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-glow px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-soft">Démarrer un projet web <ArrowRight size={16} /></a>
              <a href="/automatisations#questionnaire" className="inline-flex items-center justify-center rounded-xl border-2 border-white/15 px-6 py-3 font-semibold text-white transition-colors hover:border-white/30">Décrire mon quotidien</a>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1080px] px-6 pb-24 md:pb-32">
        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <div key={v.title} className={`fade-up fade-up-${i + 1} ${card} p-7`}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-glow/15 text-blue-soft"><v.icon size={18} /></span>
              <h2 className="mt-4 text-base font-semibold text-white">{v.title}</h2>
              <p className="mt-2 text-[14.5px] leading-relaxed text-slate-body">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  )
}

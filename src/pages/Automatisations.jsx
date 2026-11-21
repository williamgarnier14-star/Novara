import {
  ArrowRight, Briefcase, CalendarCheck, ClipboardList, FileText, GraduationCap, Hammer, Hourglass, House,
  KeyRound, MessagesSquare, Search, ShieldCheck, Sparkles, Store, User, Users, Workflow, ChevronDown,
} from 'lucide-react'
import { useState } from 'react'
import { Shell, SectionHead, card } from '../components/ui.jsx'
import { AuditSoloPrice, AuditDeduction } from '../components/AuditPrice.jsx'
import { IDENTITY, FORM_AUTO, EXTERNAL } from '../content.js'
import { DAY_CHANGE, SECTORS, CASE_STUDY, OPPORTUNITIES, DELIVERY, AUTO_FAQ } from '../content-auto.js'

const ICONS = {
  workflow: Workflow, hourglass: Hourglass, sparkles: Sparkles, hammer: Hammer, briefcase: Briefcase,
  home: House, store: Store, graduation: GraduationCap, calendar: CalendarCheck,
}

const CTA = { label: 'Décrire mon quotidien', href: FORM_AUTO }

function PrimaryCta({ className = '' }) {
  return (
    <a
      href={FORM_AUTO}
      {...EXTERNAL}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-blue-glow px-7 py-3.5 font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-blue-soft ${className}`}
      style={{ boxShadow: '0 0 24px rgba(59,108,224,0.35)' }}
    >
      Décrire mon quotidien <ArrowRight size={17} />
    </a>
  )
}

function Hero() {
  return (
    <section className="px-6 pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="mx-auto max-w-[860px] text-center">
        <div className="fade-up inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[13px] font-medium text-slate-body">
          <span className="animate-dot-pulse inline-block h-1.5 w-1.5 rounded-full bg-blue-glow" />
          Automatisations &amp; IA
        </div>
        <h1 className="fade-up fade-up-1 mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-white md:text-6xl">
          Des automatisations qui s’adaptent à <span className="font-serif italic text-blue-soft">votre façon</span> de travailler
        </h1>
        <div className="fade-up fade-up-2 mx-auto mt-7 flex max-w-[680px] flex-col gap-4 text-[17px] leading-relaxed text-slate-body md:text-lg">
          <p>
            Vous travaillez seul ou en petite équipe ? Nous partons de votre quotidien. Comment arrivent vos demandes ? Où notez-vous vos rendez-vous ? Comment suivez-vous vos devis ? Ensemble, nous repérons ce qui vous prend du temps et concevons une solution sur mesure, facile à prendre en main.
          </p>
          <p>
            Quand vos outils actuels conviennent, nous nous appuyons dessus. Une double saisie à supprimer, un rappel à programmer ou deux outils à relier peuvent déjà alléger vos journées. Vous choisissez ce que vous faites du temps retrouvé, que ce soit pour vos clients, la prospection, le terrain ou votre vie personnelle.
          </p>
        </div>
        <div className="fade-up fade-up-3 mt-10 flex flex-col items-center gap-4">
          <PrimaryCta />
          <p className="max-w-md text-[13.5px] leading-relaxed text-slate-body">
            Après votre questionnaire, nous vous recontactons pour un premier échange de 30 minutes, offert et sans engagement.
          </p>
        </div>
      </div>
    </section>
  )
}

function DayChange() {
  return (
    <section className="bg-navy-900/50 py-24 md:py-32" aria-labelledby="journee">
      <div className="mx-auto max-w-[1080px] px-6">
        <SectionHead eyebrow="Démonstration" title="Ce qui change dans votre journée" id="journee" />
        <ol className="mt-14 grid gap-5 md:grid-cols-3 md:gap-0">
          {DAY_CHANGE.map((s, i) => {
            const Icon = ICONS[s.icon]
            const last = i === DAY_CHANGE.length - 1
            return (
              <li key={s.title} className={`fade-up fade-up-${i + 1} relative flex md:items-stretch`}>
                <div className={`${card} flex w-full flex-col p-7 ${last ? 'border-blue-glow/60 bg-white/[0.06]' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-full ${last ? 'bg-blue-glow text-white' : 'bg-blue-glow/15 text-blue-soft'}`}>
                      <Icon size={18} />
                    </span>
                    <span className="text-[12px] font-semibold uppercase tracking-wide text-blue-soft">Étape {i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">{s.title}</h3>
                  <p className={`mt-3 text-[15px] leading-relaxed ${s.quote ? 'italic text-slate-body' : 'text-white/90'}`}>{s.text}</p>
                </div>
                {!last && (
                  <span className="mx-auto flex h-8 w-8 flex-none rotate-90 items-center justify-center text-blue-soft md:mx-0 md:h-auto md:w-10 md:rotate-0" aria-hidden="true">
                    <ArrowRight size={20} />
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

function Sectors() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-24 md:py-32" aria-labelledby="metiers">
      <SectionHead eyebrow="Par métier" title="À quoi cela ressemble dans votre métier ?" id="metiers" />
      <p className="fade-up fade-up-2 mx-auto mt-4 max-w-xl text-center text-[15px] text-slate-body">
        Des exemples de possibilités, à adapter à chaque entreprise.
      </p>
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SECTORS.map((s, i) => {
          const Icon = ICONS[s.icon]
          return (
            <article key={s.name} className={`fade-up fade-up-${(i % 3) + 1} ${card} flex flex-col p-7`}>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-blue-glow/15 text-blue-soft"><Icon size={18} /></span>
                <h3 className="text-base font-bold text-white">{s.name}</h3>
              </div>
              <p className="mt-5 text-[12px] font-semibold uppercase tracking-wide text-slate-body">Votre situation</p>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-body">{s.situation}</p>
              <div className="mt-5 flex-1 rounded-xl border border-blue-glow/25 bg-blue-glow/[0.07] p-4">
                <p className="text-[12px] font-semibold uppercase tracking-wide text-blue-soft">Ce qu’on peut simplifier</p>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-white/90">{s.simplify}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function CaseStudy() {
  return (
    <section className="mx-auto max-w-[1080px] px-6 pb-24 md:pb-32" aria-labelledby="cas">
      <div className={`fade-up ${card} overflow-hidden`}>
        <div className="border-b border-white/10 bg-gradient-to-br from-navy-800 to-navy-900 p-8 md:p-10">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-blue-soft">Mise en situation</p>
          <h2 id="cas" className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">{CASE_STUDY.persona}</h2>
        </div>
        <div className="grid gap-px bg-white/10 md:grid-cols-3">
          {CASE_STUDY.blocks.map((b, i) => (
            <div key={b.title} className="bg-navy-950/80 p-7 md:p-8">
              <p className="text-2xl font-extrabold text-blue-soft">0{i + 1}</p>
              <h3 className="mt-3 text-base font-semibold text-white">{b.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-slate-body">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Journey() {
  return (
    <section id="parcours" className="scroll-mt-24 bg-navy-900/50 py-24 md:py-32" aria-labelledby="premier-echange">
      <div className="mx-auto max-w-[1080px] px-6">
        <SectionHead eyebrow="Votre parcours" title="Un premier échange de 30 minutes pour faire connaissance" className="mx-auto max-w-2xl" id="premier-echange" />
        <p className="fade-up fade-up-2 mx-auto mt-5 max-w-2xl text-center text-[15.5px] leading-relaxed text-slate-body">
          Vous remplissez le questionnaire avant notre appel ou notre visio. Ce premier échange est offert et sans engagement. Vous nous parlez de votre activité, de vos habitudes de travail et de ce qui vous freine. Le questionnaire nous aide à préparer la conversation.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className={`fade-up fade-up-1 ${card} p-7`}>
            <ClipboardList size={22} className="text-blue-soft" />
            <h3 className="mt-4 text-lg font-bold text-white">Vous avez un besoin précis.</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-body">Si le périmètre est clair, nous pouvons vous proposer directement un devis.</p>
          </div>
          <div className={`fade-up fade-up-2 ${card} p-7`}>
            <Search size={22} className="text-blue-soft" />
            <h3 className="mt-4 text-lg font-bold text-white">Vous cherchez par où commencer.</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-body">Nous pouvons vous proposer un audit pour examiner votre organisation et identifier les actions les plus utiles.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Audit() {
  return (
    <section id="audit" className="mx-auto max-w-[1080px] scroll-mt-24 px-6 py-24 md:py-32" aria-labelledby="audit-titre">
      <SectionHead eyebrow="L’audit" title="Un audit adapté à votre organisation" id="audit-titre" />
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <div className={`fade-up fade-up-1 ${card} p-8`}>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-glow/15 text-blue-soft"><User size={18} /></span>
            <h3 className="text-lg font-bold text-white">Vous travaillez seul</h3>
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-body">
            Nous convenons des tâches et des outils à examiner. L’audit comprend un entretien individuel d’environ 1 h 30. Nous reprenons ensemble les étapes de votre travail pour repérer les blocages, les doubles saisies et les tâches répétitives.
          </p>
        </div>
        <div className={`fade-up fade-up-2 ${card} p-8`}>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-glow/15 text-blue-soft"><Users size={18} /></span>
            <h3 className="text-lg font-bold text-white">Vous travaillez en petite équipe ou en TPE</h3>
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-body">
            Nous définissons un forfait sur devis selon les services concernés et le nombre de personnes à rencontrer dans chacun d’eux. Le devis précise le périmètre, les entretiens, les livrables et le délai.
          </p>
        </div>
      </div>
      <p className="fade-up mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center text-[14px] leading-relaxed text-slate-body">
        Avec votre accord préalable, l’entretien d’audit peut être enregistré pour préparer le rapport. Vous pouvez aussi choisir un entretien avec prise de notes.
      </p>

      <div className="mt-20">
        <h3 className="fade-up text-center text-2xl font-bold tracking-tight text-white md:text-3xl">Un rapport et un débriefing pour décider par quoi commencer</h3>
        <div className="fade-up fade-up-1 mx-auto mt-6 flex max-w-3xl flex-col gap-4 text-center text-[15.5px] leading-relaxed text-slate-body">
          <p>Pour l’audit solo, nous vous envoyons par e-mail votre rapport et votre tableau d’opportunités dans les 15 jours calendaires suivant l’entretien. Pour un audit d’équipe, le délai figure sur le devis.</p>
          <p>Un débriefing individuel est inclus. Il se déroule en visio ou, sur rendez-vous, en présentiel dans le Pays de Saint-Malo. Nous passons en revue les pistes proposées et vous conseillons sur l’ordre de mise en place. Vous pouvez commencer par une seule action et avancer à votre rythme.</p>
        </div>
        <figure className={`fade-up fade-up-2 ${card} mt-10 overflow-hidden`}>
          <figcaption className="flex items-center gap-2.5 border-b border-white/10 px-6 py-4 text-[13px] font-semibold uppercase tracking-wide text-blue-soft">
            <FileText size={16} /> Exemple de tableau d’opportunités
          </figcaption>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-[14px]">
              <thead>
                <tr className="text-[12px] uppercase tracking-wide text-slate-body">
                  <th scope="col" className="px-6 py-3 font-semibold">Opportunité</th>
                  <th scope="col" className="px-6 py-3 font-semibold">Bénéfice attendu</th>
                  <th scope="col" className="px-6 py-3 font-semibold">Effort</th>
                  <th scope="col" className="px-6 py-3 font-semibold">Priorité recommandée</th>
                </tr>
              </thead>
              <tbody>
                {OPPORTUNITIES.map((o) => (
                  <tr key={o.item} className="border-t border-white/10">
                    <th scope="row" className="px-6 py-4 font-semibold text-white">{o.item}</th>
                    <td className="px-6 py-4 text-slate-body">{o.benefit}</td>
                    <td className="px-6 py-4 text-slate-body">{o.effort}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-[12px] font-semibold ${o.level === 1 ? 'bg-blue-glow text-white' : o.level === 2 ? 'bg-blue-glow/20 text-blue-soft' : 'border border-white/15 text-slate-body'}`}>
                        {o.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      </div>
    </section>
  )
}

function Delivery() {
  return (
    <section className="bg-navy-900/50 py-24 md:py-32" aria-labelledby="livraison">
      <div className="mx-auto max-w-[1080px] px-6">
        <SectionHead eyebrow="Démonstration, tests et livraison" title="Vous validez, puis vous prenez la main" id="livraison" />
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {DELIVERY.map((d, i) => (
            <li key={d.title} className={`fade-up fade-up-${i + 1} ${card} p-7`}>
              <p className="text-2xl font-extrabold text-blue-soft">0{i + 1}</p>
              <h3 className="mt-3 text-base font-bold text-white">{d.title}</h3>
              {d.paragraphs.map((p) => <p key={p} className="mt-3 text-[14.5px] leading-relaxed text-slate-body">{p}</p>)}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Pricing() {
  const rows = [
    { name: 'Audit solo', content: <AuditSoloPrice /> },
    { name: 'Audit petite équipe ou TPE', content: 'Forfait sur devis selon le nombre de personnes par service et le périmètre retenu. Règlement à la commande, avant réalisation.' },
    { name: 'Assistant IA ciblé, automatisation simple ou projet complet', content: 'Sur devis. Paiement en une fois, sans acompte, après validation écrite de la démonstration finale et avant installation définitive.' },
    { name: 'Suivi facultatif', content: <><strong className="text-white">50 € par mois</strong>, jusqu’à 30 minutes de petits ajustements ou de mises à jour des solutions installées. Arrêt possible à la fin du mois. Les nouvelles fonctionnalités font l’objet d’un devis.</> },
  ]
  return (
    <section id="tarifs" className="mx-auto max-w-[960px] scroll-mt-24 px-6 py-24 md:py-32" aria-labelledby="tarifs-auto">
      <SectionHead eyebrow="Tarifs" title="Des tarifs clairs, sans acompte" id="tarifs-auto" />
      <div className={`fade-up fade-up-2 ${card} mt-14 overflow-hidden`}>
        <dl>
          {rows.map((r, i) => (
            <div key={r.name} className={`grid gap-2 px-6 py-5 md:grid-cols-[260px_1fr] md:gap-8 md:px-8 ${i ? 'border-t border-white/10' : ''}`}>
              <dt className="text-[15px] font-bold text-white">{r.name}</dt>
              <dd className="text-[14.5px] leading-relaxed text-slate-body">{r.content}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="fade-up mt-6 text-[14px] leading-relaxed text-slate-body"><AuditDeduction /></p>
      <p className="fade-up mt-3 text-[13px] text-slate-body">Les montants affichés sont les montants à payer. {IDENTITY.vat}</p>

      <div className={`fade-up ${card} mt-14 flex flex-col gap-5 p-8 md:flex-row md:items-start md:gap-7`}>
        <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-blue-glow/15 text-blue-soft"><ShieldCheck size={22} /></span>
        <div>
          <h3 className="text-lg font-bold text-white">Vos comptes restent sous votre contrôle</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-body">
            Les comptes d’hébergement, d’automatisation et d’intelligence artificielle nécessaires à la prestation sont ouverts à votre nom ou à celui de votre entreprise. Vous gardez les accès administrateur et payez directement vos éventuels abonnements aux outils. Si vous souhaitez une intervention d’Agence Novara, vous pouvez nous accorder un accès délégué et le retirer ensuite.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-blue-soft"><KeyRound size={15} /> Accès administrateur toujours à votre nom</p>
        </div>
      </div>
    </section>
  )
}

function Questionnaire() {
  return (
    <section id="questionnaire" className="mx-auto max-w-[780px] scroll-mt-24 px-6 py-24 md:py-32" aria-labelledby="questionnaire-titre">
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm md:p-12">
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-glow/15 text-blue-soft"><MessagesSquare size={22} /></span>
          <h2 id="questionnaire-titre" className="mt-5 text-3xl font-bold tracking-tight text-white md:text-4xl">Qu’aimeriez-vous simplifier dans votre quotidien ?</h2>
          <p className="mx-auto mt-4 max-w-lg text-[15.5px] leading-relaxed text-slate-body">
            Prenez quelques minutes pour nous décrire votre activité et ce qui vous prend du temps. Vos réponses nous aideront à préparer notre premier échange.
          </p>
        </div>
        <ul className="mx-auto mt-8 flex max-w-md flex-col gap-2.5 text-left text-[14.5px] text-slate-body">
          {['Votre activité et votre organisation', 'Une tâche qui revient souvent et ce qui vous prend du temps', 'Les outils que vous utilisez aujourd’hui'].map((t) => (
            <li key={t} className="flex items-start gap-2.5"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-blue-glow" />{t}</li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <PrimaryCta />
          <p className="max-w-md text-[12.5px] leading-relaxed text-slate-body">
            Le questionnaire s’ouvre dans un nouvel onglet. Vos réponses servent à préparer notre premier échange ; la commande se fait uniquement par acceptation d’un devis.{' '}
            <a href="/confidentialite" className="text-blue-soft underline underline-offset-2 hover:text-white">Politique de confidentialité</a>
          </p>
        </div>
      </div>
    </section>
  )
}

function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`fade-up fade-up-${Math.min(index + 1, 4)} ${card} overflow-hidden`}>
      <h3>
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
          <span className="text-[15px] font-semibold text-white">{q}</span>
          <ChevronDown size={18} className={`flex-none text-slate-body transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
      </h3>
      <p hidden={!open} className="px-6 pb-5 text-[14.5px] leading-relaxed text-slate-body">{a}</p>
    </div>
  )
}

function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-[760px] scroll-mt-24 px-6 pb-16" aria-labelledby="faq-auto">
      <SectionHead eyebrow="Questions fréquentes" title="Vos questions sur les automatisations" id="faq-auto" />
      <div className="mt-12 flex flex-col gap-4">
        {AUTO_FAQ.map((f, i) => <FaqItem key={f.q} q={f.q} a={f.a} index={i} />)}
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-[720px] px-6 pb-24 pt-8 text-center md:pb-32">
      <div className="fade-up rounded-3xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur-sm md:p-14">
        <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Et si on partait de votre quotidien ?</h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] text-slate-body">Quelques minutes de questionnaire, puis un premier échange de 30 minutes, offert et sans engagement.</p>
        <PrimaryCta className="mt-8" />
      </div>
    </section>
  )
}

export default function Automatisations() {
  return (
    <Shell current="/automatisations" cta={CTA}>
      <Hero />
      <DayChange />
      <Sectors />
      <CaseStudy />
      <Journey />
      <Audit />
      <Delivery />
      <Pricing />
      <Questionnaire />
      <Faq />
      <FinalCta />
    </Shell>
  )
}

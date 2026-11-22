// Après le build : écrit le HTML complet de chaque page, ajoute les données
// structurées (schema.org), génère sitemap.xml et llms.txt.
// Google, ChatGPT, Perplexity ou Gemini lisent tout le contenu sans exécuter de JavaScript.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const ssr = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href)
const { render, PAGES, SITE_URL, IDENTITY: I, PLANS, FAQ, KEY_FACTS, AUTO_FAQ, SECTORS, auditPrice, FORM_WEB, FORM_AUTO } = ssr

const home = `${SITE_URL}/`
const orgId = `${home}#agence`
const today = new Date().toISOString().slice(0, 10)
const audit = auditPrice(new Date())

const organization = {
  '@type': 'ProfessionalService',
  '@id': orgId,
  name: I.brand,
  url: home,
  logo: `${home}icon-512.png`,
  image: `${home}og-image.jpg`,
  email: I.email,
  telephone: I.phoneIntl,
  description: 'Création de sites web sur mesure et d’automatisations pour indépendants, artisans, PME et startups.',
  slogan: 'Plus de visibilité. Plus de temps.',
  priceRange: '150 € – 990 €',
  address: { '@type': 'PostalAddress', streetAddress: I.street, postalCode: I.postalCode, addressLocality: I.city, addressRegion: 'Bretagne', addressCountry: 'FR' },
  areaServed: [{ '@type': 'AdministrativeArea', name: I.region }, { '@type': 'Country', name: 'France' }],
  founder: { '@type': 'Person', name: I.owner, jobTitle: 'Fondatrice' },
  availableLanguage: 'fr',
  knowsAbout: ['Création de site internet', 'Site vitrine', 'Référencement naturel (SEO)', 'Optimisation pour les moteurs IA (GEO)', 'Automatisation', 'Assistants IA', 'Audit d’organisation'],
}

const faqPage = (items) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
})
const breadcrumb = (name, url) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: home },
    { '@type': 'ListItem', position: 2, name, item: url },
  ],
})

const graphs = {
  home: [
    {
      ...organization,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Formules de création de site web',
        itemListElement: PLANS.map((p) => ({
          '@type': 'Offer', name: `Formule ${p.name}`, description: `${p.tagline}. ${p.features.join(', ')}.`,
          price: p.amount, priceCurrency: 'EUR', url: `${home}#tarifs`,
          itemOffered: { '@type': 'Service', name: `Création de site web — ${p.name}` },
        })),
      },
    },
    { '@type': 'WebSite', '@id': `${home}#site`, url: home, name: I.brand, alternateName: ['Novara', 'agencenovara.fr'], description: 'Sites web & automatisations. Plus de visibilité. Plus de temps.', inLanguage: 'fr-FR', publisher: { '@id': orgId } },
    {
      '@type': 'Service', name: 'Création de site web sur mesure', serviceType: 'Création de site internet', provider: { '@id': orgId },
      audience: { '@type': 'Audience', audienceType: 'Indépendants, artisans, professions libérales, PME et startups' },
      offers: { '@type': 'AggregateOffer', lowPrice: 490, highPrice: 990, priceCurrency: 'EUR', offerCount: PLANS.length },
    },
    faqPage(FAQ),
  ],
  automatisations: [
    organization,
    {
      '@type': 'Service',
      name: 'Automatisations et assistants IA sur mesure',
      serviceType: 'Automatisation des processus métier',
      url: `${SITE_URL}/automatisations`,
      provider: { '@id': orgId },
      description: 'Analyse des habitudes de travail et conception d’automatisations sur mesure pour indépendants et petites entreprises.',
      audience: { '@type': 'Audience', audienceType: 'Indépendants, TPE et petites équipes' },
      areaServed: [{ '@type': 'AdministrativeArea', name: I.region }, { '@type': 'Country', name: 'France' }],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Automatisations & IA',
        itemListElement: [
          { '@type': 'Offer', name: 'Audit solo', price: audit, priceCurrency: 'EUR', description: 'Entretien individuel d’environ 1 h 30, rapport et tableau d’opportunités sous 15 jours, débriefing inclus.' },
          { '@type': 'Offer', name: 'Audit petite équipe ou TPE', description: 'Forfait sur devis selon le nombre de personnes et le périmètre.' },
          { '@type': 'Offer', name: 'Assistant IA ciblé, automatisation simple ou projet complet', description: 'Sur devis, paiement en une fois après validation de la démonstration finale.' },
          { '@type': 'Offer', name: 'Suivi facultatif', price: 50, priceCurrency: 'EUR', description: 'Jusqu’à 30 minutes d’ajustements par mois, sans engagement.' },
        ],
      },
    },
    faqPage(AUTO_FAQ),
    breadcrumb('Automatisations & IA', `${SITE_URL}/automatisations`),
  ],
  apropos: [
    organization,
    {
      '@type': 'AboutPage', url: `${SITE_URL}/a-propos`, name: `À propos d’${I.brand}`,
      mainEntity: { '@type': 'Person', name: I.owner, jobTitle: `Fondatrice d’${I.brand}`, worksFor: { '@id': orgId }, address: { '@type': 'PostalAddress', addressLocality: I.city, addressCountry: 'FR' } },
    },
    breadcrumb('À propos', `${SITE_URL}/a-propos`),
  ],
}

for (const [key, page] of Object.entries(PAGES)) {
  const file = path.join(dist, page.path === '/' ? 'index.html' : `${page.path.slice(1)}/index.html`)
  const ld = graphs[key]
    ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graphs[key] }).replace(/</g, '\\u003c')}</script>`
    : ''
  const html = fs.readFileSync(file, 'utf8').replace('<!--app-html-->', render(key)).replace('<!--structured-data-->', ld)
  fs.writeFileSync(file, html)
}

// Plan du site (les pages légales sont exclues : elles ne sont pas indexées)
const indexed = Object.values(PAGES).filter((p) => Number(p.priority) >= 0.5)
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexed.map((p) => `  <url><loc>${SITE_URL}${p.path === '/' ? '/' : p.path}</loc><lastmod>${today}</lastmod><priority>${p.priority}</priority></url>`).join('\n')}
</urlset>
`,
)

// llms.txt : résumé clair destiné aux assistants IA
const llms = `# ${I.brand}

> ${I.brand} crée des sites web sur mesure et des automatisations pour les indépendants, artisans, PME et startups. Fondée par ${I.owner}, basée dans le ${I.region} (${I.city}, Ille-et-Vilaine), clients partout en France.

## En bref
${KEY_FACTS.map((f) => `- ${f.label} : ${f.value}`).join('\n')}

## Création de sites web — formules
${PLANS.map((p) => `- ${p.name} — ${p.price} : ${p.tagline}. Inclus : ${p.features.join(' ; ')}.`).join('\n')}

## Automatisations & IA (${SITE_URL}/automatisations)
Automatisations sur mesure conçues à partir des habitudes de travail du client, en s'appuyant sur ses outils actuels quand ils conviennent. Le client garde ses comptes et ses accès administrateur.
- Premier échange de 30 minutes offert et sans engagement, préparé grâce à un questionnaire.
- Audit solo : ${audit} €${audit === 150 ? ' (tarif de lancement jusqu’au 31 mars 2027, puis 200 €)' : ''}, entretien d’environ 1 h 30, rapport et tableau d’opportunités sous 15 jours, débriefing inclus. Déduit d’une mise en place d’au moins 500 €.
- Audit petite équipe ou TPE : sur devis.
- Assistant IA, automatisation simple ou projet complet : sur devis, paiement en une fois sans acompte après validation de la démonstration finale.
- 15 jours de test avant validation, puis 15 jours d’ajustements après la mise en service.
- Suivi facultatif : 50 € par mois.
- Exemples par métier : ${SECTORS.map((s) => s.name).join(', ')}.

## Questions fréquentes — sites web
${FAQ.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Questions fréquentes — automatisations
${AUTO_FAQ.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Contact
- Site : ${home}
- Demande de projet web (formulaire) : ${FORM_WEB}
- Questionnaire automatisations : ${FORM_AUTO}
- E-mail : ${I.email}
- Téléphone : ${I.phone}
`
fs.writeFileSync(path.join(dist, 'llms.txt'), llms)

fs.rmSync(path.resolve('dist-ssr'), { recursive: true, force: true })
console.log(`Prérendu terminé : ${Object.keys(PAGES).length} pages, sitemap.xml, llms.txt`)

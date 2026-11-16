// Après le build : écrit le HTML complet de la page dans dist/index.html
// et ajoute les données structurées (schema.org) et le fichier llms.txt.
// Résultat : Google, ChatGPT, Perplexity ou Gemini lisent tout le contenu sans exécuter de JavaScript.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const ssr = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href)
const { render, SITE_URL, CALENDLY, PLANS, FAQ, KEY_FACTS, PROJECTS } = ssr

const url = `${SITE_URL}/`
const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${url}#novara`,
      name: 'Novara',
      url,
      logo: `${url}favicon.svg`,
      image: `${url}og-image.jpg`,
      description:
        'Création de sites web sur mesure, rapides et optimisés pour Google, pour indépendants, artisans, PME et startups.',
      slogan: 'Un site web qui convertit, pas juste qui existe.',
      priceRange: '490 € – 990 €',
      areaServed: { '@type': 'Country', name: 'France' },
      availableLanguage: 'fr',
      knowsAbout: [
        'Création de site internet',
        'Site vitrine',
        'Site multi-pages',
        'Webdesign',
        'Référencement naturel (SEO)',
        'Optimisation pour les moteurs IA (GEO)',
        'Conversion',
      ],
      potentialAction: { '@type': 'ReserveAction', target: CALENDLY, name: 'Réserver un appel découverte de 30 minutes' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Formules de création de site web',
        itemListElement: PLANS.map((p) => ({
          '@type': 'Offer',
          name: `Formule ${p.name}`,
          description: `${p.tagline}. ${p.features.join(', ')}.`,
          price: p.amount,
          priceCurrency: 'EUR',
          url: `${url}#tarifs`,
          itemOffered: { '@type': 'Service', name: `Création de site web — ${p.name}` },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${url}#site`,
      url,
      name: 'Novara',
      inLanguage: 'fr-FR',
      publisher: { '@id': `${url}#novara` },
    },
    {
      '@type': 'Service',
      name: 'Création de site web sur mesure',
      serviceType: 'Création de site internet',
      provider: { '@id': `${url}#novara` },
      audience: { '@type': 'Audience', audienceType: 'Indépendants, artisans, professions libérales, PME et startups' },
      areaServed: { '@type': 'Country', name: 'France' },
      offers: { '@type': 'AggregateOffer', lowPrice: 490, highPrice: 990, priceCurrency: 'EUR', offerCount: PLANS.length },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const html = template
  .replace('<!--app-html-->', render())
  .replace(
    '<!--structured-data-->',
    `<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`,
  )
fs.writeFileSync(path.join(dist, 'index.html'), html)

// llms.txt : résumé clair destiné aux assistants IA
const llms = `# Novara

> Novara crée des sites web sur mesure, rapides et optimisés pour Google, pour les indépendants, artisans, PME et startups. Slogan : « Un site web qui convertit, pas juste qui existe. »

## En bref
${KEY_FACTS.map((f) => `- ${f.label} : ${f.value}`).join('\n')}

## Formules et tarifs
${PLANS.map((p) => `- ${p.name} — ${p.price} : ${p.tagline}. Inclus : ${p.features.join(' ; ')}.`).join('\n')}

## Méthode
1. Découverte : échange sur l'activité, les objectifs et les besoins.
2. Design : direction visuelle sur mesure.
3. Développement : site rapide, adapté à tous les écrans, optimisé pour le référencement.
4. Lancement : mise en ligne, formation rapide, accompagnement après livraison.

## Réalisations
${PROJECTS.map((p) => `- [${p.name}](${p.url}) — ${p.category}. ${p.text}`).join('\n')}

## Questions fréquentes
${FAQ.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Contact
- Site : ${url}
- Réserver un appel découverte gratuit (30 min) : ${CALENDLY}
`
fs.writeFileSync(path.join(dist, 'llms.txt'), llms)

fs.rmSync(path.resolve('dist-ssr'), { recursive: true, force: true })
console.log('Prérendu terminé : dist/index.html, dist/llms.txt')

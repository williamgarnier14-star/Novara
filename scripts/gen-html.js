// Génère un fichier HTML par page (Vite multi-pages). Lancé avant chaque build.
import fs from 'node:fs'
import path from 'node:path'

const SITE = 'https://www.agencenovara.fr'
const pages = [
  { key: 'home', path: '/', title: 'Agence Novara — Sites web & automatisations. Plus de visibilité. Plus de temps.', description: 'Agence Novara crée des sites web sur mesure et des automatisations pour indépendants, artisans et PME. Sites dès 490 €, livrés en 1 à 3 jours. Pays de Saint-Malo.' },
  { key: 'automatisations', path: '/automatisations', title: 'Automatisations sur mesure pour indépendants et TPE | Agence Novara', description: 'Agence Novara analyse vos habitudes de travail et conçoit des automatisations sur mesure pour les indépendants et petites entreprises. Premier échange offert de 30 minutes.' },
  { key: 'apropos', path: '/a-propos', title: 'À propos — Émilie Caignet, fondatrice d’Agence Novara', description: 'Émilie Caignet a fondé Agence Novara pour aider les indépendants et petites entreprises avec des sites web et des automatisations sur mesure. Pays de Saint-Malo.' },
  { key: 'mentions', path: '/mentions-legales', title: 'Mentions légales | Agence Novara', description: 'Mentions légales du site Agence Novara.' },
  { key: 'confidentialite', path: '/confidentialite', title: 'Politique de confidentialité | Agence Novara', description: 'Comment Agence Novara collecte, utilise et protège vos données personnelles.' },
  { key: 'cgv', path: '/cgv', title: 'Conditions générales de vente | Agence Novara', description: 'Conditions générales de vente des prestations d’Agence Novara : sites web, audits, automatisations et suivi.' },
]
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

for (const p of pages) {
  const url = SITE + (p.path === '/' ? '/' : p.path)
  const noindex = ['mentions', 'confidentialite', 'cgv'].includes(p.key)
  const html = `<!doctype html>
<html lang="fr" class="no-js">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(p.title)}</title>
    <meta name="description" content="${esc(p.description)}" />
    <meta name="author" content="Agence Novara" />
    <meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}" />
    <link rel="canonical" href="${url}" />
    <link rel="icon" href="/favicon.ico" sizes="48x48" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <meta name="application-name" content="Agence Novara" />
    <meta name="apple-mobile-web-app-title" content="Agence Novara" />
    <meta name="theme-color" content="#060912" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="fr_FR" />
    <meta property="og:site_name" content="Agence Novara" />
    <meta property="og:title" content="${esc(p.title)}" />
    <meta property="og:description" content="${esc(p.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${SITE}/og-image.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(p.title)}" />
    <meta name="twitter:description" content="${esc(p.description)}" />
    <meta name="twitter:image" content="${SITE}/og-image.jpg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
    <!--structured-data-->
  </head>
  <body>
    <div id="root" data-page="${p.key}"><!--app-html--></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`
  const file = p.path === '/' ? 'index.html' : path.join(p.path.slice(1), 'index.html')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, html)
}
console.log(`${pages.length} pages HTML générées`)

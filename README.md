# Agence Novara — Sites web et automatisations sur mesure

Site d'Agence Novara (React, Vite, Tailwind), prérendu page par page pour le référencement et les moteurs IA.

## Pages
| URL | Fichier |
|---|---|
| `/` | `src/pages/Home.jsx` |
| `/automatisations` | `src/pages/Automatisations.jsx` |
| `/a-propos` | `src/pages/APropos.jsx` |
| `/mentions-legales`, `/confidentialite`, `/cgv` | `src/pages/Legal.jsx` |

## Commandes
- `npm install` puis `npm run dev` pour travailler en local
- `npm run build` : génère les pages HTML (`scripts/gen-html.js`), construit le site, prérend chaque page,
  ajoute les données structurées, `sitemap.xml` et `llms.txt` (`prerender.js`)

## Textes et réglages
- Identité, offres web, FAQ, tarif de l'audit : `src/content.js`
- Textes de la page automatisations : `src/content-auto.js`
- Titres et descriptions SEO : `scripts/gen-html.js`

## Fonctions serveur (Vercel)
- `api/demande.js` : formulaires Projet web et Automatisations → CRM RTB (voir `docs/raccordement-rtb.md`)
- `api/avis.js` : avis clients (Upstash Redis, mot de passe `ADMIN_PASSWORD`)

## Documentation
- `GEO.md` : stratégie de référencement et textes pour les réseaux
- `docs/raccordement-rtb.md` : informations à fournir pour finaliser le CRM
- `docs/procedure-audit.md` : procédure interne d'entretien (non publiée)

import Home from './Home.jsx'
import Automatisations from './Automatisations.jsx'
import APropos from './APropos.jsx'
import { MentionsLegales, Confidentialite, CGV } from './Legal.jsx'
import { AUTO_META } from '../content-auto.js'

// Une entrée par page : chemin public, composant et métadonnées SEO
export const PAGES = {
  home: {
    path: '/',
    Component: Home,
    title: 'Agence Novara — Sites web & automatisations. Plus de visibilité. Plus de temps.',
    description:
      'Agence Novara crée des sites web sur mesure et des automatisations pour indépendants, artisans et PME. Sites dès 490 €, livrés en 1 à 3 jours. Pays de Saint-Malo.',
    priority: '1.0',
  },
  automatisations: {
    path: '/automatisations',
    Component: Automatisations,
    title: AUTO_META.title,
    description: AUTO_META.description,
    priority: '0.9',
  },
  apropos: {
    path: '/a-propos',
    Component: APropos,
    title: 'À propos — Émilie Caignet, fondatrice d’Agence Novara',
    description: 'Émilie Caignet a fondé Agence Novara pour aider les indépendants et petites entreprises avec des sites web et des automatisations sur mesure. Pays de Saint-Malo.',
    priority: '0.6',
  },
  mentions: { path: '/mentions-legales', Component: MentionsLegales, title: 'Mentions légales | Agence Novara', description: 'Mentions légales du site Agence Novara.', priority: '0.2' },
  confidentialite: { path: '/confidentialite', Component: Confidentialite, title: 'Politique de confidentialité | Agence Novara', description: 'Comment Agence Novara collecte, utilise et protège vos données personnelles.', priority: '0.2' },
  cgv: { path: '/cgv', Component: CGV, title: 'Conditions générales de vente | Agence Novara', description: 'Conditions générales de vente des prestations d’Agence Novara : sites web, audits, automatisations et suivi.', priority: '0.2' },
}

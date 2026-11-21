// Tous les textes du site au même endroit.
// Le prérendu s'en sert aussi pour générer les données structurées (GEO).

export const SITE_URL = 'https://www.agencenovara.fr'

// Formulaires Airtable (s'ouvrent dans un nouvel onglet, sans connexion Airtable)
export const FORM_WEB = 'https://airtable.com/appxtl1bFJk12XwM8/pagCz2YcJBILtanPh/form'
export const FORM_AUTO = 'https://airtable.com/appxtl1bFJk12XwM8/pag4GgjNx8wiIfQNU/form'
export const EXTERNAL = { target: '_blank', rel: 'noopener noreferrer' }

// Identité publique (mentions légales, CGV, données structurées)
export const IDENTITY = {
  brand: 'Agence Novara',
  owner: 'Émilie Caignet',
  legalForm: 'Entreprise individuelle (EI)',
  legalName: 'Émilie Caignet (EI), exerçant sous le nom commercial Agence Novara',
  siret: '792 214 116 00016',
  street: '22 La Herlise',
  postalCode: '35540',
  city: 'Miniac-Morvan',
  region: 'Pays de Saint-Malo',
  email: 'contact@agencenovara.fr',
  phone: '06 72 36 40 97',
  phoneIntl: '+33672364097',
  // À vérifier avec les CGV validées
  vat: 'TVA non applicable, article 293 B du Code général des impôts.',
}

export const NAV = [
  { label: 'Sites web', href: '/#services' },
  { label: 'Automatisations & IA', href: '/automatisations' },
  { label: 'Réalisations', href: '/#realisations' },
  { label: 'Tarifs', href: '/#tarifs' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Contact', href: '/#contact' },
]

export const FOOTER_LINKS = [
  { label: 'Contact', href: '/#contact' },
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Politique de confidentialité', href: '/confidentialite' },
  { label: 'Conditions générales de vente', href: '/cgv' },
]

export const SERVICES = [
  {
    id: 'web',
    title: 'Création de sites web',
    text: 'Des sites sur mesure, rapides et optimisés pour Google, pensés pour transformer vos visiteurs en clients. Dès 490 €, livrés en 1 à 3 jours.',
    cta: 'Voir les formules',
    href: '/#tarifs',
  },
  {
    id: 'auto',
    title: 'Automatisations & IA',
    text: 'Des automatisations sur mesure pour les indépendants et les petites entreprises. Nous partons de vos habitudes de travail pour simplifier les tâches qui vous prennent du temps.',
    cta: 'Découvrir les automatisations',
    href: '/automatisations',
  },
]

export const STATS = [
  { value: '50+', label: 'Sites livrés' },
  { value: '5 ans', label: "D'expérience" },
  { value: '100%', label: 'Sur mesure' },
]

export const PROFILES = [
  {
    n: '01',
    badge: 'Indépendant ou artisan',
    title: 'Vous voulez un site qui inspire confiance dès la première visite.',
    text: 'Un site vitrine clair, rapide, qui présente votre activité et donne envie de vous contacter — sans jargon technique de votre côté.',
  },
  {
    n: '02',
    badge: 'PME ou startup',
    title: 'Vous voulez un site qui accompagne votre croissance.',
    text: "Un site structuré pour convertir des visiteurs en clients : formulaires, prise de rendez-vous, mise en avant de vos offres, tout pensé pour l'action.",
  },
]

// Bloc « En bref » : réponses courtes et factuelles, faciles à citer par Google et les IA
export const KEY_FACTS = [
  { label: 'Prestation', value: 'Création de site web sur mesure : site vitrine une page ou site multi-pages' },
  { label: 'Pour qui', value: 'Indépendants, artisans, professions libérales, PME et startups' },
  { label: 'Prix', value: 'De 490 € à 990 €, tarif fixe annoncé dès le départ' },
  { label: 'Délai', value: '1 à 3 jours selon la formule' },
  { label: 'Inclus', value: 'Design adapté au mobile, optimisation pour Google, révisions, accompagnement' },
  { label: 'Démarrage', value: 'Premier échange offert de 30 minutes, sans engagement' },
  { label: 'Basée', value: 'Pays de Saint-Malo (Ille-et-Vilaine), clients partout en France' },
]

export const WHY = [
  { icon: 'zap', title: 'Rapide', text: 'Livraison en 1 à 3 jours selon la formule, sans attente interminable.' },
  { icon: 'palette', title: 'Sur mesure', text: 'Aucun template générique : un design pensé pour votre activité et votre image.' },
  { icon: 'wallet', title: 'Prix transparent', text: 'Un tarif fixe annoncé dès le départ, sans frais cachés ni surprise en cours de route.' },
  { icon: 'lifebuoy', title: 'Accompagnement', text: 'Disponible après la mise en ligne pour les ajustements et vos questions.' },
]

export const STEPS = [
  { n: '01', title: 'Découverte', text: 'Nous échangeons sur votre activité, vos objectifs et ce dont vous avez vraiment besoin.' },
  { n: '02', title: 'Design', text: 'Je vous propose une direction visuelle sur mesure, alignée avec votre image.' },
  { n: '03', title: 'Développement', text: 'Je code le site : rapide, adapté à tous les écrans, optimisé pour le référencement.' },
  { n: '04', title: 'Lancement', text: 'Mise en ligne, formation rapide, et je reste disponible après livraison.' },
]

export const PLANS = [
  {
    name: 'Essentiel',
    price: '490€',
    amount: 490,
    tagline: 'Pour démarrer avec un site propre et efficace',
    features: [
      'Site vitrine une page',
      'Design adapté à tous les écrans (mobile, tablette, ordinateur)',
      "Jusqu'à 4 sections sur mesure",
      '1 aller-retour de révisions',
    ],
    highlight: false,
  },
  {
    name: 'Pro',
    price: '790€',
    amount: 790,
    tagline: 'Le plus choisi, pour un site qui structure votre activité',
    features: [
      "Site multi-pages (jusqu'à 5 pages)",
      'Design adapté à tous les écrans, sur mesure',
      'Formulaire de contact intégré',
      'Optimisation de base pour être bien référencé sur Google',
      '2 allers-retours de révisions',
    ],
    highlight: true,
  },
  {
    name: 'Signature',
    price: '990€',
    amount: 990,
    tagline: 'Pour un site entièrement sur mesure, sans compromis',
    features: [
      'Site multi-pages illimité',
      'Direction artistique 100% personnalisée',
      'Animations et micro-interactions',
      'Optimisation avancée pour être bien référencé sur Google',
      'Révisions illimitées pendant le projet',
      'Accompagnement après lancement',
    ],
    highlight: false,
  },
]

export const PROJECTS = [
  {
    url: 'https://emilie-caignet-immobilier.vercel.app/',
    category: 'Site vitrine — Mandataire immobilier',
    name: 'Emilie Caignet Immobilier',
    text: 'Site multi-pages complet : estimation, biens en vente, conseils, avis clients.',
    alt: 'Aperçu du site Emilie Caignet Immobilier',
  },
]

export const FAQ = [
  {
    q: 'Combien de temps pour livrer mon site ?',
    a: 'Comptez entre 1 et 3 jours selon la formule choisie. Le délai précis est confirmé après notre échange de découverte.',
  },
  {
    q: "Combien coûte la création d'un site internet avec Novara ?",
    a: "Les tarifs sont fixes et annoncés dès le départ : 490 € pour un site vitrine une page (Essentiel), 790 € pour un site jusqu'à 5 pages (Pro) et 990 € pour un site entièrement sur mesure, sans limite de pages (Signature). Aucun frais caché.",
  },
  {
    q: 'Mon site sera-t-il bien référencé sur Google et visible dans les IA ?',
    a: "Oui. Chaque site est rapide, adapté au mobile et structuré pour les moteurs de recherche : titres, descriptions, données structurées et contenus clairs. Cette structure aide aussi les assistants IA comme ChatGPT, Gemini ou Perplexity à comprendre votre activité et à la recommander.",
  },
  {
    q: "Quelle différence entre un site sur mesure et un site fait avec un modèle ?",
    a: "Un modèle (template) est générique et partagé par des milliers de sites. Un site sur mesure est conçu pour votre activité, votre image et vos clients : il est plus rapide, se démarque davantage et est pensé pour transformer les visiteurs en demandes de contact.",
  },
  {
    q: 'Est-ce que je peux modifier le contenu moi-même après ?',
    a: 'Oui. Selon vos besoins, le site peut être livré avec une interface simple vous permettant de modifier textes et images, ou je peux rester disponible pour effectuer les mises à jour à votre place.',
  },
  {
    q: 'Que se passe-t-il si je ne suis pas satisfait ?',
    a: "Chaque formule inclut un nombre d'allers-retours de révisions pour ajuster le design avant la mise en ligne. L'objectif est toujours d'aboutir à un site qui vous convient pleinement.",
  },
  {
    q: 'Proposez-vous la maintenance après la mise en ligne ?',
    a: "Oui, sous forme d'accompagnement ponctuel ou d'un forfait mensuel selon vos besoins — nous en discutons ensemble une fois le site livré.",
  },
  {
    q: 'Comment démarrer mon projet ?',
    a: "Décrivez votre projet dans le formulaire de contact. Nous vous recontactons pour un premier échange offert de 30 minutes, sans engagement, puis nous vous proposons la formule adaptée et un délai précis.",
  },
]

export const AUDIT_LAUNCH_END = '2027-03-31' // inclus, heure de Paris
export const AUDIT_PRICE_LAUNCH = 150
export const AUDIT_PRICE_STANDARD = 200

// Date du jour en France métropolitaine, au format AAAA-MM-JJ
export function parisDate(d = new Date()) {
  return new Intl.DateTimeFormat('fr-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d)
}
export const auditPrice = (d) => (parisDate(d) <= AUDIT_LAUNCH_END ? AUDIT_PRICE_LAUNCH : AUDIT_PRICE_STANDARD)

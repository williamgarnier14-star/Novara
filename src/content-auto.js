// Textes de la page Automatisations & IA

export const AUTO_META = {
  title: 'Automatisations sur mesure pour indépendants et TPE | Agence Novara',
  description:
    'Agence Novara analyse vos habitudes de travail et conçoit des automatisations sur mesure pour les indépendants et petites entreprises. Premier échange offert de 30 minutes.',
}

export const DAY_CHANGE = [
  {
    icon: 'workflow',
    title: 'Votre façon de travailler',
    text: '« Je reçois mes demandes par e-mail et je suis mes devis dans un tableau. »',
    quote: true,
  },
  {
    icon: 'hourglass',
    title: 'Ce qui vous prend du temps',
    text: '« Je ressaisis les coordonnées et je dois penser à vérifier quels devis sont restés sans réponse. »',
    quote: true,
  },
  {
    icon: 'sparkles',
    title: 'Ce qu’on simplifie ensemble',
    text: 'Les nouvelles demandes se retrouvent dans votre tableau et un rappel vous indique quand relancer. Vous gardez la main sur le message envoyé au client.',
    quote: false,
  },
]

export const SECTORS = [
  {
    icon: 'hammer',
    name: 'Artisanat et bâtiment',
    situation: 'Vous êtes sur un chantier. Vous manquez des appels, les rendez-vous restent à fixer et les devis s’accumulent.',
    simplify: 'Recueillir les demandes de rappel ou de rendez-vous et préparer un brouillon de devis à partir de vos notes et de vos tarifs, à valider avant l’envoi.',
  },
  {
    icon: 'briefcase',
    name: 'Vente et développement commercial',
    situation: 'Après les rendez-vous, il faut saisir les comptes rendus, retrouver les relances prioritaires et préparer les prochaines propositions.',
    simplify: 'Transformer vos notes en brouillons de comptes rendus, faire ressortir les relances du jour et préparer une synthèse avant un rendez-vous ou une proposition à valider.',
  },
  {
    icon: 'home',
    name: 'Immobilier',
    situation: 'Les demandes arrivent par plusieurs canaux et les notes de visite s’accumulent entre deux déplacements.',
    simplify: 'Regrouper les demandes, retrouver les critères du prospect et préparer les prochaines actions à partir des notes de visite.',
  },
  {
    icon: 'store',
    name: 'Commerce et création',
    situation: 'Vous répondez souvent aux mêmes questions sur les commandes, la disponibilité ou les délais.',
    simplify: 'Regrouper les demandes et préparer des réponses à partir des informations disponibles, avec une validation pour les cas qui demandent votre avis.',
  },
  {
    icon: 'graduation',
    name: 'Conseil et formation',
    situation: 'Après chaque rendez-vous, vous devez envoyer les supports, rédiger une synthèse et suivre les actions convenues.',
    simplify: 'Préparer les éléments de suivi à partir de vos notes, regrouper les documents et programmer les rappels utiles.',
  },
  {
    icon: 'calendar',
    name: 'Services sur rendez-vous',
    situation: 'Trouver un créneau demande plusieurs messages, puis il faut gérer confirmations et reports.',
    simplify: 'Faciliter la prise de rendez-vous selon vos disponibilités, envoyer les confirmations et tenir votre agenda à jour.',
  },
]

// Le prénom « Fanny » n'est pas affiché : son usage public n'a pas été confirmé.
export const CASE_STUDY = {
  persona: 'Une agente commerciale indépendante en immobilier',
  blocks: [
    {
      title: 'Son quotidien',
      text: 'Elle enchaîne les visites et les rendez-vous. Elle prend des notes entre deux déplacements. En fin de journée, il lui reste à rédiger ses comptes rendus, à mettre à jour son suivi et à identifier les clients à rappeler.',
    },
    {
      title: 'Ce qu’on peut mettre en place',
      text: 'Elle conserve sa façon de prendre des notes, à l’écrit ou à la voix. À partir de ces notes, un assistant prépare un brouillon de compte rendu et une liste d’actions. Après sa validation, les actions rejoignent son outil de suivi avec les relances à prévoir.',
    },
    {
      title: 'Par quoi commencer',
      text: 'Le premier module peut se limiter au compte rendu et à la prochaine relance après chaque visite. La préparation des rendez-vous ou la centralisation des demandes peut venir ensuite.',
    },
  ],
}

export const OPPORTUNITIES = [
  { item: 'Ajouter un rappel pour les devis sans réponse', benefit: 'Relancer au bon moment', effort: 'Faible · gain rapide', priority: 'À faire en premier', level: 1 },
  { item: 'Regrouper les demandes reçues par e-mail et formulaire', benefit: 'Réduire les doubles saisies', effort: 'Moyen', priority: 'Prioritaire', level: 2 },
  { item: 'Préparer des brouillons de devis à partir des notes', benefit: 'Accélérer la préparation des devis', effort: 'Plus important', priority: 'Dans un second temps', level: 3 },
]

export const DELIVERY = [
  {
    title: 'Vous testez la solution avant de valider',
    paragraphs: [
      'Après la démonstration, vous disposez de 15 jours calendaires à compter de la mise à disposition de la version de test. Vous pouvez l’essayer sur des situations représentatives de votre activité. Nous faisons ensuite le point ensemble. Au moins un aller-retour de modifications dans le périmètre du devis est inclus avant la validation finale.',
    ],
  },
  {
    title: 'Nous installons la solution et vous prenez la main',
    paragraphs: [
      'Après validation écrite et règlement, nous mettons la solution en service sur vos comptes. Vous recevez les outils configurés et les automatisations prévues au devis, une formation, une notice d’utilisation et un dossier technique.',
      'Ce dossier documente les réglages, les connexions et les éléments nécessaires pour reprendre la solution ou la faire évoluer avec un autre prestataire.',
    ],
  },
  {
    title: 'Vous disposez de 15 jours après la mise en service',
    paragraphs: [
      'À compter de la mise en service, vous disposez de 15 jours calendaires pour signaler un bug ou demander un dernier ajustement dans le périmètre prévu. Cette période est incluse dans la mise en place, avec ou sans abonnement de suivi.',
      'Pour les automatisations qui se déclenchent peu souvent, le devis peut prévoir un protocole de test adapté.',
    ],
  },
]

export const AUTO_FAQ = [
  {
    q: 'Combien coûte une automatisation pour un indépendant ?',
    a: 'Chaque automatisation est faite sur devis, selon votre besoin. Le paiement se fait en une fois, sans acompte, après validation écrite de la démonstration finale. Pour savoir par où commencer, l’audit solo coûte 150 € jusqu’au 31 mars 2027, puis 200 €, et il est déduit d’une mise en place d’au moins 500 €.',
  },
  {
    q: 'Faut-il changer d’outils pour automatiser ?',
    a: 'Non. Quand vos outils actuels conviennent, nous nous appuyons dessus : supprimer une double saisie, programmer un rappel ou relier deux outils suffit souvent à alléger vos journées.',
  },
  {
    q: 'Qui garde la main sur les comptes et les données ?',
    a: 'Vous. Les comptes d’hébergement, d’automatisation et d’intelligence artificielle sont ouverts à votre nom. Vous gardez les accès administrateur et payez directement vos abonnements. Vous pouvez accorder un accès délégué à Agence Novara, puis le retirer.',
  },
  {
    q: 'L’IA envoie-t-elle des messages à mes clients sans mon accord ?',
    a: 'Non. Les assistants préparent des brouillons, des listes d’actions ou des rappels. Vous validez avant tout envoi aux clients, et les cas qui demandent votre avis vous sont signalés.',
  },
]

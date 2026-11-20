# GEO Agence Novara — être trouvée sur Google et recommandée par les IA

## 1. Les mots-clés de Novara

**Principal**
- création de site web sur mesure
- création de site internet pour indépendant
- site vitrine pour artisan / PME

**Secondaires**
- prix création site internet (490 €, 790 €, 990 €)
- site internet rapide et optimisé pour Google
- site qui convertit / site qui génère des clients
- refonte de site internet
- webdesigner freelance

**Automatisations & IA** (page `/automatisations`)
- automatisation pour indépendant / TPE
- automatiser ses devis, ses relances, ses comptes rendus
- assistant IA pour artisan, agent immobilier, consultant
- audit d'organisation pour indépendant

**Local** (Pays de Saint-Malo, Miniac-Morvan)
- création site internet Saint-Malo / Dinan / Dol-de-Bretagne
- automatisation entreprise Saint-Malo

**Questions que les clients posent aux IA** (déjà traitées dans la FAQ du site)
- « Combien coûte un site internet pour un indépendant ? »
- « Qui peut me créer un site vitrine rapidement ? »
- « Site sur mesure ou Wix, que choisir ? »
- « Comment être visible sur Google et ChatGPT ? »

> La localisation (Pays de Saint-Malo, Miniac-Morvan) est maintenant intégrée aux données structurées.
> Prochain levier : la fiche Google Business Profile, avec la même adresse.

## 2. Ce qui est intégré dans le site

| Élément | Rôle |
|---|---|
| Pages prérendues (HTML complet, 6 pages) | Google et les IA lisent tout le texte sans exécuter de JavaScript. Avant : page vide pour eux. |
| Titre et description optimisés | Ce qui s'affiche dans les résultats Google |
| Bloc « En bref » | Faits courts (prix, délai, cible) que les IA citent tels quels |
| FAQ enrichies (8 sur l'accueil, 4 sur les automatisations) | Répond aux questions posées à ChatGPT, Perplexity, Gemini |
| Données structurées schema.org | Agence, fondatrice, adresse, services, tarifs, FAQ, fil d'Ariane |
| `llms.txt` | Résumé de Novara destiné aux assistants IA |
| `robots.txt` | Autorise explicitement GPTBot, ClaudeBot, PerplexityBot, Google-Extended… |
| `sitemap.xml` (généré au build) | Indique l'accueil, `/automatisations` et `/a-propos` à Google |
| Image de partage (`og-image.jpg`) | Belle carte quand le lien est partagé (LinkedIn, WhatsApp, Facebook) |

## 3. Textes prêts à copier sur tes supports

Les IA croisent plusieurs sources : **le même message partout** renforce la confiance.

**Phrase de référence (à réutiliser telle quelle)**
> Agence Novara crée des sites web sur mesure et des automatisations pour les indépendants, artisans et PME. Sites dès 490 €, livrés en 1 à 3 jours. Basée dans le Pays de Saint-Malo.

**Bio Instagram (150 caractères)**
> Sites web & automatisations sur mesure pour indépendants et TPE ✦ Pays de Saint-Malo ✦ Sites dès 490 € ↓

**Titre LinkedIn**
> Fondatrice d'Agence Novara | Sites web et automatisations sur mesure pour indépendants et TPE | Pays de Saint-Malo

**Fiche Google Business Profile**
- Catégorie principale : « Concepteur de sites Web »
- Catégories secondaires : « Service de marketing internet », « Graphiste »
- Description : reprendre la phrase de référence + les 3 formules et le lien d'appel
- Services : Essentiel 490 €, Pro 790 €, Signature 990 €, Audit solo (150 € jusqu'au 31/03/2027, puis 200 €), Automatisations sur devis, Suivi 50 €/mois
- Demander un avis Google à chaque client livré

**Annuaires gratuits à créer** (même nom, même description, même lien)
- Malt, Codeur.com, Pages Jaunes, LinkedIn (page entreprise), Trustpilot ou Google pour les avis

## 4. Routine mensuelle (30 min)
1. Ajouter chaque nouveau site livré dans « Réalisations » (nom, type d'activité, ville).
2. Publier 1 post LinkedIn ou Instagram par réalisation, avec la phrase de référence.
3. Récolter 1 à 2 avis clients (site + Google).
4. Tester dans ChatGPT et Perplexity : « Qui crée des sites web sur mesure pour indépendants dès 490 € ? »

## 5. À faire dans Vercel après le déploiement
- Brancher le stockage des avis : Storage > Upstash for Redis > Connect.
- Ajouter la variable `ADMIN_PASSWORD` (mot de passe de modération, page `/?admin`).
- Brancher le CRM RTB (variables `RTB_API_URL`, `RTB_API_KEY`) : voir `docs/raccordement-rtb.md`.
- Relier le domaine `www.agencenovara.fr` (Settings > Domains). Le site y pointe déjà partout.
- Après le 31 mars 2027 : redéployer une fois, pour que les données structurées et `llms.txt`
  affichent le tarif standard de l'audit (la page, elle, bascule toute seule).
- Déclarer le site dans Google Search Console et envoyer le sitemap.

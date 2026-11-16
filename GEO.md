# GEO Novara — être trouvé sur Google et recommandé par les IA

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

**Questions que les clients posent aux IA** (déjà traitées dans la FAQ du site)
- « Combien coûte un site internet pour un indépendant ? »
- « Qui peut me créer un site vitrine rapidement ? »
- « Site sur mesure ou Wix, que choisir ? »
- « Comment être visible sur Google et ChatGPT ? »

> À ajouter dès que possible : **la ville ou la région** (ex. « création site web Saint-Malo »).
> C'est le levier le plus fort pour Google Maps et les recommandations locales des IA.

## 2. Ce qui est intégré dans le site

| Élément | Rôle |
|---|---|
| Page prérendue (HTML complet) | Google et les IA lisent tout le texte sans exécuter de JavaScript. Avant : page vide pour eux. |
| Titre et description optimisés | Ce qui s'affiche dans les résultats Google |
| Bloc « En bref » | Faits courts (prix, délai, cible) que les IA citent tels quels |
| FAQ enrichie (8 questions) | Répond aux questions posées à ChatGPT, Perplexity, Gemini |
| Données structurées schema.org | Service, tarifs, FAQ : Google et les IA comprennent l'offre |
| `llms.txt` | Résumé de Novara destiné aux assistants IA |
| `robots.txt` | Autorise explicitement GPTBot, ClaudeBot, PerplexityBot, Google-Extended… |
| `sitemap.xml` | Indique la page à Google |
| Image de partage (`og-image.jpg`) | Belle carte quand le lien est partagé (LinkedIn, WhatsApp, Facebook) |

## 3. Textes prêts à copier sur tes supports

Les IA croisent plusieurs sources : **le même message partout** renforce la confiance.

**Phrase de référence (à réutiliser telle quelle)**
> Novara crée des sites web sur mesure, rapides et optimisés pour Google, pour les indépendants, artisans et PME. Dès 490 €, livrés en 1 à 3 jours.

**Bio Instagram (150 caractères)**
> Sites web sur mesure pour indépendants & PME ✦ Rapides, pensés pour convertir ✦ Dès 490 € · livrés en 1 à 3 jours ↓

**Titre LinkedIn**
> Création de sites web sur mesure pour indépendants, artisans et PME | Sites rapides, optimisés pour Google et pensés pour convertir

**Fiche Google Business Profile**
- Catégorie principale : « Concepteur de sites Web »
- Catégories secondaires : « Service de marketing internet », « Graphiste »
- Description : reprendre la phrase de référence + les 3 formules et le lien d'appel
- Services : Essentiel 490 €, Pro 790 €, Signature 990 €
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
- Si un nom de domaine est acheté : remplacer `novara-mu-sand.vercel.app` dans
  `index.html`, `src/content.js`, `public/robots.txt` et `public/sitemap.xml`.
- Déclarer le site dans Google Search Console et envoyer le sitemap.

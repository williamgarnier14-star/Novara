# Raccordement des formulaires au CRM RTB

Les deux formulaires du site envoient leurs réponses à `/api/demande` (fonction Vercel),
qui les transmet au CRM RTB. Les identifiants ne sont jamais exposés au navigateur.

| Formulaire | Où | Type envoyé |
|---|---|---|
| Projet web | Accueil, section Contact (`/#contact`) | `projet-web` |
| Automatisations & IA | `/automatisations#questionnaire` | `automatisations` |

## Ce qui est déjà en place
- Validation des champs obligatoires côté navigateur et côté serveur.
- Protection anti-spam (champ piège invisible).
- Le message de succès s'affiche **uniquement** si RTB répond par un code 2xx.
- En cas d'échec, les réponses restent dans le formulaire et le visiteur peut réessayer.
- Chaque envoi contient : coordonnées, réponses (question + réponse), type de formulaire,
  page d'origine, date d'envoi, et l'e-mail en minuscules comme clé de rapprochement.

## Format envoyé à RTB (provisoire)
```json
{
  "evenement": "nouvelle_demande",
  "contact": { "cle": "client@exemple.fr", "nom": "…", "email": "client@exemple.fr",
               "telephone": "…", "entreprise": "…", "activite": "…" },
  "demande": { "type": "Automatisations & IA", "type_code": "automatisations",
               "source": "https://www.agencenovara.fr/automatisations#questionnaire",
               "date_envoi": "2026-11-20T10:00:00.000Z",
               "reponses": [ { "champ": "tache", "question": "…", "reponse": "…" } ] }
}
```

## Informations à fournir pour finaliser (à demander à RTB ou dans ses réglages)
1. **URL de l'API** à appeler pour créer une demande → variable `RTB_API_URL`.
2. **Clé ou jeton d'API** → variable `RTB_API_KEY`
   (et, si ce n'est pas `Authorization: Bearer …`, le nom de l'en-tête → `RTB_AUTH_HEADER`, `RTB_AUTH_PREFIX`).
3. **Rattachement au contact existant** : RTB fait-il la recherche par e-mail tout seul (« upsert »),
   ou faut-il d'abord appeler une route de recherche de contact, puis de création ? Avec quelles URL ?
4. **Mapping des champs** : nom exact des champs RTB pour le contact (nom, prénom séparés ?, téléphone,
   entreprise, activité) et pour la demande (type, source, date, réponses), ainsi que la liste des
   valeurs autorisées pour le type de formulaire.
5. **Historique des demandes** : objet RTB utilisé pour stocker chaque demande séparément (« demande »,
   « opportunité », « note », « activité »…).
6. **Événement « nouvelle demande »** : est-il déclenché automatiquement à la création, ou faut-il
   appeler une route dédiée ? C'est cet événement qu'Émilie utilisera pour l'alerte e-mail.

Dès réception, il suffit d'adapter `buildPayload()` dans `api/demande.js` et d'ajouter les variables
dans Vercel (Settings > Environment Variables), puis de redéployer.

## Tests à refaire après raccordement
- Envoi fictif de chaque formulaire → la demande apparaît dans RTB avec toutes les réponses.
- Deuxième envoi avec le même e-mail → rattaché au même contact, deux demandes distinctes.
- Couper la clé API (mauvaise valeur) → le visiteur voit le message d'erreur et garde ses réponses.
- Une fois l'automatisation activée par Émilie dans RTB → réception de l'alerte e-mail.

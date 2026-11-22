# Vidéos de présentation

## Version actuelle : `simple/` (sans voix)
Vidéos courtes et muettes, une idée par écran, texte grand et lisible.
- `simple/index.html?v=sites` : vidéo Sites web → `public/presentation.mp4`
- `simple/index.html?v=auto` : vidéo Automatisations → `public/presentation-automatisations.mp4`
- Les textes de chaque écran sont dans `simple/script.js`.
- Génération : `window.__render(t)` appelé image par image (30 images/s, 1920 × 1080), puis encodage H.264.

## Anciennes versions avec voix off : `sites/` et `automatisations/`
Conservées pour référence (voix de synthèse Piper, voix « pierre »).

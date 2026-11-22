# Vidéos de présentation

## Version actuelle : `simple/` (sans voix)
Vidéos courtes et muettes, une idée par écran, texte grand et lisible.
- `simple/index.html?v=sites` : vidéo Sites web → `public/presentation.mp4`
- `simple/index.html?v=auto` : vidéo Automatisations → `public/presentation-automatisations.mp4`
- Les textes de chaque écran sont dans `simple/script.js`.
- Génération : `window.__render(t)` appelé image par image (30 images/s, 1920 × 1080), puis accélération × 1,25 et encodage H.264.
- Musique de fond : composition originale générée par `simple/musique.py` (`python3 musique.py <durée> sortie.wav`), libre de droits.

## Anciennes versions avec voix off : `sites/` et `automatisations/`
Conservées pour référence (voix de synthèse Piper, voix « pierre »).

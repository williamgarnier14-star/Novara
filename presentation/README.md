# Vidéos de présentation

## Sites web (`sites/`)
Page animée pilotée par le temps, calée sur la voix off, qui sert de source à
`public/presentation.mp4` (bloc « Présentation » de l'accueil).

- Texte de la voix off : `sites/voix-off.json` (voix de synthèse Piper, fr_FR-upmc, voix « pierre »).
- Ouvrir `sites/index.html` dans un navigateur pour voir l'animation en boucle.
- Pour générer la vidéo : `window.__render(t)` est appelé image par image (30 images/s, 1920 × 1080),
  puis la vidéo et la voix off sont assemblées en MP4 (H.264 + AAC).

## Automatisations
À venir.

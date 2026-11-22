# Vidéo de présentation

Page animée au défilement (HTML, CSS, JS sans dépendance) qui sert de source à la vidéo
`public/presentation.mp4` affichée dans le bloc « Présentation » de l'accueil.

- Ouvrir `index.html` dans un navigateur et faire défiler pour voir l'animation en direct.
- La vidéo est générée image par image grâce à la fonction `window.__novaraCapture(scroll, mx, my, slider)`
  (30 images par seconde, 28 secondes, 1920 × 1080), puis encodée en H.264.

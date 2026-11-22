// Vidéos simples et sans voix : une idée par écran, texte grand et lisible.
(() => {
  const VIDEOS = {
    sites: {
      tag: 'Sites web',
      slides: [
        [3.0, `<p class="k">Création de sites web</p><h1>Agence <em>Novara</em></h1>`],
        [3.6, `<h2>Votre site, c'est votre <em>première impression</em>.</h2>`],
        [4.6, `<h2>Un site <em>sur mesure</em>.</h2><div class="row"><div class="box">Rapide</div><div class="box">Adapté au mobile</div><div class="box">Visible sur Google</div></div>`],
        [4.2, `<h2>Un site qui <em>travaille</em> pour vous.</h2><ul class="checks"><li><span>✓</span>Plus de visibilité</li><li><span>✓</span>Plus de clients</li></ul>`],
        [4.6, `<h2>En ligne en <em>1 à 3 jours</em>.</h2><div class="row"><div class="box">1. Échange offert</div><div class="arrow">→</div><div class="box">2. Création</div><div class="arrow">→</div><div class="box hot">3. En ligne</div></div>`],
        [3.4, `<h2>Trois formules, <em>prix fixes</em>.</h2><p class="sub">Sans frais cachés.</p>`],
        [8.6, `<div class="plan-slide"><div class="pcard"><b>Essentiel</b><strong>490 €</strong></div><ul class="plist"><li><span>✓</span>Site vitrine d'une page</li><li><span>✓</span>Adapté au mobile, à la tablette et à l'ordinateur</li><li><span>✓</span>Jusqu'à 4 sections sur mesure</li><li><span>✓</span>1 aller-retour de modifications</li></ul></div>`],
        [9.6, `<div class="plan-slide"><div class="pcard hot"><p class="pbadge">Le plus choisi</p><b>Pro</b><strong>790 €</strong></div><ul class="plist"><li><span>✓</span>Jusqu'à 5 pages</li><li><span>✓</span>Design sur mesure, adapté à tous les écrans</li><li><span>✓</span>Formulaire de contact</li><li><span>✓</span>Référencement Google de base</li><li><span>✓</span>2 allers-retours de modifications</li></ul></div>`],
        [10.6, `<div class="plan-slide"><div class="pcard"><b>Signature</b><strong>990 €</strong></div><ul class="plist"><li><span>✓</span>Pages illimitées</li><li><span>✓</span>Design 100 % personnalisé</li><li><span>✓</span>Animations et effets visuels</li><li><span>✓</span>Référencement Google avancé</li><li><span>✓</span>Modifications illimitées</li><li><span>✓</span>Accompagnement après la mise en ligne</li></ul></div>`],
        [4.6, `<p class="k">Premier échange offert · 30 minutes</p><h1>Agence <em>Novara</em></h1><div class="url">www.agencenovara.fr</div>`],
      ],
    },
    auto: {
      tag: 'Automatisations',
      slides: [
        [3.0, `<p class="k">Automatisations</p><h1>Agence <em>Novara</em></h1>`],
        [4.2, `<h2>Trop de tâches <em>répétitives</em>&nbsp;?</h2><div class="row"><div class="box">Recopier</div><div class="box">Relancer</div><div class="box">Rédiger</div></div>`],
        [3.6, `<h2>Nous les <em>automatisons</em> pour vous.</h2><p class="sub">En partant de votre façon de travailler.</p>`],
        [5.0, `<h2>Un <em>exemple</em> simple.</h2><div class="row"><div class="box col">Demande reçue<small>par e-mail</small></div><div class="arrow">→</div><div class="box col">Ajoutée au tableau<small>sans ressaisie</small></div><div class="arrow">→</div><div class="box col hot">Rappel envoyé<small>au bon moment</small></div></div>`],
        [4.2, `<h2>Le <em>résultat</em>.</h2><ul class="checks"><li><span>✓</span>Moins d'oublis</li><li><span>✓</span>Plus de temps</li></ul>`],
        [4.8, `<h2>Vous testez <em>avant</em> de payer.</h2><div class="row"><div class="box">Échange offert</div><div class="arrow">→</div><div class="box">15 jours de test</div><div class="arrow">→</div><div class="box hot">Vous validez</div></div>`],
        [4.6, `<p class="k">Premier échange offert · 30 minutes</p><h1>Agence <em>Novara</em></h1><div class="url">www.agencenovara.fr</div>`],
      ],
    },
  }
  const params = new URLSearchParams(location.search)
  const V = VIDEOS[params.get('v')] || VIDEOS.sites
  document.getElementById('tag').textContent = V.tag
  const host = document.getElementById('slides')
  const slides = V.slides.map(([d, html]) => { const el = document.createElement('section'); el.className = 'slide'; el.innerHTML = html; host.appendChild(el); return { d, el } })
  let acc = 0; slides.forEach((s) => { s.from = acc; acc += s.d; s.to = acc })
  const TOTAL = acc; window.VIDEO_TOTAL = TOTAL
  const clamp = (v) => Math.min(1, Math.max(0, v))
  const ease = (x) => 1 - Math.pow(1 - clamp(x), 3)
  const bar = document.getElementById('bar'), bg = document.getElementById('bg'), glow = document.getElementById('glow')
  const TR = 0.5

  window.__render = (t) => {
    bar.style.width = `${(clamp(t / TOTAL) * 100).toFixed(2)}%`
    bg.style.transform = `scale(${(1 + 0.06 * t / TOTAL).toFixed(4)})`
    glow.style.transform = `translate3d(${(Math.sin(t * 0.4) * 30).toFixed(1)}px, ${(Math.cos(t * 0.3) * 20).toFixed(1)}px, 0)`
    slides.forEach((s, i) => {
      const last = i === slides.length - 1
      const enter = s.from === 0 ? 1 : ease((t - s.from) / TR)
      const exit = last ? 0 : ease((t - (s.to - TR * 0.6)) / (TR * 0.6))
      const op = enter * (1 - exit)
      s.el.style.opacity = op.toFixed(3)
      s.el.style.visibility = op > 0.001 ? 'visible' : 'hidden'
      s.el.style.transform = `translate3d(0, ${((1 - enter) * 30 - exit * 30).toFixed(1)}px, 0)`
      // Les éléments arrivent l'un après l'autre
      const parts = s.el.querySelectorAll('.k, h1, h2, .sub, .box, .arrow, .price, .checks li, .url, .pcard, .plist li')
      parts.forEach((p, j) => {
        const pe = s.from === 0 && j === 0 ? 1 : ease((t - s.from - 0.15 - j * (s.el.querySelector('.plist') ? 0.32 : 0.18)) / 0.5)
        p.style.opacity = pe.toFixed(3)
        p.style.transform = `translate3d(0, ${((1 - pe) * 28).toFixed(1)}px, 0)`
      })
    })
  }
  if (!params.has('capture')) {
    const t0 = performance.now()
    const loop = () => { window.__render(((performance.now() - t0) / 1000) % TOTAL); requestAnimationFrame(loop) }
    requestAnimationFrame(loop)
  } else window.__render(0)
})()

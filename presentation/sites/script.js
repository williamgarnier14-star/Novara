// Vidéo « Sites web » d'Agence Novara : rendu piloté par le temps, calé sur la voix off.
(() => {
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
  const ss = (a, b, v) => { const x = clamp((v - a) / (b - a)); return x * x * (3 - 2 * x) }
  const ease = (x) => 1 - Math.pow(1 - clamp(x), 3)

  // Calendrier : chaque phrase commence après la précédente, avec une courte pause
  const LEAD = 1.0, GAP = 0.45
  const seg = {}; let t = LEAD
  for (const [k, d] of window.VO_DURATIONS) { seg[k] = { start: t, end: t + d }; t += d + GAP }
  const TOTAL = t + 2.2
  window.VO_SCHEDULE = seg; window.VIDEO_TOTAL = TOTAL

  const scenes = {
    intro: { el: '#s-intro', from: 0, to: seg.surmesure.start - 0.2 },
    surmesure: { el: '#s-surmesure', from: seg.surmesure.start - 0.2, to: seg.travaille.start - 0.2 },
    travaille: { el: '#s-travaille', from: seg.travaille.start - 0.2, to: seg.process.start - 0.2 },
    process: { el: '#s-process', from: seg.process.start - 0.2, to: seg.formules.start - 0.2 },
    formules: { el: '#s-formules', from: seg.formules.start - 0.2, to: seg.fin.start - 0.3 },
    fin: { el: '#s-fin', from: seg.fin.start - 0.3, to: TOTAL + 5 },
  }
  const $ = (s) => document.querySelector(s)
  for (const k in scenes) scenes[k].node = $(scenes[k].el)
  const sky = $('#sky'), glow = $('#glow'), skyline = $('#skyline'), cliffL = $('#cliffL'), cliffR = $('#cliffR')
  const TR = 0.7 // durée des transitions (s)

  function renderScene(sc, time) {
    const enter = sc.from <= 0 ? 1 : ss(sc.from, sc.from + TR, time)
    const exit = ss(sc.to - TR * 0.6, sc.to + TR * 0.4, time)
    const op = enter * (1 - exit)
    const n = sc.node
    n.style.opacity = op.toFixed(3)
    n.style.visibility = op > 0.002 ? 'visible' : 'hidden'
    const scale = 0.94 + 0.06 * enter + 0.12 * exit
    const y = (1 - enter) * 50 - exit * 70
    const blur = (1 - enter) * 10 + exit * 14
    n.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`
    n.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none'
    // Apparition décalée des éléments internes
    const span = sc.to - sc.from
    n.querySelectorAll('[data-at]').forEach((el) => {
      const at = sc.from + span * Number(el.dataset.at)
      const p = ease((time - at) / 0.6)
      if (el.classList.contains('bar')) { el.style.transform = `scaleX(${p.toFixed(3)})`; return }
      el.style.opacity = p.toFixed(3)
      el.style.transform = `translate3d(0, ${((1 - p) * 40).toFixed(1)}px, 0)`
    })
    return op
  }

  function renderPlans(time) {
    const order = [['#p-essentiel', seg.essentiel], ['#p-pro', seg.pro], ['#p-signature', seg.signature]]
    order.forEach(([sel, s], i) => {
      const el = $(sel)
      const appear = ease((time - (seg.formules.start + 0.5 + i * 0.35)) / 0.7)
      const focus = ss(s.start - 0.3, s.start + 0.2, time) * (1 - ss(s.end + 0.1, s.end + 0.6, time))
      const anyFocus = order.some(([, o]) => time >= o.start - 0.3 && time <= o.end + 0.6)
      const dim = anyFocus ? 1 - focus : 0
      const lift = focus * -26
      el.style.opacity = (appear * (1 - dim * 0.55)).toFixed(3)
      el.style.transform = `translate3d(0, ${((1 - appear) * 60 + lift).toFixed(1)}px, 0) scale(${(1 + focus * 0.06).toFixed(4)})`
      el.style.boxShadow = focus > 0.01 ? `0 0 0 ${(4 * focus).toFixed(1)}px #3b6ce0, 0 40px 100px rgba(59,108,224,${(0.45 * focus).toFixed(2)})` : '0 30px 80px rgba(0,0,0,.45)'
    })
  }

  window.__render = (time) => {
    const g = clamp(time / TOTAL)
    const mx = Math.sin(time * 0.5) * 0.5, my = Math.cos(time * 0.4) * 0.5
    sky.style.transform = `translate3d(${(mx * -14).toFixed(1)}px, ${(my * -8).toFixed(1)}px, 0) scale(${(1 + g * 0.12).toFixed(4)})`
    glow.style.transform = `translate3d(${(mx * 30).toFixed(1)}px, ${(my * 20).toFixed(1)}px, 0) scale(${(1 + 0.05 * Math.sin(time * 0.7)).toFixed(4)})`
    // Ville de fenêtres : s'efface et se floute pendant les scènes de contenu
    const content = ss(scenes.intro.to - 0.6, scenes.intro.to + 0.6, time) * (1 - ss(scenes.fin.from - 0.4, scenes.fin.from + 0.8, time))
    skyline.style.transform = `translate3d(calc(-50% + ${(mx * 24).toFixed(1)}px), ${(8 + content * 10).toFixed(2)}vh, 0) scale(${(0.9 + g * 0.2).toFixed(4)})`
    skyline.style.filter = `blur(${(content * 12).toFixed(2)}px) brightness(${(1 - content * 0.45).toFixed(3)})`
    // Cadres qui s'écartent à la fin de l'intro
    const split = Math.pow(ss(scenes.intro.to - 1.2, scenes.intro.to + 0.8, time), 1.5)
    const back = ss(scenes.fin.from - 0.2, scenes.fin.from + 1.2, time)
    const open = split * (1 - back)
    cliffL.style.transform = `translate3d(${(-open * 46 + mx * 1.2).toFixed(2)}vw, ${(open * 160).toFixed(1)}px, 0) scale(${(1 + open * 0.5).toFixed(4)})`
    cliffR.style.transform = `translate3d(${(open * 46 + mx * 1.2).toFixed(2)}vw, ${(open * 160).toFixed(1)}px, 0) scale(${(1 + open * 0.5).toFixed(4)})`
    for (const k in scenes) renderScene(scenes[k], time)
    renderPlans(time)
  }

  // Lecture en direct dans le navigateur
  if (!/capture/.test(location.search)) {
    const t0 = performance.now()
    const loop = () => { window.__render(((performance.now() - t0) / 1000) % TOTAL); requestAnimationFrame(loop) }
    requestAnimationFrame(loop)
  } else window.__render(0)
})()

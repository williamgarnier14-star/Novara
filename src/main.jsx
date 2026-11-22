import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { PAGES } from './pages/registry.js'
import './index.css'

const root = document.getElementById('root')
const key = root.dataset.page || 'home'
const { Component } = PAGES[key] || PAGES.home
const app = <StrictMode><Component /></StrictMode>

// Chaque page est prérendue (HTML complet pour Google et les IA) : on la « réactive ».
if (root.hasChildNodes()) hydrateRoot(root, app)
else {
  root.innerHTML = ''
  createRoot(root).render(app)
}

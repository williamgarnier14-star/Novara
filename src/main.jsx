import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { PAGES } from './pages/registry.js'
import './index.css'

const root = document.getElementById('root')
const key = root.dataset.page || 'home'
const { Component } = PAGES[key] || PAGES.home
const admin = key === 'home' && new URLSearchParams(window.location.search).has('admin')
const app = <StrictMode><Component admin={admin} /></StrictMode>

// Chaque page est prérendue (HTML complet pour Google et les IA) : on la « réactive ».
if (root.hasChildNodes() && !admin) hydrateRoot(root, app)
else {
  root.innerHTML = ''
  createRoot(root).render(app)
}

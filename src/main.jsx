import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const admin = new URLSearchParams(window.location.search).has('admin')
const root = document.getElementById('root')
const app = <StrictMode><App admin={admin} /></StrictMode>

// La page est prérendue (HTML complet pour Google et les IA) : on la « réactive ».
// L'espace admin, lui, n'est pas prérendu.
if (root.hasChildNodes() && !admin) hydrateRoot(root, app)
else {
  root.innerHTML = ''
  createRoot(root).render(app)
}

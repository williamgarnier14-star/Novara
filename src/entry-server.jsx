import { renderToString } from 'react-dom/server'
import { PAGES } from './pages/registry.js'

export { PAGES }
export { SITE_URL, FORM_WEB, FORM_AUTO, IDENTITY, PLANS, FAQ, KEY_FACTS, SERVICES, auditPrice } from './content.js'
export { AUTO_FAQ, SECTORS } from './content-auto.js'

export function render(key) {
  const { Component } = PAGES[key]
  return renderToString(<Component />)
}

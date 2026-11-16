import { renderToString } from 'react-dom/server'
import App from './App.jsx'

export { SITE_URL, CALENDLY, PLANS, FAQ, KEY_FACTS, PROJECTS } from './content.js'

export function render() {
  return renderToString(<App />)
}

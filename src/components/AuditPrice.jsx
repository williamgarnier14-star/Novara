import { useEffect, useState } from 'react'
import { auditPrice, AUDIT_PRICE_LAUNCH, AUDIT_PRICE_STANDARD, AUDIT_LAUNCH_END } from '../content.js'

/* global __BUILD_DATE__ */
// Prix calculé à la date du build (HTML prérendu), puis recalculé dans le navigateur
// selon la date en France métropolitaine. Après le 31 mars 2027, seul le tarif standard s'affiche.
const BUILD_DATE = typeof __BUILD_DATE__ !== 'undefined' ? new Date(__BUILD_DATE__) : new Date()

export function useAuditPrice() {
  const [price, setPrice] = useState(() => auditPrice(BUILD_DATE))
  useEffect(() => { setPrice(auditPrice(new Date())) }, [])
  return { price, isLaunch: price === AUDIT_PRICE_LAUNCH }
}

const endLabel = (() => {
  const [y, m, d] = AUDIT_LAUNCH_END.split('-').map(Number)
  const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  return `${d} ${months[m - 1]} ${y}`
})()

export function AuditSoloPrice() {
  const { price, isLaunch } = useAuditPrice()
  if (isLaunch) {
    return (
      <>
        <strong className="text-white">{AUDIT_PRICE_LAUNCH} €</strong> pour une commande acceptée jusqu’au {endLabel} inclus, puis {AUDIT_PRICE_STANDARD} € à compter du 1er avril 2027. Règlement intégral à la commande, avant l’entretien.
      </>
    )
  }
  return (
    <>
      <strong className="text-white">{price} €</strong>. Règlement intégral à la commande, avant l’entretien.
    </>
  )
}

export function AuditDeduction() {
  const { price } = useAuditPrice()
  return (
    <>
      Le montant payé pour votre audit solo est déduit intégralement si vous nous confiez une mise en place d’au moins 500 € avant déduction, hors suivi mensuel et abonnements aux outils. Par exemple, après un audit payé {price} €, une mise en place à 500 € revient à {500 - price} € à régler.
    </>
  )
}

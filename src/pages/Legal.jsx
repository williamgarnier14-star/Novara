import { Shell } from '../components/ui.jsx'
import { IDENTITY as I, AUDIT_PRICE_LAUNCH, AUDIT_PRICE_STANDARD } from '../content.js'

const UPDATED = '20 novembre 2026'

function LegalPage({ current, title, intro, children }) {
  return (
    <Shell current={current}>
      <article className="mx-auto max-w-[780px] px-6 pb-24 pt-28 md:pb-32 md:pt-36">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-blue-soft">Informations légales</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl">{title}</h1>
        <p className="mt-4 text-[13px] text-slate-body">Dernière mise à jour : {UPDATED}</p>
        {intro && <p className="mt-6 text-[15.5px] leading-relaxed text-slate-body">{intro}</p>}
        <div className="legal mt-10 flex flex-col gap-10">{children}</div>
      </article>
    </Shell>
  )
}

function S({ title, children }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <div className="mt-3 flex flex-col gap-3 text-[15px] leading-relaxed text-slate-body [&_a]:text-blue-soft [&_a]:underline [&_a]:underline-offset-2 [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-white">
        {children}
      </div>
    </section>
  )
}

const Mail = () => <a href={`mailto:${I.email}`}>{I.email}</a>
const Phone = () => <a href={`tel:${I.phoneIntl}`}>{I.phone}</a>

export function MentionsLegales() {
  return (
    <LegalPage current="/mentions-legales" title="Mentions légales">
      <S title="Éditeur du site">
        <p>
          <strong>{I.legalName}</strong><br />
          SIRET : {I.siret}<br />
          Adresse professionnelle : {I.street}, {I.postalCode} {I.city}<br />
          E-mail : <Mail /><br />
          Téléphone : <Phone /><br />
          Site : <a href="https://www.agencenovara.fr">www.agencenovara.fr</a>
        </p>
        <p>Directrice de la publication : {I.owner}.</p>
        <p>{I.vat}</p>
      </S>
      <S title="Hébergement">
        <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com.</p>
      </S>
      <S title="Propriété intellectuelle">
        <p>Les textes, visuels, logos et éléments graphiques de ce site appartiennent à {I.brand}, sauf mention contraire. Toute reproduction sans autorisation écrite est interdite.</p>
      </S>
      <S title="Données personnelles">
        <p>Le traitement des données collectées sur ce site est décrit dans la <a href="/confidentialite">politique de confidentialité</a>.</p>
      </S>
    </LegalPage>
  )
}

export function Confidentialite() {
  return (
    <LegalPage
      current="/confidentialite"
      title="Politique de confidentialité"
      intro={`${I.brand} attache une grande importance à la protection de vos données. Cette page explique quelles informations sont collectées, pourquoi, et comment exercer vos droits.`}
    >
      <S title="Responsable du traitement">
        <p>{I.legalName}, {I.street}, {I.postalCode} {I.city}. Contact : <Mail />.</p>
      </S>
      <S title="Données collectées">
        <ul>
          <li><strong>Formulaire « Projet web »</strong> (hébergé par Airtable) : prénom et nom, activité, e-mail, téléphone, formule envisagée, description du projet.</li>
          <li><strong>Questionnaire « Automatisations & IA »</strong> (hébergé par Airtable) : prénom et nom, activité, e-mail, téléphone, entreprise, organisation (seul ou en équipe), taille de l’équipe et services concernés, description d’une tâche, outils utilisés.</li>
          <li><strong>Avis clients</strong> : nom, note et commentaire, publiés après validation.</li>
          <li><strong>Audit</strong> : notes d’entretien et, uniquement avec votre accord préalable, enregistrement audio de l’entretien.</li>
        </ul>
        <p>Pour chaque demande, nous enregistrons aussi le type de formulaire, la page d’origine et la date d’envoi.</p>
      </S>
      <S title="Finalités et base légale">
        <ul>
          <li>Vous recontacter et préparer un premier échange (mesures précontractuelles prises à votre demande).</li>
          <li>Établir un devis, réaliser l’audit ou la prestation commandée (exécution du contrat).</li>
          <li>Enregistrer un entretien d’audit pour préparer le rapport (consentement, retirable à tout moment).</li>
          <li>Publier les avis clients validés (consentement).</li>
        </ul>
        <p>Le questionnaire sert uniquement à préparer le contact. La commande est passée par acceptation d’un devis.</p>
      </S>
      <S title="Destinataires et sous-traitants">
        <p>Vos données sont destinées à {I.owner} pour {I.brand}. Elles ne sont jamais vendues. Elles peuvent être traitées par les prestataires techniques suivants :</p>
        <ul>
          <li>Vercel (hébergement du site) ;</li>
          <li>Airtable — Formagrid Inc. (formulaires « Projet web » et « Automatisations & IA », et suivi des demandes) ;</li>
          <li>Upstash (stockage des avis clients) ;</li>
          <li>Plaud (enregistrement et transcription des entretiens d’audit, uniquement avec votre accord) ;</li>
          <li>Google Fonts (affichage des polices du site).</li>
        </ul>
        <p>Certains de ces prestataires peuvent traiter des données hors de l’Union européenne. Ces transferts sont encadrés par les garanties prévues par le RGPD, notamment les clauses contractuelles types de la Commission européenne.</p>
      </S>
      <S title="Durée de conservation">
        <ul>
          <li>Demandes sans suite : 3 ans après le dernier contact.</li>
          <li>Données clients : durée de la relation, puis durée légale de conservation des documents comptables (10 ans pour les factures).</li>
          <li>Enregistrements d’audit : supprimés après la remise du rapport, sauf demande contraire de votre part.</li>
        </ul>
      </S>
      <S title="Vos droits">
        <p>Vous pouvez accéder à vos données, les rectifier, les effacer, limiter leur traitement, vous opposer à celui-ci, demander leur portabilité et retirer votre consentement à tout moment. Écrivez à <Mail />.</p>
        <p>Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (cnil.fr).</p>
      </S>
      <S title="Cookies">
        <p>Ce site n’utilise pas de cookies publicitaires ni de mesure d’audience. Seuls des éléments techniques nécessaires au fonctionnement du site sont utilisés.</p>
      </S>
    </LegalPage>
  )
}

export function CGV() {
  return (
    <LegalPage
      current="/cgv"
      title="Conditions générales de vente"
      intro={`Les présentes conditions s’appliquent aux prestations conclues entre ${I.legalName} (ci-après « ${I.brand} ») et ses clients professionnels (ci-après « le Client »). Toute commande implique leur acceptation. Les conditions particulières du devis prévalent sur les présentes.`}
    >
      <S title="1. Prestataire">
        <p>{I.legalName}. SIRET {I.siret}. {I.street}, {I.postalCode} {I.city}. <Mail /> · <Phone />.</p>
      </S>
      <S title="2. Prestations">
        <ul>
          <li>Création de sites web (formules Essentiel, Pro et Signature, ou sur devis).</li>
          <li>Audit d’organisation : audit solo ou audit petite équipe / TPE.</li>
          <li>Automatisations et assistants IA : assistant ciblé, automatisation simple ou projet complet, sur devis.</li>
          <li>Suivi facultatif des solutions installées.</li>
        </ul>
        <p>Le questionnaire et le formulaire de contact servent à préparer un premier échange. La commande est formée par l’acceptation écrite du devis par le Client.</p>
      </S>
      <S title="3. Tarifs">
        <p>Les prix sont indiqués en euros. {I.vat} Les montants affichés sont les montants à payer.</p>
        <p>
          <strong>Audit solo</strong> : {AUDIT_PRICE_LAUNCH} € pour toute commande acceptée jusqu’au 31 mars 2027 inclus (tarif de lancement), puis {AUDIT_PRICE_STANDARD} € à compter du 1er avril 2027 (tarif standard). La date retenue est celle de l’acceptation de la commande, à l’heure de la France métropolitaine.
        </p>
        <p>
          <strong>Déduction de l’audit solo</strong> : le montant payé pour l’audit solo est déduit intégralement si le Client confie à {I.brand} une mise en place d’au moins 500 € avant déduction. Le suivi mensuel et les abonnements aux outils tiers sont exclus de ce seuil.
        </p>
        <p><strong>Audit petite équipe / TPE</strong> : forfait sur devis selon le nombre de personnes par service et le périmètre retenu. Les modalités particulières figurent au devis.</p>
        <p><strong>Suivi facultatif</strong> : 50 € par mois.</p>
      </S>
      <S title="4. Commande et paiement">
        <ul>
          <li><strong>Audit</strong> : réglé intégralement à la commande, avant l’entretien ou la réalisation.</li>
          <li><strong>Sites web et modules d’automatisation</strong> : le développement commence après acceptation du devis, sans acompte. Le montant total est exigible après validation écrite de la version finale, et avant la mise en ligne ou l’installation.</li>
          <li><strong>Suivi</strong> : payable mensuellement selon les modalités de l’offre de suivi.</li>
        </ul>
        <p>Le règlement s’effectue par virement bancaire sur le compte Revolut indiqué sur la facture.</p>
      </S>
      <S title="5. Déroulement de l’audit">
        <p><strong>Audit solo</strong> : entretien individuel d’environ 1 h 30, en tête-à-tête. Le rapport et le tableau d’opportunités sont envoyés par e-mail dans les 15 jours calendaires suivant l’entretien.</p>
        <p><strong>Audit d’équipe</strong> : périmètre, entretiens, livrables et délai définis au devis.</p>
        <p>Un débriefing individuel est inclus, en visio ou, sur rendez-vous, en présentiel dans le Pays de Saint-Malo.</p>
        <p>L’entretien peut être enregistré uniquement avec l’accord préalable du Client, consigné au dossier. À défaut, l’entretien se déroule avec prise de notes.</p>
      </S>
      <S title="6. Tests, validation et mise en service">
        <ul>
          <li><strong>Période de test</strong> : le Client dispose de 15 jours calendaires à compter de la mise à disposition de la version de test pour l’essayer sur des situations représentatives. Au moins un aller-retour de modifications dans le périmètre du devis est inclus avant la validation finale.</li>
          <li><strong>Validation</strong> : la version finale est validée par écrit (e-mail accepté).</li>
          <li><strong>Mise en service</strong> : après validation écrite et paiement intégral, la solution est installée sur les comptes du Client.</li>
          <li><strong>Période d’ajustement</strong> : à compter de la mise en service, le Client dispose de 15 jours calendaires pour signaler une anomalie ou demander un dernier ajustement dans le périmètre prévu. Cette période est incluse, avec ou sans suivi. Les anomalies signalées pendant cette période sont corrigées sans frais.</li>
          <li>Pour les automatisations qui se déclenchent peu souvent, le devis peut prévoir un protocole de test adapté.</li>
          <li>Toute demande hors périmètre fait l’objet d’un devis complémentaire.</li>
        </ul>
      </S>
      <S title="7. Livrables et droits">
        <p>Après paiement intégral, {I.brand} remet les éléments techniques prévus au devis, la notice d’utilisation, le dossier technique et la formation prévue. Le devis ou son annexe précise les livrables sur mesure et les droits transférés au Client.</p>
        <p>Les outils et composants tiers restent soumis à leurs propres licences et conditions d’utilisation.</p>
      </S>
      <S title="8. Comptes, accès et autonomie du Client">
        <p>Les comptes d’hébergement, d’automatisation et d’intelligence artificielle sont ouverts au nom du Client, qui conserve les accès administrateur et règle directement ses abonnements. Le Client peut accorder à {I.brand} un accès délégué et le révoquer à tout moment. Il conserve la possibilité de confier la reprise de la solution à un autre prestataire.</p>
      </S>
      <S title="9. Suivi facultatif">
        <p>Le suivi coûte 50 € par mois et comprend jusqu’à 30 minutes de petits ajustements ou de mises à jour des solutions installées. Les minutes non utilisées ne sont pas reportées. Les nouvelles fonctionnalités font l’objet d’un devis.</p>
        <p>Le suivi est sans engagement de durée. Le Client peut l’arrêter par simple e-mail à <Mail /> ; l’arrêt prend effet à la fin du mois en cours.</p>
      </S>
      <S title="10. Confidentialité et données">
        <p>{I.brand} s’engage à garder confidentielles les informations communiquées par le Client et à ne les utiliser que pour la prestation. Les accès délégués sont utilisés uniquement dans le cadre de la mission et révoqués à sa fin.</p>
        <p>À la fin de la prestation, les données du Client sont restituées ou supprimées selon son choix. Lorsque {I.brand} traite des données personnelles pour le compte du Client, un accord de sous-traitance conforme à l’article 28 du RGPD est conclu.</p>
      </S>
      <S title="11. Retards de paiement">
        <p>Tout retard de paiement entraîne de plein droit des pénalités au taux de trois fois le taux d’intérêt légal, ainsi qu’une indemnité forfaitaire pour frais de recouvrement de 40 € (articles L. 441-10 et D. 441-5 du Code de commerce).</p>
        <p>En cas d’impayé, {I.brand} peut suspendre la mise en production, la mise en ligne ou l’installation jusqu’au règlement complet.</p>
      </S>
      <S title="12. Responsabilité">
        <p>{I.brand} est tenue d’une obligation de moyens. Sa responsabilité ne peut être engagée en cas de dysfonctionnement d’un outil tiers, d’une modification apportée par le Client ou un tiers, ou d’une mauvaise utilisation de la solution.</p>
      </S>
      <S title="13. Réclamations et litiges">
        <p>Toute réclamation est à adresser à <Mail />. Les parties s’efforcent de trouver une solution amiable. À défaut, le litige est porté devant le tribunal compétent du ressort du siège du prestataire. Les présentes conditions sont soumises au droit français.</p>
      </S>
    </LegalPage>
  )
}

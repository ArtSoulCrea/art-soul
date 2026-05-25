# Art Soul — Instructions projet

Landing page Astro pour une artiste peintre/dessinatrice. Objectif **narratif et émotionnel** : faire découvrir son univers, raconter une histoire. **Ce n'est pas un site de conversion** — pas de tunnel, pas de pop-up, pas d'urgence commerciale.

**7 sections** dans un ordre pensé comme un arc narratif : Hero → Intro → Œuvres → Commandes → Exemples → About → Avis → Contact. On laisse les œuvres parler avant de présenter la personne.

## Workflow imposé (LIRE EN PREMIER)

Sur ce projet, l'utilisateur veut **garder le contrôle total** et apprendre GSAP au passage. Tu dois suivre ce protocole strictement :

1. **Une section à la fois.** Ordre prévu : Hero → Intro → Œuvres → Commandes → Exemples → About → Avis → Contact. Ne jamais coder deux sections en parallèle dans la même réponse.
2. **Pour chaque section, deux étapes séparées avec validation entre les deux :**
   - **Étape A** — Structure HTML/Astro + Tailwind + contenu (sans animation). Valider visuellement.
   - **Étape B** — Animations GSAP ajoutées progressivement, avec **explication écrite en français** de ce que fait chaque timeline / ScrollTrigger (l'utilisateur ne maîtrise pas GSAP, il veut apprendre au fil).
3. **Pas de dump multi-fichiers.** Si tu touches plus de 2 fichiers en une fois sans raison évidente, demande d'abord.
4. **Toute proposition d'animation non triviale doit être expliquée avant le code**, pas pendant. Une fois validée par l'utilisateur, tu peux écrire la timeline.
5. **Ne jamais refactoriser** une section déjà validée sans demander.

## Direction artistique

- **Noir dominant** `#0E0E0E` (token `ink`) avec **respirations blanc chaud** `#F5F3EE` (token `paper`) et **accent or** `#C8A646` (token `gold`)
- Ambiance **cinématique immersive** : scroll lent, fades, parallax, split text
- Sections Hero et Œuvres sur fond noir (les peintures ressortent), Commandes / About / Contact peuvent passer en respirations claires
- Pas d'éléments "marketing" : pas de badge "nouveau", pas de chrono, pas de social proof type "100+ clients"

## Stack

| Outil | Version | Rôle |
|---|---|---|
| Astro | ^6.3 | Framework, mode SSR (`output: 'server'`) |
| Tailwind | v4 (CSS-first via `@tailwindcss/vite`) | Styles, design tokens dans `@theme {}` |
| GSAP + ScrollTrigger | ^3.13 | Animations narratives, client-only |
| @astrojs/vercel | dernière | Adapter de déploiement |
| resend | ^4 | Envoi d'emails (formulaire contact) |
| Fontsource | — | Self-host des polices (zéro requête Google) |

## Design tokens

Définis dans `src/styles/global.css` via `@theme {}` :

```css
--color-ink: #0E0E0E;
--color-paper: #F5F3EE;
--color-gold: #C8A646;
  --color-violet: #5B3A6F;   /* accent secondaire — CTAs secondaires, détails */

--font-display: "Playfair Display", serif;   /* titres Hero, ouvertures section */
--font-serif: "Cormorant Garamond", serif;   /* textes longs, sections claires */
--font-sans: "Manrope", system-ui, sans-serif; /* UI : nav, boutons, légendes */
```

Tailwind génère automatiquement les utilitaires : `bg-ink`, `text-paper`, `text-gold`, `font-display`, `font-serif`, `font-sans`. Variantes d'opacité via `bg-ink/90`, `text-paper/70`, etc.

**Police Circe écartée** : pas de licence côté artiste. Manrope la remplace (sans-serif géométrique libre).

## Sections du site

**7 sections** dans cet ordre narratif.

| # | Section | Fichier | État | Notes |
|---|---|---|---|---|
| 1 | Hero + CTA | `Hero.astro` | ✅ Animations OK | Fond noir, titre Playfair, CTA discret vers Contact et Œuvres |
| 2 | Intro | `Intro.astro` | ✅ Animations OK | Texte narratif d'accroche, fond noir, fissure SVG |
| 3 | Œuvres | `Oeuvres.astro` | ✅ Animations OK | Grille 2/3 col, modal plein écran (image + récit), protection images, contenu réel intégré |
| 4 | Commandes | `Commandes.astro` | ✅ Animations OK | Fond paper, 3 étapes numérotées, sceau flouté en fond, CTA vers Contact |
| 5 | Exemples | `Exemples.astro` | ✅ Animations OK | Fond ink, carousel horizontal, hover description, modal image centré, 6 images réelles |
| 6 | About | `About.astro` | ✅ Animations OK | Fond paper, grande photo gauche sticky, bio droite — contenu placeholder |
| 7 | Avis clients | `Avis.astro` | À faire | Screenshots d'avis clients — carousel identique à Exemples, fond `bg-paper`, modal pour agrandir, protection clic droit/drag. Images à placer dans `src/assets/avis/` quand disponibles. |
| 8 | Contact | `Contact.astro` | Structure OK | Formulaire → `/api/contact` → Resend — envoi email non implémenté |

### Pattern modal (Œuvres + Exemples)

- Overlay `fixed inset-0 bg-ink/95`, `role="dialog"`, `aria-modal="true"`
- Fermeture : bouton ×, touche Escape, clic sur le fond
- Scroll body bloqué (`overflow: hidden`) pendant ouverture
- Images : `src/assets/` → URLs hashées non devinables, clic droit bloqué, drag désactivé
- Transition image : opacity 0 → src change → `onload` → opacity 1 (évite le flash de l'ancienne image)

## Variables d'environnement

Voir `.env.example`. Clés requises :
- `RESEND_API_KEY` — clé API Resend
- `CONTACT_TO_EMAIL` — email de l'artiste qui reçoit les messages
- `CONTACT_FROM_EMAIL` — email validé chez Resend (expéditeur)

## Conventions

- **Langue** : tout le contenu utilisateur est en **français**. Code, noms de variables, commits en anglais.
- **TypeScript strict** (héritage `astro/tsconfigs/strict`)
- **Composants** : un fichier `.astro` par composant dans `src/components/sections/` pour les 6 sections principales
- **GSAP** : import via `src/lib/gsap.ts` (singleton qui enregistre ScrollTrigger côté client uniquement)
- **Images** : composant `<Image>` d'Astro pour les œuvres (optimisation auto)
- **Aucune dépendance ajoutée sans demander.** Y compris les "petites" librairies utilitaires.

## Commandes

```bash
npm run dev      # localhost:4321
npm run build    # vérifie la compile
npm run preview  # preview du build
```

Pour vérifier que tout compile, lancer `npm run build` directement sans demander.

## Plan de setup initial

Le plan détaillé de la mise en place initiale est consultable à `~/.claude/plans/nous-allons-cr-er-une-zazzy-moonbeam.md`. Une fois ce setup terminé, on enchaîne section par section selon le workflow ci-dessus.

## Hors périmètre

- Pas de CMS (Sanity, Strapi, etc.) — le contenu est en dur dans les composants
- Pas de blog
- Pas de système d'authentification
- Pas de panier / e-commerce (les commandes passent par le formulaire Contact)
- Pas d'i18n (français uniquement)

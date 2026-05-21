# Art Soul — Instructions projet

Landing page Astro pour une artiste peintre/dessinatrice. Objectif **narratif et émotionnel** : faire découvrir son univers, raconter une histoire. **Ce n'est pas un site de conversion** — pas de tunnel, pas de pop-up, pas d'urgence commerciale.

**5 sections** dans un ordre pensé comme un arc narratif : Hero → Œuvres (avec leurs récits) → Commandes → About → Contact. On laisse les œuvres parler avant de présenter la personne.

## Workflow imposé (LIRE EN PREMIER)

Sur ce projet, l'utilisateur veut **garder le contrôle total** et apprendre GSAP au passage. Tu dois suivre ce protocole strictement :

1. **Une section à la fois.** Ordre prévu : Hero + CTA → Œuvres (avec récits intégrés en modal) → Commandes → About → Contact. Ne jamais coder deux sections en parallèle dans la même réponse.
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

--font-display: "Playfair Display", serif;   /* titres Hero, ouvertures section */
--font-serif: "Cormorant Garamond", serif;   /* textes longs, sections claires */
--font-sans: "Manrope", system-ui, sans-serif; /* UI : nav, boutons, légendes */
```

Tailwind génère automatiquement les utilitaires : `bg-ink`, `text-paper`, `text-gold`, `font-display`, `font-serif`, `font-sans`. Variantes d'opacité via `bg-ink/90`, `text-paper/70`, etc.

**Police Circe écartée** : pas de licence côté artiste. Manrope la remplace (sans-serif géométrique libre).

## Sections du site

**5 sections** dans cet ordre narratif : on laisse l'œuvre parler avant la bio.

| # | Section | État | Notes |
|---|---|---|---|
| 1 | Hero + CTA | ✅ Terminé | Fond noir, titre Playfair dramatique, CTA discret. **Inclure le nom de l'artiste + une demi-phrase de positionnement** (ex: "Marie Lefèvre — peintre et dessinatrice") pour que les visiteurs courts sachent qui ils ont en face |
| 2 | Œuvres (+ récits) | À faire | Fond noir, **4 à 8 œuvres** en sélection curatée. Chaque œuvre est cliquable → **modal cinématique plein écran** avec l'œuvre en grand + son histoire à côté/en dessous. Transition GSAP (fade + zoom doux). Pas de partage individuel par URL pour l'instant (peut être ajouté via `#ancre` plus tard si besoin) |
| 3 | Commandes | À faire | Présentation du process de commande, ton non-commercial |
| 4 | About | À faire | Section claire, Cormorant pour le texte long. Placée **après** les œuvres : le visiteur rencontre la personne après avoir été touché par son travail |
| 5 | Contact | À faire | Formulaire → `/api/contact` → Resend |

Mettre à jour la colonne **État** au fur et à mesure (À faire / Structure OK / Animations OK).

### Modal Œuvre — pattern technique

Le modal est un composant `.astro` avec un peu de JS client (pas besoin de framework) qui :
- Écoute les clics sur les cartes d'œuvre
- Affiche un overlay `fixed inset-0 bg-ink/95` avec l'image grand format + l'histoire
- Anime l'apparition via GSAP (fade-in overlay, zoom doux sur l'image, slide-up du texte)
- Se ferme via touche Escape, clic hors zone, ou bouton de fermeture
- Bloque le scroll de la page derrière (toggle `overflow-hidden` sur `<body>`)
- Accessible : focus trap, `aria-modal`, retour du focus au déclencheur à la fermeture

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

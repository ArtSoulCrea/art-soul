# Art Soul

Landing page narrative pour une artiste peintre et dessinatrice. Objectif : faire découvrir son univers et raconter une histoire.

## Stack

- [Astro 6](https://astro.build) — SSR via adapter Vercel
- [Tailwind v4](https://tailwindcss.com) — CSS-first, tokens dans `src/styles/global.css`
- [GSAP + ScrollTrigger](https://gsap.com) — animations narratives
- [Resend](https://resend.com) — envoi d'emails (formulaire contact)

## Commandes

```bash
npm run dev      # http://localhost:4321
npm run build    # build de production
npm run preview  # prévisualiser le build
```

## Variables d'environnement

Copier `.env.example` en `.env` et remplir :

```
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

## Structure

```
src/
├── components/sections/   # un composant .astro par section
├── layouts/Layout.astro   # layout global
├── lib/gsap.ts            # init GSAP + ScrollTrigger
├── pages/
│   ├── index.astro        # page principale
│   └── api/contact.ts     # route email Resend (à venir)
└── styles/global.css      # Tailwind + design tokens + fonts
```

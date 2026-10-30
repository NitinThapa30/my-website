# Nitin Thapa — Portfolio

Game Developer · AI Engineer · Full-Stack Developer

Live site: **https://nitinthapaportfoilo.dpdns.org/**

A dark, cyberpunk-styled developer portfolio featuring interactive 3D scenes, a custom
terminal, an embedded playable Three.js game, a radial skills explorer, project case
studies and an interactive developer workspace.

## Tech Stack

No build step — the site is plain HTML/CSS/JS with battle-tested libraries loaded from
CDNs. This keeps the repository cloneable, buildable (it's already production-ready
static output) and deployable on GitHub Pages with zero compilation.

| Library | Purpose |
|---|---|
| Three.js r128 | 3D hardware desk scene, WebGL shader hero background |
| D3.js v7 | Interactive halftone globe on the hero section |
| GSAP + ScrollTrigger | Scroll-triggered reveals, counters, cinematic hero intro |
| Lenis | Buttery smooth scrolling (desktop, motion-safe users only) |
| Typed.js | Animated hero subtitle |
| VanillaTilt | 3D tilt + glare on project/internship cards |
| Font Awesome + JetBrains Mono / Inter | Icons and typography |

## Features

- Retro boot sequence (skippable, once per session, respects reduced motion)
- Interactive **Dev Workspace** — panels describing each engineering focus
- **Project case studies** with category filters (Trek-cards-style chapters)
- Working terminal — try `help`, `whoami`, `skills`, `sudo`, `matrix`
- Radial orbital skills explorer with connected nodes
- Three.js 3D hardware setup scene with orbit controls
- Embedded playable 3D web game (`webgame.html`, also runs fullscreen)
- Infinite certification carousel, timeline, resume modal, GitHub contribution chart
- Custom cursor, flicker-grid footer, cybernetic shader hero background
- Accessibility: skip link, ARIA labels, keyboard-dismissable modals,
  `prefers-reduced-motion` support, mobile touch controls

## Performance

- All third-party scripts are `defer`red and preconnected
- Dead CDN dependency (Vanta.js) removed
- Hero shader & desk scene pause rendering when offscreen or tab hidden
- Device pixel ratio capped at 2 for WebGL surfaces
- Scroll listeners rAF-throttled and passive
- Images lazy-loaded

## Local Preview

Any static file server works:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Deployment

- **Hosting**: GitHub Pages via `.github/workflows/static.yml`
  (deploys automatically on every push to `main`)
- **Custom domain**: `CNAME` contains `nitinthapaportfoilo.dpdns.org` — do not delete it
- **DNS**: see `DNS_GUIDE.md`

## Branching

- `main` — production (deploys to the live site)
- `Portfolio-upgrade` — active upgrade branch; merged to `main` only after review

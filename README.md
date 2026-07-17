# EE Portfolio — Aditi Rao (sample content)

A dark, "engineering lab" themed personal portfolio built with React, Three.js
(via React Three Fiber), Framer Motion, and Tailwind CSS. Features an
interactive 3D circuit-board/chip hero, glassmorphism content cards,
scroll-reveal animations, and full keyboard/reduced-motion support.

## Tech stack

- **React 18 + Vite** — app shell and dev server
- **@react-three/fiber + @react-three/drei + @react-three/postprocessing** — the 3D hero (procedural geometry only, no external model files)
- **Framer Motion** — scroll reveals, modal transitions, magnetic buttons
- **Tailwind CSS** — design tokens + utility styling
- **lucide-react** — icon set (no emoji anywhere)

> GSAP is listed in the original brief as an option for scroll-storytelling.
> This build uses Framer Motion's `whileInView` for all scroll reveals since
> it covers everything needed here with one less dependency — if you want
> GSAP + ScrollTrigger instead (e.g. for pinned/scrubbed sequences), run
> `npm install gsap` and swap the animation calls in the section you want to
> convert.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  components/       # UI sections and shared widgets
    Nav.jsx
    Hero.jsx
    About.jsx
    Skills.jsx
    Projects.jsx
    Experience.jsx
    Resume.jsx
    Contact.jsx
    CircuitBackground.jsx   # fixed animated grid backdrop
    CustomCursor.jsx        # cursor-follow dot + magnetic ring
    MagneticButton.jsx      # reusable magnetic hover wrapper
  three/
    CircuitScene.jsx   # the procedural PCB/chip/electron 3D scene
    HeroCanvas.jsx      # <Canvas> setup, camera intro animation, controls, bloom
    HeroFallback.jsx    # static SVG fallback for no-WebGL devices
  hooks/
    useReducedMotion.js
    useWebGLSupport.js
  data/
    profile.json     # name, tagline, bio, social links, resume/photo paths
    skills.json       # skill categories + chip cloud
    projects.json      # project cards + modal detail content
    experience.json    # timeline entries (education/work/activity/certs)
  App.jsx
  main.jsx
  index.css
public/
  profile.jpg   ← add this yourself (see below)
  resume.pdf     ← add this yourself (see below)
```

## Swapping in your own content

Almost everything on the page is data-driven, so you shouldn't need to touch
component code for routine edits:

1. **Name, tagline, bio, socials, resume/photo paths**
   → edit `src/data/profile.json`

2. **Skills (bars + chip cloud)**
   → edit `src/data/skills.json`

3. **Projects (cards + modal detail)**
   → edit `src/data/projects.json`. Each entry supports `tags`, `highlights`,
   and optional `github`/`demo` links (leave a link as an empty string to
   hide that button).

4. **Experience / education timeline**
   → edit `src/data/experience.json`. `type` controls which icon is shown
   (`education`, `work`, `activity`, or `certification`).

5. **Profile photo**
   → drop your photo at `public/profile.jpg` (or update `profileImage` in
   `profile.json` to point elsewhere). The hexagonal frame in the About
   section crops automatically via `object-cover`.

6. **Resume**
   → drop your PDF at `public/resume.pdf` (or update `resumeUrl` in
   `profile.json`). This single file powers both the embedded viewer and the
   "Download Resume" button.

7. **Contact form backend**
   → the form in `src/components/Contact.jsx` currently just simulates a
   send (`TODO` comment marks the spot). Wire it up to Formspree, Resend, a
   Netlify Form, or your own serverless function.

Search the codebase for `TODO` comments — they mark every spot meant to be
replaced with your real content.

## Accessibility & performance notes

- Respects `prefers-reduced-motion`: the 3D scene's auto-rotation, orbiting
  "electrons," drag controls, cursor effects, and ambient particles all
  switch off; scroll-reveal animations shorten to near-instant.
- The 3D hero is **code-split and lazy-loaded** (`React.lazy` + `Suspense`)
  so the heavy three.js bundle downloads after the rest of the page is
  interactive, and falls back to a lightweight SVG illustration on browsers
  without WebGL.
- Visible focus rings (`:focus-visible`) on every interactive element.
- Text/background combinations are tuned for 4.5:1+ contrast against the
  `#0a0e17` base.
- Custom cursor is disabled automatically on touch devices.

## Deployment

### Vercel
```bash
npm install -g vercel
vercel
```
Framework preset: **Vite**. No extra config needed — `vercel.json` isn't
required for a static Vite build.

### Netlify
- Build command: `npm run build`
- Publish directory: `dist`

Or drag-and-drop the `dist/` folder after running `npm run build` into
Netlify's manual deploy UI.

### Any static host
`npm run build` outputs a fully static `dist/` folder — upload it anywhere
that serves static files (GitHub Pages, Cloudflare Pages, S3 + CloudFront,
etc.).

## Customizing the theme

Colors, fonts, and a few animation keyframes are defined as design tokens in
`tailwind.config.js` (`lab`, `circuit`, `copper`, `ink` color scales) and
`index.html` (Google Fonts link). Change the hex values there to re-theme
the whole site consistently.

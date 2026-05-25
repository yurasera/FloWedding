# Architecture (FloWedding)

FloWedding adalah website undangan pernikahan digital berbasis React + Vite, berupa single-page (tanpa router) dan content-driven dari satu file data lokal.

## Mental model

`src/contents/invitation.js` (content)
→ `src/App.jsx` (compose page + state UI kecil)
→ `src/sections/*` (blok halaman)
→ `src/components/*` (reusable UI + effects)
→ `src/styles.css` (global styling + animations)

## Folder map (sesuai project ini)

`src/`
- `main.jsx` — entry React; mount `<App />`; import `styles.css`.
- `App.jsx` — page composer; state: `opened` (undangan dibuka) + `openCalendar` (modal).
- `data/invitation.js` — single source of truth content (couple/event/story/rsvp/gallery).
- `sections/` — bagian halaman:
  - `CoverHeader.jsx` — layar pembuka + tombol “Open”
  - `TopNav.jsx` — navigasi anchor
  - `CoupleSection.jsx` — info mempelai + efek reveal/parallax
  - `EventSection.jsx` — detail acara + trigger modal kalender
  - `StorySection.jsx` — story timeline
  - `RsvpSection.jsx` — RSVP (WhatsApp)
  - `Footer.jsx` — penutup
  - `Section.jsx` — wrapper layout section (title/subtitle/background)
- `components/` — building blocks + visual effects:
  - `Reveal.jsx` — reveal-on-scroll (IntersectionObserver)
  - `Modal.jsx` — modal overlay
  - `RSVPForm.jsx`, `Countdown.jsx` — komponen fitur
  - `ParallaxLayer.jsx`, `ParallaxScene.jsx`, `MicroParallaxScene.jsx`, `CloudParallaxScene.jsx` — parallax/decoration
  - `usePrefersReducedMotion.js` — hook preferensi motion untuk accessibility
- `hooks/`
  - `useInvitationMeta.js` — derive `guestName`, `coupleName`, `start`, `dateText`
  - `useScrollLock.js` — lock/unlock scroll via `document.body.style.overflow`
- `utils/date.js` — format tanggal/jam, query param helper, dan `buildICS()` untuk generate file kalender `.ics`.
- `styles.css` — global CSS (layout + `.reveal` animation + modifiers seperti `.reveal-left`).

## Runtime composition (render tree)

`main.jsx`
→ `<App />`
→ `<CoverHeader />` + `<main>`
→ `TopNav` → `CoupleSection` → `EventSection` → `StorySection` → `RsvpSection` → `Footer`

## Data & interaction flow (yang benar-benar terjadi)

Data:
`data/invitation.js` → `App.jsx` → props ke `sections/*` → render UI.

Interaksi utama:
- Open invitation: `CoverHeader` → `App.setOpened(true)` → konten jadi aktif; `useScrollLock(!opened)` mengunci scroll sebelum dibuka (body `overflow: hidden`) lalu melepas saat `opened=true`.
- Open calendar: `EventSection` → `App.setOpenCalendar(true)` → `Modal`.
- Download calendar: tombol di `Modal` → `App.onDownloadICS()` → `utils/date.js:buildICS()` → download `.ics` di browser.

## Animations/effects (lokasi kode)

- Reveal-on-scroll:
  - Logic: `components/Reveal.jsx`
  - Styling: `styles.css` (`.reveal`, `.reveal.is-visible`, `.reveal-left`)
- Parallax:
  - Logic: `components/ParallaxLayer.jsx` (+ scene components)
  - Dipakai terutama sebagai background/decoration di beberapa section.

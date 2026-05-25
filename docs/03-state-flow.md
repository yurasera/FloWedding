# State Flow

## Overview

State is intentionally small and component-scoped. App owns the two shared UI switches (invitation open, calendar modal). Everything else is local UI state (form inputs, reveal visibility, parallax offsets) or derived data (invitation metadata). This keeps the app responsive and predictable without a global store.

## Top-Level State

- `opened` (App): invitation cover open/close. Updates layout visibility and scroll locking.
- `openCalendar` (App): calendar modal open/close.
- `useInvitationMeta(invitation)` (App): derives `guestName`, `coupleName`, `start`, `dateText` from invitation data and URL query.

Why this is sufficient: only two shared switches need cross-section coordination. Everything else is local and does not need cross-component synchronization.

## Interaction Flows

### Invitation Opening

CoverHeader
→ user clicks "Buka Undangan"
→ `onOpen()`
→ App `setOpened(true)`
→ main content gets `is-open` class
→ CoverHeader switches to open state visuals
→ scroll lock released (body + cover scroller)

### Modal Flow

EventSection
→ user clicks "Simpan ke kalender"
→ `onOpenCalendar()`
→ App `setOpenCalendar(true)`
→ Modal renders with backdrop
→ user closes via backdrop or button
→ `onClose()`
→ App `setOpenCalendar(false)`
→ Modal unmounts

### Scroll Behavior

App
→ `useScrollLock(!opened)`
→ body scroll disabled until invitation opened

CoverHeader
→ when `opened` is false, locks the phone-scroller element
→ unlocks on open

ParallaxLayer + CoupleSection
→ listens to `scroll`/`resize`
→ requestAnimationFrame updates
→ CSS transforms update on each frame

### Animation State

usePrefersReducedMotion
→ `reduced` state updates from media query
→ Reveal and ParallaxLayer skip animated updates when true

Reveal
→ IntersectionObserver sets `visible`
→ adds `is-visible` class
→ reveal animation runs once

MicroParallaxScene
→ pointermove updates `dotPointer`
→ dotgrid layer CSS variables change
→ background parallax reacts to cursor

Countdown
→ interval updates `parts` every second
→ UI updates time blocks

## State Ownership

- App
	- Owns: `opened`, `openCalendar`
	- Updates: `setOpened`, `setOpenCalendar`, `onDownloadICS`
	- Consumed by: CoverHeader, Modal, main content visibility
- CoverHeader
	- Owns: pointer-driven CSS variables (via effect), local refs
	- Updates: pointer handlers + animation frame loop
	- Consumed by: cover parallax and spotlight effect
- MicroParallaxScene
	- Owns: `dotPointer`
	- Updates: global pointermove + rAF throttle
	- Consumed by: DotGridLayer CSS variables
- ParallaxLayer
	- Owns: `offset`
	- Updates: scroll/resize rAF
	- Consumed by: transform style
- Reveal
	- Owns: `visible`
	- Updates: IntersectionObserver
	- Consumed by: reveal class
- Countdown
	- Owns: `parts`
	- Updates: 1s interval
	- Consumed by: countdown UI
- RSVPForm
	- Owns: `form`, `saved`
	- Updates: input change and save
	- Consumed by: form fields, save hint, WhatsApp URL
- usePrefersReducedMotion
	- Owns: `reduced`
	- Updates: media query change
	- Consumed by: Reveal, ParallaxLayer, CoupleSection

## Component Communication

- Props down: App passes invitation data and derived metadata to sections.
- Callbacks up: EventSection and CoverHeader call handlers from App to mutate shared state.
- Local-only: RSVPForm, Countdown, Reveal, Parallax layers manage their own UI state and do not leak it upward.

## Potential Risks

- Prop drilling grows if more cross-cutting state is added.
- Animation state is duplicated across several components, which can drift or become inconsistent.
- App.jsx can become oversized if more modals or global interactions are added.
- Interaction logic (scroll, pointer, open/close) is scattered across sections and components.

## Future Improvements

- If more shared state appears, introduce a lightweight context for UI switches only.
- Consolidate animation preferences and scroll listeners in a small shared utility to reduce duplication.
- Extract modal orchestration to a dedicated hook if more modals are added.
- Split App into a thin layout shell and a section registry to keep top-level size stable.

Global state management is currently unnecessary because shared state is minimal, event flows are linear, and local UI state does not need to coordinate across distant components.


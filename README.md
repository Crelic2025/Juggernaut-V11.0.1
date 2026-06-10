# Juggernaut Method 2.0 — v13.0.1

Single-file HTML powerlifting PWA implementing the Inverted Juggernaut Method 2.0. iPhone/iPad Safari and Add-to-Home-Screen are primary targets. Offline-capable via service worker, local IndexedDB storage with localStorage degraded fallback, optional OpenRouter AI coaching.

**Canonical deployed file:** `index.html`  
**Repository name:** `Juggernaut-V11.0.1` is intentionally historical to preserve the installed GitHub Pages / iOS Home Screen URL.

---

## Current Version

- Current canonical build: **v13.0.1**
- Promoted: 2026-06-10
- Public/Home Screen URL: `https://crelic2025.github.io/Juggernaut-V11.0.1/`
- Source artifact: `/Users/Crelic/.hermes/cache/documents/doc_3d66ac454031_files.zip`
- Local served copy: `/Users/Crelic/Desktop/apps-server/juggernaut.html`
- Final HTML SHA256: `e14c871740ba118eead5d43f188af53e66264c101a004861bd1632ddcf61636d`

## v13.0.1 — Act on the Signal

v13 adds actionable coaching infrastructure on top of the v12 longitudinal coaching build:

- Fatigue/deload signal engine with watch/caution/deload severity bands.
- Actionable deload/TM-reduction recommendations with revertable coach action log.
- Goal tracking and trend-based ETA cards.
- Block summaries across completed waves.
- Backup nudge and export metadata improvements.
- Optional File System Access auto-backup where supported.
- Hermes digest bridge for sending training/coaching digests without API keys or free-text notes.
- Service-worker cache identity bumped to `juggernaut-v13.0.1` to avoid serving the pre-patch v13.0.0 candidate.

## v13.0.1 audited fixes

The final promoted build includes audited fixes for two v13.0.0 blocker paths:

1. **Degraded IndexedDB persistence**
   - Runtime IDB write failure now flips `idbAvailable = false`, sets `storageDegraded = true`, immediately writes current state to `localStorage`, and only shows the severe storage toast if both persistence layers fail.

2. **Best-effort sync enqueue**
   - `enqueueSync()` now returns in degraded/no-DB mode and catches `idb.add()` failures, so outbox/sync enqueue cannot make an already-completed session show a false “Error completing session” toast.

## Version metadata

Bumped in all release/cache identity locations:

- `<title>` tag
- header subtitle
- `APP_VERSION = '13.0.1'`
- export filename `juggernaut-v13.0.1-export.json`

## Hard constraints

- Single-file HTML
- No build step
- No framework
- No new dependencies
- Preserve GitHub repo name `Juggernaut-V11.0.1`
- Offline-capable PWA behavior remains versioned through `APP_VERSION`

## Previous versions

- **v12.0.0** — Longitudinal AI coaching build; deployed 2026-06-08.
- **v11.0.2** — Visible-version / PWA URL stability build; deployed 2026-05-30.
- **v11.0.1** — Hotfix build with data-integrity and XSS fixes.
- **v11.0** — Inverted Juggernaut Method 2.0 ship: AMRAP-first waves, backoff sets, readiness system, fatigue management, fire-day extensions, guided warmup, weak-point-aware accessories, AI coaching overlay.
- **v10 and earlier** — Legacy hybrid builds.

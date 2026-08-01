# Juggernaut Method 2.0 — v13.0.3

Single-file HTML powerlifting PWA implementing the Inverted Juggernaut Method 2.0. iPhone/iPad Safari and Add-to-Home-Screen are primary targets. Offline-capable via service worker, local IndexedDB storage with localStorage degraded fallback, optional OpenRouter AI coaching.

**Canonical deployed file:** `index.html`  
**Repository name:** `Juggernaut-V11.0.1` is intentionally historical to preserve the installed GitHub Pages / iOS Home Screen URL.

---

## Current Version

- Current canonical build: **v13.0.3**
- Public/Home Screen URL: `https://crelic2025.github.io/Juggernaut-V11.0.1/`
- Final HTML SHA256: `f7bb46e6bce861bb7407c504d9f9f3742751a1cd5d27a2acf1663fa23ccaab1e`

## v13.0.3 — Accessories Phase Survives Render

v13.0.2 made the in-session accessory "Log" button actually log — which exposed the next
layer: every accessory write path (log / progress / deload / swap) ends in a global
`render()`, and the render pipeline was blind to the accessories phase. With
`state.activeSession` already null at that point, `renderSession()` hid `sessionSection`
(the accessories UI lives inside it) and `renderDashboard()` restored the main screen —
dumping the lifter to the dashboard the instant a single accessory was logged. The log
itself persisted; the UI teardown made it look like the session had force-completed.

Fix: `render()` now has an `_sessionPhase === 'accessories'` branch, parallel to the
existing `'complete'` branch, that runs last and re-asserts the accessories UI
(sessionSection + inlineAccSection + Finish button visible, dashboard cards hidden) and
re-renders the inline list so ✓ Logged badges appear immediately. Redundant list rebuilds
in the click handler were removed — `render()` owns the refresh.

Result: tap Log → card locks to ✓ Logged / Re-log, counter ticks, you stay in the
accessories flow. The only exits are **Finish Full Session** or starting a new session.

## v13.0.2 — In-Session Accessory Logging + Rest Readout (previous)

### 1. Fixed: in-session accessory "Log" button was a silent no-op

`saveAccessoryLog()` was hard-wired to the Accessories **tab**. It resolved the lift from
`el.accLiftSelect` and read every field from that tab's `[data-acc-*]` DOM nodes. Because all
views render simultaneously (tabs only toggle a CSS class), calling it from the inline
session card produced one of two wrong outcomes:

- **Lift mismatch (common):** `findAccessory()` returned `undefined` and the function hit a
  bare `return`. No toast, no state write, no error. The button appeared dead.
- **Lift match:** it logged reps from the Accessories tab steppers instead of the inline ones,
  and silently **zeroed `item.weight`** and reset `item.increment`, because `[data-acc-weight]`
  resolved to nothing and `n(undefined) || 0` evaluates to `0`.

Fix: `saveAccessoryLog(id, source)` and `applyAccessoryProgression(id, source)` now take a
source discriminator.

- `'inline'` → lift from `inlineAccLiftId()`, reps from `[data-ias-val]`, edit-form fields untouched.
- default (tab) → prior behavior preserved exactly.

Failure paths now toast instead of returning silently.

### 2. Added: accessories file away as "completed this session"

- New derived helpers `currentSessionAnchorISO()` and `accessoryDoneThisSession(accId)`.
  Completion is computed from existing `state.accessories.history` timestamps against the
  session anchor — **no new persisted field and no migration**, and it survives a mid-session reload.
- Logged cards get an `.acc-logged` treatment: accent border, `✓ Logged 12/10/10` badge,
  steppers showing the reps actually logged, and the button switching to **Re-log**.
- Counter above the list: `2 of 5 logged this session` → `✓ All 5 accessories logged`.
- **Finish Full Session** toast now reports the count.

### 3. Added: sets remaining on the rest timer

- New `#restSetsLeft` readout under the timer ring — 26px/900 weight, accent colored,
  turns warning-orange on the final work set.
- Warmup ramps counted separately from work sets, so "2 sets left" never includes ramps.
- Flags `AMRAP ahead` when an AMRAP set is still pending.
- Stays in sync on undo, fire-day extension, ramp auto-log, and mini-badge reopen.

## Version metadata

Bumped in all release/cache identity locations: `<title>`, header subtitle, `APP_VERSION`,
export filename. Service-worker cache identity derives from `APP_VERSION` and becomes `juggernaut-v13.0.2`.

## Hard constraints

- Single-file HTML
- No build step
- No framework
- No new dependencies
- Preserve GitHub repo name `Juggernaut-V11.0.1`
- Offline-capable PWA behavior remains versioned through `APP_VERSION`

## Previous versions

- **v13.0.1** — Act on the Signal; degraded-IDB and sync-enqueue blocker fixes; deployed 2026-06-10.
- **v12.0.0** — Longitudinal AI coaching build; deployed 2026-06-08.
- **v11.0.2** — Visible-version / PWA URL stability build; deployed 2026-05-30.
- **v11.0.1** — Hotfix build with data-integrity and XSS fixes.
- **v11.0** — Inverted Juggernaut Method 2.0 ship.
- **v10 and earlier** — Legacy hybrid builds.

# Juggernaut Method 2.0 — v13.1.1

Single-file HTML powerlifting PWA implementing the Inverted Juggernaut Method 2.0. iPhone/iPad Safari and Add-to-Home-Screen are primary targets. Offline-capable via service worker, local IndexedDB storage with localStorage degraded fallback, optional OpenRouter AI coaching.

**Canonical deployed file:** `index.html`  
**Repository name:** `Juggernaut-V11.0.1` is intentionally historical to preserve the installed GitHub Pages / iOS Home Screen URL.

---

## Current Version

- Current canonical build: **v13.1.1**
- Public/Home Screen URL: `https://crelic2025.github.io/Juggernaut-V11.0.1/`
- Final HTML SHA256: `c87492435b9059ea35fe6533ce3b3f75e42d6e1baf7363037b7f09bc2050779c`

## v13.1.1 — One Authority per Accessory Tier

- Tier 1 library supplementals now follow one formula authority: training max × variation
  ratio × current wave percentage. They re-sync after completed or skipped wave/phase
  transitions and after realization PRs.
- Tier 2/3 remain governed only by rep-ceiling progression; formula sync never overwrites
  their earned loads.
- Custom Tier 1 movements remain user-managed, including when a custom name matches a
  library movement. They retain rep-ceiling progression instead of formula ownership.
- Formula-governed items clear stale staged progression before sync. Boot-time sync repaints
  changed values without competing with the PR toast.
- The v13.0.9 history sanitizer remains intact: malformed nested set values are dropped at
  merge time so legacy/imported history cannot crash rendering.
- The browser self-test now covers malformed history sanitization, same-name and unique
  custom Tier 1 exemptions, and genuine library Tier 1 formula ownership.

## v13.0.9 — Resilient History & Stable Scrolling

- Sanitizes imported and legacy history entries at the state-ingestion boundary, dropping malformed nested set values and defaulting missing sets, wave, phase, lift, or completion date fields so they cannot break the UI.
- Adds defensive history and volume rendering for malformed legacy entries.
- Preserves the lifter's scroll position across every render path, including accessory logs, progression, deloads, swaps, and recalibration.
- Routes accessory mutations through the full scroll-preserving render path.
- Bumps the title, visible subtitle, `APP_VERSION`, export filename, and derived service-worker cache identity to v13.0.9.

## v13.0.8 — Calibrated Accessory Authority

- Routes initial accessory seeding, template-chip swaps, exercise swaps, and weak-point swaps through one calibrated-weight authority; raw library defaults no longer enter state through those paths.
- Keeps default-state boot TDZ-safe by using light seeding before live state exists, then applies training-max calibration when user state is available.
- Limits over-main warnings and calibration flags to Tier 1 supplemental variations, avoiding false warnings for unrelated Tier 2/3 movements.
- Bumps the title, visible subtitle, `APP_VERSION`, export filename, and derived service-worker cache identity to v13.0.8.

## v13.0.7 — Weak-Point Targeting Engine

Replaces the single-swap suggester behind "Where did you struggle?". The old engine had
three silent exit doors (no unowned match / no non-matching owned item / equipment
filter), scanned Tier 1 only — leaving back-driven weak points (bar path, arch)
structurally dead — and its Apply wrote the raw hardcoded library defaultWeight,
bypassing v13.0.6 calibration entirely. After one successful swap, both T1s typically
matched the weakness and the card went permanently silent: success and broken were
indistinguishable.

### New engine
- **Never silent.** Every tap answers: up to 2 swap pairs, a "you're covered" message
  naming the matching movements, or a no-mapping notice. "No issues" still hides.
- **Up to 2 swaps**, Tier 1 filled first, then Tier 2 — consistent with JuggernautAI
  behavior (multiple movements per weak point, e.g. close-grip + boards + tricep work
  for lockout) and the 2–4-accessories-per-weak-point convention around the book.
- **Calibrated arrivals.** Tier 1 swap-ins get TM × variation ratio × wave %, with the
  subordination cap and bar floor; Tier 2 (and Tier 1 with no 1RM) seed at 65% of
  library default. Raw defaultWeight is never written.
- **Block-hold.** Applying a swap commits the lift to that weak point for the current
  wave. Picking a different weak point mid-wave renders a Keep / Switch confirm.
  Fail-open when wave identity is unavailable.
- **Coaching guards.** Rows / face pulls / rear-delt work are never offered as
  swap-outs on bench or OHP days.

### Fixes surfaced by the test battery itself
- **Matcher false positives (shipped since v13.0.1, affected star badges too):** raw
  substring matching let 'lat' hit "iso**lat**ion" and "**Lat**eral Raise", and 'pin'
  hit "s**pin**e" — so pec flys and lateral raises matched back-stability weak points.
  Replaced with stem-aware token matching (exact / plural / ≥4-char stem prefix), which
  preserves quad→Quadriceps, tricep→Triceps, glute→Glutes. Exhaustive old-vs-new diff:
  10 removals, all confirmed false positives; 0 legitimate losses; 0 additions.
- **Render-phase hardening:** applying swaps triggers renders while the completion
  overlay is open, so the v13.0.4 dashboard gate and scroll snapshot now cover the
  'complete' phase as well.
- **Help tab** rewritten to describe the new behavior (caught by regression test).

### Verification (8-test battery)
1. Never-silent matrix — 19 lift × weak-point taps on real parsed library data: 18 pair
   responses, 1 covered, 0 silent. 2. Matcher diff — surgical. 3. Structural invariants
   (≤2, same-tier, no reuse, protection) — pass. 4. 28 swap-in weights all calibrated
   and subordinate; no-TM fallback correct. 5. Reese regression scenario (post-first-
   swap bench) now answers with a covered message. 6. Block-hold truth table (6 cases)
   — pass. 7. Apply mutation semantics incl. double-apply no-op — pass. 8. Full v13.0.2–
   v13.0.6 regression suite + new statics — 18/18. JS syntax clean.

Known cosmetic quirk: "Chest-Supported Row" earns an off-the-chest star via the word
"chest" in its name; harmless (it is protected from swap-out regardless).

## v13.0.6 — Audit of v13.0.5 (four findings, fixed pre-deploy)

Self-audit of the calibration feature before it shipped. Findings:

- **P1 — Calibration sheet rendered broken.** The sheet used a `sheet-inner` wrapper
  class that exists nowhere in the stylesheet; bottom-sheet styling only applies to
  `.modal-card` / `.readiness-card` / `.confirm-card`. Content would have floated
  unstyled on the backdrop. Now uses `.modal-card` with the standard sheet handle.
- **P1 — Recalibrate was destructive and non-idempotent for Tier 2/3.** The reseed
  fallback used the item's own current weight when no library match existed, so each
  Apply compounded ×0.65 on custom items; and progressed items were yanked back to 65%
  of factory default, destroying earned working weights. Fix: reseed only
  factory-untouched items (current weight === library default); custom, progressed, and
  hand-set weights are never modified. Verified idempotent.
- **P2 — Realization week inflated Tier 1 calibration.** `def.realization.pctTM` is the
  peak ramp percentage and satisfied the finite check, contradicting the intended
  accumulation fallback. Wave percentage now resolves only from sustained phases
  (accumulation/intensification); realization and deload both use accumulation's figure.
- **P2 — Subordination cap could equal main working weight.** Half-up rounding produced
  cap == main at certain weights (main 50, inc 5 → 50). Cap now floors, guaranteeing
  strictly below main; the only equality path left is the empty-bar physical minimum.

Verification: 26,496-combination sweep (1RMs 65–700 × 9 wave percentages × all Tier 1
items) — zero over main, all 483 equalities are empty-bar floor cases. Idempotence test
passes. Full regression sweep of v13.0.2–v13.0.5 invariants passes. JS syntax clean.

## v13.0.5 — Accessory Calibration (superseded pre-deploy)

`ACCESSORY_LIBRARY` shipped hardcoded `defaultWeight` constants (Pause Squat 185, Block
Pull 315, Leg Press 270) with no relation to the lifter's strength. On a 10s-accumulation
day the main lift runs 10x5 at 60% TM — roughly 54% of true 1RM — so those constants
routinely exceeded the day's main working weight, inverting the JTS hierarchy:
supplementary work "does not take precedent over your competition lifts."

Any lifter with a squat TM under ~308 received a Tier 1 supplemental heavier than their
accumulation work. Verified across the library: Tier 1 is 24 items, 100% barbell
variations, 100% carrying a preset weight.

### Calibration model
- **Tier 1** (24 items, all barbell variations): `mainTM x variationRatio x wavePct`.
  Ratios are standard coaching estimates, biased low, in `T1_VARIATION_RATIO`;
  unknown/custom names fall back to `T1_FALLBACK_RATIO` (0.75).
- **Subordination cap** (`T1_SUBORDINATION_CAP` = 0.95): overload variations legitimately
  move more than the parent lift (Block Pull 1.05, Push Press 1.15, Board Press 1.02),
  but as same-day supplemental work they are capped just below the main working weight.
  Verified: 276 combinations (3 strength levels x 4 wave percentages x all Tier 1 items)
  produce zero accessories at or above main working weight.
- **Tier 2/3** (dumbbell / cable / machine — no defensible ratio to a 1RM): reseeded at
  65% of the library default and left to the existing rep-ceiling progression engine,
  which climbs them from a safe start.

### UI
- **Recalibrate from Training Maxes** button on the Accessories tab opens a preview sheet
  grouped by lift, showing every from → to change with its basis, flagging entries
  currently over main working weight. Nothing is written until Apply.
- Applying clears any `pendingProgression` staged against the old load. Logged history in
  `state.accessories.history` is never touched.
- Persistent warning banner on the Accessories tab whenever any accessory outranks the
  current microcycle's main working weight.
- Lifts with no `true1RM` on file are skipped, not zeroed.

## v13.0.4 — Log Stays Put (scroll-jump fix) (previous)

v13.0.3 kept the accessories UI alive across renders, but its phase branch runs *last* —
everything before it still thrashed layout mid-pass. With `state.activeSession` null,
four scroll vectors fired inside a single `render()` while the lifter was scrolled deep
in the accessories list: (1) `renderDashboard()` flashed the dashboard visible above
them, (2) its week-chip auto-scroll (`scrollIntoView`, `behavior:'smooth'`) queued an
animation that kept dragging the page toward the top even after render returned,
(3) lift-intel / weekly-plan cards flashed visible adding height churn, and
(4) `renderSession()` hid `sessionSection` entirely, collapsing the page and letting the
browser clamp scrollTop. Net effect: tapping Log shot the viewport to the top.

Fixes, at the source plus a guarantee:
- `renderSession()` no longer hides `sessionSection` during the accessories phase.
- `renderDashboard()` keeps the dashboard `display:none` during the accessories phase,
  which also removes the chip's layout box so its auto-scroll is naturally inert.
- The chip auto-scroll gained an `offsetParent !== null` guard — never smooth-scroll an
  element inside a hidden card (covers the completion phase too).
- `render()` snapshots `window.scrollY` on entry during the accessories phase and
  restores it as its final statement — same synchronous task, so the restore lands
  before the next paint and no movement is ever visible.

## v13.0.3 — Accessories Phase Survives Render (previous)

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

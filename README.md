# Juggernaut Method 2.0 — v11.0.1 Hotfix

Single-file HTML powerlifting PWA implementing the Inverted Juggernaut Method 2.0. iPhone Safari primary target. Offline-capable, local IndexedDB storage, optional Anthropic API coaching.

**Canonical file:** `juggernaut_v11.0.1.html`

---

## v11.0.1 — Hotfix (current)

Eighteen verified fixes applied per the pre-audited v11.0.1 fix plan. No feature additions, no refactors beyond what the fixes required.

### Tier 1 — Data integrity (critical)

- **C1 — `completeSession` now reads the AMRAP set, not the last set.** When backoff sets are enabled, the last set is a 2×5 or 2×3 backoff, not the AMRAP. The realization calculation was silently reading backoff weight/reps into the TM progression, corrupting the training max. Now uses `session.sets.find(s => s.isAMRAP)` with last-set fallback for phases without an AMRAP.
- **C2 — 5% differential rule now reads per-lift `tmAdjustment`.** Previously read a nonexistent `state.settings.tmAdjustment` and fell back to hardcoded 0.9. For any user who customized per-lift tmAdjustment in Settings, TM progression was silently wrong. Function signature now takes `liftId`, computes `tmAdj = 0.9 × (lift.tmAdjustment || 1)` from `state.lifts[liftId]`. Inline comment in `calculateNew1RMFromRealization` also corrected (Q10).

### Tier 2 — High-priority (user-visible impact)

- **M1 — Guided warmup plate display now renders.** `calculatePlates()` returns `{total, perSide, note}` — the old code read a nonexistent `description` field, so every warmup set showed a blank plate breakdown. Now renders `perSide.join(' + ') + ' /side'` with `note` and `'Bar only'` fallbacks.
- **M11 — XSS gap in accessory history closed.** `item.name` and `item.outcome` are now escaped via `escapeHtml()` before innerHTML injection. Restores the README's XSS-safe rendering claim.
- **M10 — AI "Why?" response text now escaped.** Same innerHTML injection pattern, now wrapped in `escapeHtml()`.
- **M13 — Legacy inline warmup feedback system removed (~110 lines).** v11 had two parallel warmup feedback UIs on realization days: the emoji modal (💩 👍 🔥) and an older inline row-level system (▼ Heavier / → Normal / ▲ Light). Users rated each warmup ramp twice. The v10-legacy inline system is now fully deleted: `_warmupFeedback` module state, `showWarmupFeedback()` button injection, `updateWarmupCoachNote()` function, coaching-prompt warmupNote block, and set-list ramp re-show block all removed. The v11 emoji modal remains as the single warmup feedback path. (`warmupCoachNote` DOM element intentionally kept as inert placeholder — its `.hidden` property is still set in two places, harmless and reduces edit risk.)
- **M20 — Weekly readiness average no longer inflates low scores 6×.** Legacy v9 migration code (`_s <= 5 ? _s * 6 : _s`) was masquerading as live logic, so a legitimate readiness score of 3 displayed as 18 and masked fatigue. Replaced with `readinessScoreNormalized()` helper which handles format detection correctly.
- **M18 — Accessory progression rounds to per-accessory increment.** Code was rounding suggested weight to `state.settings.rounding` (global) instead of the per-item `increment` field. For microplate-progression accessories (1.25 lb), the suggested weight either went backward or jumped too far. Now `roundToIncrement(item.weight + item.increment, item.increment || state.settings.rounding)`.
- **M7 — Double-tap on Start Workout guard.** `startOrResume()` had no re-entry protection. Sweaty fingers or UI lag could fire the handler twice and stack readiness modals. Wrapped in `_startingSession` flag with try/finally.
- **M8 — Backoff sets now have a visual BACKOFF pill.** Previously the two backoff sets after the AMRAP had no visual tag. Purple pill added in set list rendering.

### Tier 3 — Medium-severity (UX quality, future-proofing)

- **M2 — Readiness copy no longer contradicts fire-day prompt.** The message ladder at scores 20-24 said "Good readiness — full volume prescribed" then the fire-day modal fired at score ≥23 asking to push for an extra set. Copy now differentiates: 20-22 "full volume prescribed", 23-27 "Strong readiness — fire day available", 28+ "🔥 Exceptional — fire day offered."
- **M9 — `mergeState` now deep-merges `settings.profile`.** `ai`, `amrap`, `restMatrix`, `ui`, `equipment` were all deep-merged; `profile` was wholesale-replaced. Future profile fields now get default values on state load.
- **M21 — "undefined" no longer renders on Why? button without API key.** `fetchWeakPointWhy()` was a bare return; handler inserted `'... ' + undefined`. Function now returns empty string, handler guards `if (!text) return`.
- **M22 — Session timer capped at 12h.** Abandoned sessions resumed after a week showed "10080:00." Now caps display at 43,200 seconds.
- **M3 — `applyWarmupAdjustmentToSession` now uses per-lift rounding.** Consistent with `workingWeightFromPctTM` and `calculatePlates`. Latent bug (default state is safe since global = per-lift = 2.5) that becomes real the moment anyone customizes per-lift rounding.
- **M19 — `swapExercise` preserves user's custom weight on within-tier swaps.** Previously, swapping from cable row at 100 lb to another cable exercise with `defaultWeight: 30` silently replaced 100 with 30. Now only applies default if user weight is 0.
- **M17 — Calc RPE chart clamps reps to 1-12.** Negative or zero reps bypassed the fallback and produced undefined lookups, rendering weights as 0.

### Tier 4 — Code quality cleanup

- **Q12 — Deleted 65-line dead `fetchCoachingInsight` function.** Never called. `fetchCoachingForOverlay` is the live coaching path. Two parallel functions were confusing future maintenance.

### Version metadata

Bumped in all four locations: `<title>` tag, header subtitle, `APP_VERSION` constant (now `'11.0.1'`), and export filename (`juggernaut-v11.0.1-export.json`).

### Net change

- **8,024 lines → 7,913 lines** (−111 lines from Q12 + M13 removals)
- JS parse-check clean
- JSDOM boot test reports zero runtime errors
- Version strings verified in rendered DOM

### Explicitly deferred to later versions

Verified-real but low-urgency items from the audit: M4 (history pruning at 250 sessions, ~1.25 years out), M5 (closest-buildable minor UX), M6 (Sonnet 4 hardcoded — batch model update later), M14 (dead wakeLock/haptics flags — cosmetic), M15 (default accessories ignore equipment — affects new users only), M16 (deloadSetsMin/Max dead fields), Q1–Q9 (magic numbers, naming, indentation, optional chaining style, resolver reentrancy, silent PWA catch, history.length proxy, completeSession rollback edge case).

### Rejected from audit

- **M12** — The claim that guided warmup only runs on realization days was a false positive. Lines 4326-4338 of `buildWarmupRamp()` provide a 3-step 40/60/80% ramp for non-realization phases, verified working on accumulation days. No change made.

---

## Hard constraints (unchanged from v11.0)

- Single-file HTML, no build step, no framework, no new dependencies
- iPhone Safari primary target, offline-capable via service worker
- IndexedDB local storage, optional Anthropic API for coaching insights
- Apostrophe-escaping rule preserved (`\'` only, no smart quotes in code)

---

## Previous versions

- **v11.0** — Inverted Juggernaut Method 2.0 ship: AMRAP-first waves, backoff sets, readiness system (0-30 scale), fatigue management, fire-day extensions, guided warmup modal with emoji feedback, weak-point-aware accessory swaps, AI coaching overlay (Anthropic Sonnet 4).
- **v10** — Legacy hybrid with inline warmup feedback UI (removed in v11.0.1 per M13).
- **v9 and earlier** — See prior handoffs.

## Current Version

- Current canonical build: v11.0.2
- Promoted: 2026-05-30
- Source artifact: `/Users/Crelic/Downloads/juggernaut_v11.0.2.html`
- Local served copy: `/Users/Crelic/Desktop/apps-server/juggernaut.html`

Note: repository name is historical (`Juggernaut-V11.0.1`), but `index.html` now contains v11.0.2.

## Latest Visible-Version Build

- Current canonical build: v11.0.2
- Promoted: 2026-05-30 from Telegram TXT upload
- SHA256: `3ae33a83953f035a931d3e29cee33e832e9803011889bcb076a7c65e6143981a`
- This is the v11.0.2 build where the latest version is visible throughout the app UI.

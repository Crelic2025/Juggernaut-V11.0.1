# Juggernaut 2.2 — internal build 17.2.0

Release: November 16, 2026. Exact owner-supplied candidate; no app-code repairs during publication. The repository name and installed Home Screen URL remain unchanged.

## Release files
- `index.html`: 1,228,188 bytes, SHA256 `05df8d24563bc060a4f4e7960a6e1de4b05d1e7d7dde093d2845c72dad0294b4`.
- `sw.js`: SHA256 `6523411a5fc5aedc09a17b3ddd813ca5907ee040304dab479638e93f8705169f`. Required beside index.html for offline reopening.

## What's new
Juggernaut 2.2 adds a single-row four-lift picker with this week's weights and completion status, clearer cycle progress and next-test details, stronger wave labels, and a tappable Home map that opens the selected Program week.

This public release upgrades directly from v16.0.1. It also includes the intervening 2.0/2.1 redesign and fixes; it is NOT merely the narrow Home-display change from 17.1 to 17.2. These include automatic resumption of an active workout, revised readiness/RPE presentation, tap protection and test-set confirmation, numerical formatting/calculator fixes, and a same-origin offline worker. The underlying book-rule constants and bridge wire contract remain unchanged.

## Independently reproduced verification
Fable 5.2 performed source review and test development. Hermes independently reran the final suite against the frozen candidate:
- **111 checks: 110 passed, 1 failed, 9 classified.** The failure is retained below. This is not an all-tests-pass release.
- All 24 supplied files authenticated; HTML and worker rebuilt byte-for-byte; JavaScript syntax checks passed.
- Supplied Home suite: **42/42 passed**, with an existing environment override for a path containing spaces and a one-line disposable harness adjustment to use installed Chrome. The original unmodified harness failures are retained; no app or assertion changed.
- Built-in self-test: **90/90** on both v16.0.1 and 17.2.0.
- Actual v16.0.1-to-17.2 upgrade at one isolated origin: history, progress, TMs, an active workout, fake bridge credentials/settings, pairing and device identity survived reloads. The old workout could be resumed/completed; a new workout saved and advanced the week.
- Identical synthetic inputs produced equivalent session/weekly/backfill packets except appVersion; actual captured packets validated against the bridge's existing contract 1.1/schemaVersion 2.
- Dedicated-path worker registration, online reload, offline reopening with retained state, an offline logged set, scope exclusion and later-release delivery passed in Chromium.
- Preservation checks rejected deliberately broken copies and passed their unchanged controls.

## Retained comparison failure and coverage limits
**L.2 is a failed equality assertion, not a hidden pass:** 13 of 77,048 numeric comparisons differ from v16.0.1 in two of twelve sections. Five are more precise weight/percentage formatting. Eight are calculator displays for single repetitions: for example 135 × 1 now displays 135 rather than 140. These are intentional changes in the supplied 17.x source, not changes made during publication. The other ten tested sections, including book TM updates, prescriptions, readiness, plates and deload calculations, matched in that grid. This finite comparison does not prove equivalence for every possible input.

The legacy UI driver cannot navigate the redesigned Program screen: its 14 saved-state stages and 165 numeric captures are not certified. The new upgrade driver covers the described save/resume paths instead. A full 16-week cycle on 17.2, the absent 2.1 315-check suite, and the older fault-injection suite were not run in this release. Physical iPhone, Safari/WebKit, installed Home Screen behavior, multi-tab use and real workout delivery to the live bridge remain unverified by these synthetic Chromium checks. Earlier tiny-max/rounded-max and storage limitations have not been declared repaired.

The worker uses network first with a 2.5-second cached fallback; a slow launch can show the previously saved build while refreshing it. Do not install this worker at a shared app-server root: its navigation scope would include unrelated applications. Loose local HTML copies remain online-only; the dedicated published app includes the worker.

## Data and rollback
No live bridge configuration, credential, service or workout database was changed. Keep one app window/tab and export a personal data backup when possible; the code backup does not back up phone data. Do not clear browser storage or reinstall to obtain the update.

Previous public release: `12bee9b3eac2ae5947b5937b1f77485de8327302` (v16.0.1). Local preimages/modes and original absence of newly added files were backed up and restoration rehearsed in disposable files. Rolling back code after a worker has installed may still require an online refresh; real-device rollback is not certified.

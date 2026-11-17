# Juggernaut 2.4 — internal build 17.4.0, r3

Released November 16, 2026 (America/Chicago). Exact supplied HTML and worker; no post-audit application repairs. Upgrade baseline: published Juggernaut 2.2 / 17.2.0. The intermediate 2.3 release was not published here.

## Changes

- Includes the redesigned Accessories screen introduced in the intermediate 2.3 build: lift tabs, grouped Strength / Muscle / Core and joints work, gym-aware recommendations and accessory controls.
- Remembers valid weak-point answers containing spaces or slashes. If a stored answer was previously forgotten, the session history provides a read-only fallback.
- Keeps accessory targeting consistent across the session list, Accessories screen and mocked coach-request tests. Keep retains the current hold; Switch changes its target immediately; No issues does not cancel an existing hold.
- New holds include their cycle, so they stop applying after the relevant wave/cycle. Older holds are inferred from session history without rewriting them.
- Wipe history refreshes the local backup immediately. Reset Everything attempts to remove recovery copies and display records; failure-path limitations below remain.
- Clarifies equipment-restricted swap explanations, strength-load progression notes and navigation wording.

## Verification and preservation

- Independent source reviewer and runtime verifier: **ship with limitations**.
- Verifier full run: **219 passed, 0 failed, 13 classified**. Three passing characterization tests deliberately reproduce the reset defects below; they are not fixes.
- Operator full rerun: **213 passed, 6 failed, 13 classified**. All six failures occurred in the supplied-script group after the test proxy became unavailable. This original failed run is retained, not relabeled as passing.
- Test-only proxy repair reproduced socket-reset crashes, retained network denial, and added diagnostics and two checks. Verifier and operator then each reran the affected group: **13 passed, 0 failed**. The operator's rerun had one proxy start, no unexpected exits or restarts, and successful completion of all seven adapted scripts. All other operator test groups had passed before this harness-only repair.
- Supplied scripts after documented host accommodations: rules 80/80; new screens 101/101; compatibility screens 110/110; 34-function and 4-function fault suites completed; built-in self-tests 90/90 in both compared builds. The inherited injected-render finding was reproduced, not repaired.
- Numerical comparison: 77,048 cases, no differences in 12 sections. The old comparison tool's UI flow could not navigate the newer screens and is not claimed as passed.
- Isolated Chromium upgrade checks preserved history, in-progress work, program position, settings, device identity and bridge packet contract. Online-to-offline reload/reopen checks passed. Tests used synthetic storage and mock bridge/AI endpoints, not real workout data or paid AI calls.
- Real published-to-candidate delta: 28 changed and 45 added top-level functions, none removed; not merely the packet's smaller intermediate-version delta.

## Known limitations

- After an injected IndexedDB write failure, Reset Everything can report success while old recovery copies remain, including after reopening. Do not treat its success message as proof of secure erasure when storage has failed.
- A partially failed recovery deletion warns the user but can leave a stale recovery-index entry.
- If another window saves and the resetting window misses its announcement, recovery copies can be deleted before a save conflict discards the reset. The live history/settings remain and the UI can still say Reset complete. The missed announcement was injected; the normal two-window control passed. Use one app window.
- Legacy holds without a cycle can be ambiguous for records originating in the unpublished 2.3 screen.
- An injected accessory-render helper failure can prevent launch while saved data stays intact; this is inherited.
- Actual iPhone/Safari/Home Screen behavior, live workout synchronization and real AI answers were not tested. A complete training-cycle upgrade flow, kg and every accessory-selection rule are not comprehensively certified by these results.

## Deployment and use

The repository name, Pages address and storage origin are unchanged. Keep the existing installation; do not clear storage or reinstall for this release. Export a personal backup when possible. Publish `index.html` and `sw.js` together in this dedicated repository folder. Never place this worker at an unrelated shared server root. Loose standalone HTML copies remain online-only.

- HTML SHA-256: `d39596b2a324ccf86c553339f8bfaf6e68b77c8575aea572c663f2e99557a7c9`
- Worker SHA-256: `6523411a5fc5aedc09a17b3ddd813ca5907ee040304dab479638e93f8705169f` (unchanged from 2.2)
- Rollback source: previous public commit `0c9c19da66778e508beaa805893c643ec8f96450`. File rollback does not undo data subsequently written by the app; preserve/export user data before rollback.

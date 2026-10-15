# Juggernaut v13.2.2 — Accurate Records

## Changes
- Train Full Volume Anyway restores only dropped sets, preserving logged weights/reps, readiness and warmup adjustment, including reload and undo behavior.
- Accessory swaps preserve each exercise’s logs, clear stale Apply ↑ suggestions, and keep unsaved logged-card rep edits through other card re-renders until Re-log. Draft edits are intentionally lost on reload or leaving the session.
- RPE-based formula selection survives reload/import.
- AMRAP results above target + 8 require confirmation; target + 8 does not. Confirmed reps retain existing progression math.
- Repeated TM cuts require new qualifying evidence for the same lift. A durable per-lift gate survives action-log eviction, reload and export/import.
- Release title/header, export filename and cache identity advance to v13.2.2.

## Data and rollback
New optional fields include lifts.<lift>.tmCutGate, set.confirmedReps and tm_reduce.evidence. Old saves normalize through the existing import/boot path. Legacy cut gates can only be recovered from retained action-log entries, not already-pruned actions.

Export your own data via History → Export before updating. Code rollback to commit 3c32a7628228f8af8d2801e72fd68492b2818ab7 restores v13.2.1, but does not roll back browser-stored workout data. Preserve your exported backup. The app also retains its existing pre-upgrade recovery-copy behavior.

## Known limitations retained
- Use only one app window/tab at a time; concurrent-window and degraded-fallback storage issues remain.
- Offline launch is not fixed. Actual iPhone/Safari testing remains pending.
- Existing kg/bar/plate math, history pruning, high-rep formulas and out-of-order Revert behavior are unchanged.
- Restart Cycle still deletes history without an automatic copy: export first.
- Crafted imported workout history is not replay-proof.

## Device check
Close/reopen the app and confirm “v13.2.2 — Accurate Records.” Check existing history, maxes and settings. Do not clear website data to refresh the app. If it still shows the old version, reload in Safari, preserving the same site URL and browser storage.

## Artifact identity
HTML SHA256: bea609454fd3c1a08b62e7206c8cef084b154026c54f3e14beb4cafbb3f18189.
The release HTML is byte-identical to the user-supplied final ZIP. Tests, input snapshots and synthetic data stay outside the public Pages repository.

## Independent prepublication checks
- Final regression: 62/62 PASS; all 231 precondition/control/healthy assertions pass.
- Built-in selftest: 55/55.
- Training-math oracle unchanged after version normalization.
- Earlier candidate: 11 targeted semantic failures reproduced, with 2 controls passing.
- Original v13.2.1: five selected semantic failures reproduced; one boundary control passes.
- Browser tests ran in isolated desktop Chrome with synthetic data; actual iPhone/Safari validation is not claimed.

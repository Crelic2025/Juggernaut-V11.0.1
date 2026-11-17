# Juggernaut 2.4.1 — build 17.4.1

Published November 17, 2026 with owner approval to ship the existing candidate as-is. No additional repairs or independent test runs were performed for publication.

## Changes reported by Claude Code

- Honest reset outcomes when storage is unavailable or saving fails.
- Transactional recovery-copy/index/reset handling.
- Rejected resets leave existing data intact; retry requires confirmation.
- Stale ordinary saves cannot overwrite a newer live save.
- Wipe history reports when the wipe did not apply.
- Screen-level error isolation with accessible Settings/export.
- Import/Undo rejection safety retained; cosmetic display failures do not trigger recovery from an older backup.

## Builder's results (not independent publisher verification)

Final candidate: 310 regression checks passed; 15/15 mutation controls caught; 134 static checks passed; the same 90 built-in self-tests passed on baseline and candidate. Builder states bridge functions are unchanged.

On the preceding candidate, six older packet checks failed; Claude classified them as version-label, source-order and intentionally changed reset-behavior expectations. Supplemental and multi-window characterization checks ran on that preceding candidate, not again on the final candidate. Earlier failed runs and revised test expectations are retained privately in the return packet, not uploaded to this public repository.

## Known limitations accepted for this release

- Another open window can create a recovery copy containing pre-reset data after a reset. Use one window and close others before resetting.
- Inherited paired-window device counters can go backward; stale-window activity can remove reset bookkeeping and requeue an old pairing packet. The live reset survives in the tested candidate scenario, but these bridge-bookkeeping issues remain.
- Error-card wording points to Settings for export; the Export button is actually on History.
- Some failed-deletion paths save the reset while retaining recovery copies and show a qualified message. Other storage-failure paths refuse the reset.
- When main storage was unavailable from launch, reset uses backup storage and old recovery copies may remain or reappear on recovery.
- Persistent write failures may keep refusing resets after reopening.
- Some ordinary-save success toasts after a conflict and direct tap-handler draws remain unchanged.
- The two owner-deferred legacy-hold issues remain unchanged.
- Real iPhone/Safari, installed Home Screen app behavior, real bridge synchronization, offline service-worker navigation and a full UI training cycle were not verified for this candidate.

## Release identity and rollback

HTML SHA-256: `a404f137d16636fddc9477feccdef1e264ac585853a79bc5c76588d014a1795b`.
Worker SHA-256: `6523411a5fc5aedc09a17b3ddd813ca5907ee040304dab479638e93f8705169f` (unchanged).
Previous public release commit: `98d13671c285b86dabc680c1fa1b8af2fa796297`.

Repository name, Pages address and storage origin are unchanged. Do not clear browser storage or reinstall to update. Export a backup from History when possible. Reverting deployed files does not undo storage changes made while using any version.

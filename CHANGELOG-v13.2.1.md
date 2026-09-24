# Juggernaut v13.2.1 — Data Safety

- **File:** Juggernaut-v13.2.1.html · 657,437 bytes
- **SHA-256:** 16cd08d548f1da4c7086d7e33cedd931c68ee3887ed2b957fa9c8738b56dbd5b
- **Built from:** v13.2.0 (601,281 bytes, SHA-256 15e5c226…8aa8367eb90) + 8 patch files, 124 edits

**Before installing:** in 13.2.0, History → Export, and keep the file.

## At a glance
- Workout math is unchanged. All 80 program weeks (3 modes × lb/kg), accessory prescriptions, plate math, the e1RM table and all 544 realization max values match 13.2.0 exactly. Built-in self-test: 55/55.
- AI features and mid-workout accessory edits work as before.
- Auditor tests: main 18 → 35 pass, extended 8 → 17, screens 5 → 8.
- Every bug the original independent suite reproduces on 13.2.0 (15) no longer reproduces. Additional two-window probes still fail — see Known limitations.

## What changed

### Imports and bad saves can't destroy data (Chunk 1)
- Every way data enters the app (launch, backup copy, older-version migration, import, undo) is checked field by field. Valid data passes through unchanged; a damaged entry is skipped and a copy kept (never shown).
- **Import**
  - "That file isn't valid JSON" or "That file isn't a Juggernaut backup": nothing changes.
  - The preview says how many damaged entries will be skipped.
  - If the backup can't be displayed, the import is cancelled and nothing changes.
  - The same file can be picked again after an error.
- **History → Undo import** restores what you had before the last import, and keeps a copy of what it replaced.
- **History → Export recovery copies** downloads every recovery copy on the device, never with your AI key. Import accepts that file (it uses the newest copy).
- The first 13.2.1 launch keeps an exact copy of your 13.2.0 data.
- **Launch**
  - If saved data can't be displayed, the app opens the backup copy (or the pre-import copy) and tells you.
  - If nothing opens, a safe-mode screen offers Export raw data / Import a backup / Start fresh. "Boot failed" is gone.
- Deleting every accessory for a lift now sticks; they used to come back on the next launch.
- A lift with no accessory list gets defaults built from the data being loaded, not whatever was on screen.
- A missing plate list no longer crashes the plate math.

### Saved data can't inject page content (Chunk 2)
- Every place that shows saved data now escapes text or checks numbers on its own. A sweep that writes hostile values straight into the data found 36 such spots; now 0.

### Saves (Chunk 3)
- A save counts only once the database has actually written it. A failed save, or one stuck for 15 seconds, switches to the backup copy right away.
- Every save carries a revision number. Launch reads both copies and uses the newer one.
  - For two copies from 13.2.0 (no revision), the one with the latest workout wins; no difference keeps the main copy.
- A second window that has fallen behind loads the latest data on its next save and keeps its own copy. Open windows tell each other when they save. This does not cover simultaneous saves or all broadcast-adoption paths — see Known limitations.
- A failed backup-copy write now shows a warning (it was silent).
- Without IndexedDB, sync items wait in memory (shown as pending) instead of being dropped.

### Workout context (Chunk 4)
- Post-workout accessories stay on that workout's week, even when finishing it moves the program on.
- Next week's Tier 1 weights arrive when you tap Finish or Return to Dashboard.
- An unfinished accessory screen comes back after a reload; one older than 12 hours closes itself.
- **Swap and "?"**
  - Both act on the lift that owns the exercise, from any tab.
  - The Accessories-tab "?" no longer says "Exercise not found" for a lift other than your last workout's.
  - A swap that can't happen now says so.

### Units (Chunk 5)
- Switching lb ⇄ kg asks: **Convert / Keep numbers / Cancel.**
  - Convert: 1RMs, bar (45 lb → 20 kg), plates (standard sets swap), collars, rounding, goals, accessory weights and increments, bodyweight, the PR ledger and an open workout.
  - Keep numbers: label only, for numbers typed in the other unit.
- Logged workouts are never rewritten. New ones are tagged with their unit, and History shows each in the unit it was logged in.
- Saving Settings no longer re-rounds a 1RM you didn't change.

### Coaching (Chunk 6)
- **Realization week**
  - Hitting the target exactly is not a miss: "Target hit — 1RM stays at …".
  - Beating the target while the 5% buffer rule holds the max is not a PR: "Beat the target by N reps — 1RM stays at …".
  - The under-target streak counts only real misses.
- Tier 1 updates right away after a 1RM or TM change in Settings, Reduce TM, Revert, or a deload jump.
  - A Tier 1 weight you set by hand is kept for the rest of that week.
- The upgrade does not re-sync Tier 1, so hand-set weights survive it.

### Other fixes (Chunk 7)
- **End of cycle:** "Cycle Complete" with Start disabled. It used to offer week 16 again and answer "Already handled this microcycle."
- **Accessory logging:** Re-log corrects the entry instead of adding another, and a double tap logs once.
- **Program mode:** a change keeps you on the same week; while a workout is open it waits.
- **Timer:** a paused timer shows the right time after a reload, and the finish summary leaves out paused time.
- **Sync:** runs one at a time, and each request carries an idempotency key.
- **Deleting an accessory:** gives a 6-second Undo.
- **Deload prompt:** shows names containing "&" correctly.

## First launch after installing
- **Automatic:** an exact copy of your 13.2.0 data is kept (History → Export recovery copies).
- **Data check:** data is checked on load. Valid data is unchanged; anything damaged is skipped and a copy kept.
- **New fields (all additive):** `quarantine`, `accessoryPhase`, `rev`, `savedAt`; `units` on new workouts and accessory logs; `manualWeek` on accessories you set by hand.
- **Storage:** one new device key, `juggernaut_v4_backup_rev`. Same database and storage keys otherwise.
- **Compatibility, both checked:** 13.2.1 backups import into 13.2.0 (extra fields ignored), and 13.2.0 backups import into 13.2.1.

## Known limitations
- **Use one Juggernaut window at a time:** the home-screen app or one browser tab. Do not rely on platform storage isolation as protection; actual iPhone behavior was not tested in this audit.
- **Simultaneous saves in two same-storage windows** can drop one window's latest work. Subsequent cross-window updates can leave it without a recovery copy or warning.
- **A window that has lost its database connection** can, after repeated fallback saves, make the next launch open older history. Newer history survives in a recovery copy accessible through History → Export recovery copies, but the launch message misleadingly says it restored newer data. A single degraded save can instead lose the degraded window's edit.
- **Pending rep taps** can revert on screen when another window saves during the 300 ms save delay.
- Both v13.2.0 and v13.2.1 fail the revised two-window probes. Their failure consequences differ; v13.2.1 is not strictly better in every scenario.
- Revised probes: P01 FAIL, P02 FAIL, P03 INFO, P04 PASS on both versions, exit code 1. Sequential persistence passed 100 Map cycles and 30 fake-IndexedDB transaction-backed cycles per version. These are simulated-environment tests, not iPhone tests.
- Released with these limitations accepted for personal one-window use. Storage corrections are deferred to a later release; they are not fixed in this HTML.

## Not in this release (planned for 13.2.2)
- **Estimation formulas:** Brzycki at very high rep counts; RPE-based goal reps using the selected formula (B05, B06).
- **History:** recovering archived history (B09).
- **Plates:** non-greedy combinations for unusual plate sets (B15).
- **Keyboard:** Enter on the rep steppers (D06).
- **Units:** converting history logged before a unit switch. Charts that span a switch mix units.
- **Offline:** a real service worker (F21) is your call — it would end the single-file setup.
- **By design:** the startup cap on accessory-only history (B08).

## Tests

| Suite | 13.2.0 | 13.2.1 |
|---|---|---|
| Auditor main | 18 pass / 22 fail | 35 / 5 |
| Auditor extended | 8 / 10 (+2 design limits) | 17 / 1 (+2) |
| Auditor screens | 5 / 4 | 8 / 1 |
| Independent bugs reproducing | 15 | 0 |
| New feature tests (C22–C39) | 0 of 17 | 17 of 17 |
| Must-keep-working (AI, accessory edits) | pass | pass |

- **E09 (the one extended failure):** its second window writes to the first window's store but reads its own, so the overwrite check can't see the newer data.
  - With reads shared too, as between same-storage browser tabs, 13.2.1 keeps the workout and 13.2.0 loses it (`independent/e09-shared-reads.cjs`). This covers a stale window, not simultaneous saves. Test sources are retained in the audit packet, not deployed to Pages.

## Beyond the approved plan
- **Stuck saves:** a database write stuck for 15 seconds counts as failed, so the backup copy still gets the data.
- **Swap and help:** the Accessories-tab "?" fix; swaps and help resolve by the exercise's own lift.
- **Settings save:** it no longer re-rounds unchanged 1RMs (found while testing unit conversion).
- **Import:** it accepts a recovery-copies file.

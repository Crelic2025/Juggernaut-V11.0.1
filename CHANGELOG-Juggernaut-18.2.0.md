# Juggernaut v18 — build 18.2.0

Builder's draft for the repository, written by Claude on November 23, 2026. Not published. Checked in desktop Chrome only. Not tested on an iPhone or iPad, in Safari, or in any WebKit browser.

Home explains itself, and Progress shows what you really lifted. Built on the live 18.1.0. The weights, how they progress, the training max, what a session saves and what goes to Hermes are unchanged.

## What changed

### Tap to explain (Home)

Tap one of these on the lift card for a short explanation under it. Tap again to close. One is open at a time.

| Tap | It explains | Watch this |
|---|---|---|
| Green dashed +1 box | The bonus set: check in at 23 or more out of 30 and one extra set is offered; taking it is up to you. Under 15 a set comes off, under 8 two | Chapter 2, 0:26 |
| The + set (5+, 3+ …) | Do at least the target reps, keep going while reps stay clean, stop 2–3 reps short in accumulation and 1–2 in intensification. It is not a max-out; only a test week changes the training max | Chapter 3, 0:26 |
| The test set (test weeks) | One all-out set; the standard, and the reps that raise the training max (the same numbers the card shows) | Chapter 5, 0:01 |
| “72.5% of TM” | Today's share of the training max, what the training max is and when it changes. On a deload: the 40/50/60% sets | Chapter 1, 0:08 |
| The readiness bar | The four bands: under 8, 8 to 14.5, 15 to 22.5, 23 and up | Chapter 2, 0:21 |

- **Watch this in the tour** opens the video at that moment.
- Keyboard: each target takes Tab, Enter and Space. Screen readers hear each as a button.

### "Last time" shows what you lifted

| Session | 18.1.0 | 18.2.0 |
|---|---|---|
| Deload, three sets climbing | 3 × 5 at 170 lb | 112.5 / 142.5 / 170 lb × 5 |
| Weight changed part way | 8 × 5 at 242.5 lb | 4 × 5 at 237.5, 4 × 5 at 242.5 lb |
| Every set different | 8 × 5 at 242.5 lb | 8 sets × 5, 225–242.5 lb |
| All sets the same | 8 × 5 at 237.5 lb | 8 × 5 at 237.5 lb (unchanged) |

### Goal scorecard (Progress)

- Each lift on Progress gets a line: **Heaviest lifted** (weight × reps, with the date), from every set in the log.
- With a goal set: **Goal lifted** and the date, once a logged set has reached the goal weight. **Estimate at goal** when the estimate (training max ÷ 0.9) has reached it but no set has.
- The first session that reaches the goal weight shows **Goal lifted** on its finish screen.
- "Total" is now **Estimated total**.
- An estimate at the goal no longer reads "Goal reached" anywhere.
- Sets logged in kg are converted when you use lb, and the other way round.

### Cues

- **Write it:** on the finish screen, under the notes, "Cue for next deadlift day" (up to 120 characters). Save cue.
- **See it:** on Home's lift card whenever that lift is on the card, and at the top of the warm-up sheet when you start it.
- **Clear it:** Clear on the warm-up sheet, with Undo for six seconds. Or save the finish-screen line empty.
- One cue per lift. It stays until you clear it.
- Kept with your data (`settings.cues`) and in backups. Not sent to Hermes.
- Going back to 18.1.0 keeps the cue in your data (it just isn't shown), and 18.2 shows it again. Tested.

### Names

- Page title and `APP_VERSION` read 18.2.0. Settings shows "v18.2.0".
- The first launch keeps a copy of the 18.1.0 state (`recovery:preupgrade:18.1.0`), as every new version does.

### The video tour

Read again in a new voice, Olivia (British English, Inworld through Speko), and filmed again from 18.2.0, so the clips match the 18.2 screens.

- Three lines now name the weeks as the book does: "Week one is accumulation…", "Week two is intensification…", and the + set line ("two or three in accumulation, one or two in intensification").
- The chapter lengths and the total on Play the tour (now 4:23) match the new clips, and "Read it instead" matches the new words.
- "Watch this" links start at the new moments.
- The file stays one file, 13.2 MB.

## What did not change

- The functions that decide weights, sets, the training max, what a session saves, what is exported and what goes to Hermes: 31 of them checked byte-identical.
- Loading data: one step added, which tidies `settings.cues`. Nothing else.
- The same eight workouts in 18.1.0 and 18.2.0 save the same state and queue the same Hermes packet, apart from `appVersion`.
- The week names, everywhere: accumulation, intensification, test and deload on Home ("8s intensification"), and Accumulate, Intensify, Test, Deload in the Program table, as in 18.1.0.
- The service worker, the content security policy, the Hermes contract, storage keys and the export format.

The build is the live 18.1.0 file plus 37 listed text changes and seven re-filmed clips. `build/tools/verify.py` puts the 18.1.0 clips back, undoes the changes and gets the live file back byte for byte.

## Limits

1. Tap targets on the set row are the boxes themselves, made larger by 6 px above and below. The +1 box is narrow (30 px).
2. "Heaviest lifted" counts every set with at least one rep, including test-day ramp sets. Warm-ups aren't in the log, so they don't count.
3. A cue is not shown when you resume a workout that was already under way, only when you start one.

## Checks

Desktop Chrome for Testing 153, Playwright 1.63, Node 22, Linux, synthetic data, clock set to Thu Nov 19, 2026 18:00. All run on the final file.

| Check | Result | File |
|---|---|---|
| Static: the live file plus the listed changes and the new clips, nothing else; protected functions byte-identical; the 18.2 code writes only `settings.cues` | 19 of 19 | `results/02-static-checks.txt` |
| v18's 142 acceptance checks, its week-name statements word for word (3 statements brought up to date: page title, build name, and what the guide lists first, from 18.1) | 142 of 142 | `results/03-v18-acceptance-checks.txt` |
| Video tour and guide (18.1's checks, pointed at 18.1.0) | 70 of 70 | `results/04-tour-and-guide-checks.txt` |
| 18.2: week names the same as 18.1.0, tap to explain, Last time, scorecard, cues, fit at 7 screen sizes | 76 of 76 | `results/05-18.2-checks.txt` |
| The same eight workouts in 18.1.0 and 18.2.0: saved state and queued Hermes packet | Identical in all eight, apart from appVersion | `results/06-same-workouts-in-18.1.0-and-18.2.0.txt` |
| Built-in self-tests (`?selftest`) | 90 of 90 in both | `results/07-built-in-self-tests.txt` |
| 18.1.0, then 18.2.0 (workout, weigh-in, cue), then 18.1.0 (saves), then 18.2.0, on the same storage | 11 of 11 | `results/08-18.1.0-to-18.2.0-and-back.txt` |
| Controls: 19 deliberate faults, each run through the checks | 19 of 19 caught | `results/09-controls-on-the-18.2-checks.txt` |

## Not tested

- iPhone, iPad, Safari, the installed home-screen app. No WebKit browser was available where this was built.
- The tap targets with a finger, and VoiceOver.
- "Watch this" opening the video on a phone, and the new voice on a phone speaker.
- The warm-up cue on a real workout on the phone.
- Delivery from GitHub Pages, and a live Hermes send.

## Rollback

Republish the 18.1.0 `index.html` (SHA-256 `0bd2b13f14bb02fcb9ad2b5f4a7b23b4c2b02cdd65981554e69eeb252e78f090`). Data stays, cues included; 18.1.0 just doesn't show them.

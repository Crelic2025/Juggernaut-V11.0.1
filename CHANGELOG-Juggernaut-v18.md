# Juggernaut v18 — build 18.0.0

Builder's draft for the repository, written by Claude on November 20, 2026. Not published. Verified offline by an independent verifier on November 20, 2026, in desktop Chromium and two desktop WebKit engines; not yet tested on an iPhone or iPad. Second candidate (r2): it replaces the candidate of the same day with HTML SHA-256 `56bf55c3309332df145db2598c91fda9769b3691a3acc2d0e414634d8973157b`, in which tapping a lift sent the screen to the top.

Home is rebuilt around the day's lift, following the "concept A" session card Reese chose. Four faults found in 2.4.2 are fixed. The program, the weights and how they progress, storage, the Hermes bridge and the service worker are unchanged.

## What changed

### Home

| Part | 2.4.2 | v18 |
|---|---|---|
| First thing on Home | Readiness block, then the cycle map. On a 390 × 844 phone the session card began 1,343 px down and its Start 1,755 px down (the pinned bar offered a Start) | Session card, at 98 px. Its Start is at 612 px, on the first screen |
| Session card | Wave title, description, weight, bar drawing, details line | Lift, weight, % of TM, TM, set boxes, plate chips, rest, readiness, Start, Skip |
| Planned sets | A line of text ("8 × 3 reps") | A row of boxes that today's check-in changes: hatched boxes are sets a low score removes, "+1" is the extra set a score of 23 or more offers |
| Set list | Not shown before a workout | Behind "Set list": warm-ups, lead-ins, work sets and the + set, each with plates per side. A long plate list (five or six a side) wraps in its own column |
| Plates | Bar drawing | One flat colour chip per plate, in the plate's colour. No second colour on any edge |
| Wave description | Printed in the card every day | Behind the wave chip ("8s intensification") |
| Lift picker | Four chips in the card | "Week N lifts" row under the card: day and result once logged, planned weight if due. The longest loads (a 10s test week, "272.5 × 10+") are set a size smaller so none is cut short. Tapping a tile leaves it where it is on the screen: the page moves by as much as the card above changed height |
| Weekly Plan card | Its own card low on Home | Removed. Lifts logged and days left are in the lifts row's heading; pace, "Next up" and the rest-day wording are in the line under the row; skipped-test warnings stay |
| Readiness | Large block at the top | In the card: time, score, zone, change since the last check-in, effect on sets, zone track, Edit. The last ten check-ins, the Recovery link and the deload signal moved to the tiles |
| Last session | One paragraph in the card | "Last time": latest session, latest one from the same kind of week, and the difference from today's plan |
| Tiles | None on Home | "Consistency and recovery": training days (unique dates, 12 weeks), readiness (last ten, which answers got better or worse), sleep answer, bodyweight with a + to log a weigh-in |
| Cycle map | Second on Home. Tapping a week opened Program | Same drawing, after the tiles. Under the key: a week summary (sets and reps per lift, peak % of TM) and the work logged that week. Tapping a week moves the summary and stays on Home |
| Notices (deload, backup) | Above the session card, under the readiness block | Under the week's lifts |
| Start buttons | Card and pinned bar could both show | The pinned bar steps aside while the card's Start is on screen |
| iPad | One 640 px column | Card on the left; lifts and last time beside it; four tiles in a row; the map beside the last five weeks and estimated maxes |

### Other screens

- **Rest** reads as minutes and seconds (1:45) where Home and the week preview sheet printed "105s rest".
- **Estimated maxes**: marked ≈, the training max carries a TM tag, the last top set is shown, and the "No change this cycle yet" line is gone.
- **Session log** (Progress): each set is a chip (reps/target), the + set outlined. Delete is still behind a swipe.
- **Program**: "All sixteen weeks", a table that opens under the tests. Tapping a row shows that week above.
- **Guide**: a "What Changed in v18" section, and the passages that described Home are corrected.
- **Names**: title, header, share cards and welcome sheet say v18. `APP_VERSION` is `18.0.0`.

### Bugs fixed (all four were in 2.4.2)

| # | Where | What 2.4.2 did | What v18 does |
|---|---|---|---|
| B1 | Progress › This Week | Compared the week so far with the whole of last week, so a Thursday with two lifts done read "Sessions 2 −2". A drop in tonnage lost its minus sign | Compares with last week up to the same weekday and time, says so, prints "same" for no change, and signs tonnage |
| B2 | Progress › lift charts | Said "Current TM — complete test days to track it" for a lift that had been tested and held its max | Says "Held at 283.5 lb through 1 test" |
| B3 | Saved readiness score | `((sum ÷ 5) − 1) × 7.5` stored 26.999999999999996 for 27 | `(sum − 5) × 1.5`, exact. The zone is the same for all 3,125 possible answers |
| B4 | Home, early fatigue note | Showed "Fatigue watch: Overhead Press: readiness trending down" above a deadlift day | Shows the note only for the lift picked, or when it is about every lift, and words it "readiness has trended down on recent Overhead Press days". Recovery still lists every signal |

### What did not change

- `PROGRAM` (sets, reps, percentages, rest) and `TM_RULE`.
- Every function that plans a session, computes a weight or plates, moves a training max, saves, exports, imports or builds a Hermes packet. Hermes contract stays `1.1`.
- Storage keys, database name and version, export format.
- `sw.js`. It is network-first and needs no change for a new page.
- The readiness rule. Its thresholds now sit in one function (`readinessSetPlan`) that both the workout and Home's set boxes read: below 8 two work sets off, below 15 one, 23 and over an extra set offered, never on a test day or a deload.

Decided with Reese and left for later: plate counts per gym, planned volume beside logged volume. Dropped: a redrawn cycle map.

## Builder's results (not independent publisher verification)

All in desktop Chrome (headless), on synthetic sample data, with the clock set to Thursday November 19, 2026.

Every row below has been run on this file, the HTML named under Release identity. The builder ran the acceptance checks, the static checks and one mutation control on it, and the rest on the candidate it replaces. An independent verifier (Claude, offline, macOS, Chrome for Testing 148, November 20, 2026) then ran all of them on this file and got the results below. The verifier also ran its own checks, including two desktop WebKit engines; neither is Safari on an iPhone.

| Check | Result | Run on |
|---|---|---|
| Acceptance checks (Home, map, other weeks, Program and Progress, nine screen sizes, whole workouts, tapping every lift tile) | 142 of 142 passed | This file |
| Static checks (built from the verified 2.4.2 file, build repeats byte for byte, script parses, which functions changed) | 26 of 26 passed | This file |
| Functions | 762 in 2.4.2: 27 edited, 0 removed, 39 added. 75 named program, math, session, storage and packet functions, and all 148 with packet, Hermes, bridge, storage, backup, export, import, training-max or plate in the name, are byte for byte those of 2.4.2 | This file |
| Same eight workouts run in 2.4.2 and v18 | Saved state and queued Hermes packet identical in 8 of 8, apart from the version string and, in 3, the readiness score 2.4.2 stored inexactly (B3) | This file |
| App's built-in self-tests (`?selftest`) | 90 of 90 in 2.4.2 and in v18, the same list | This file |
| Mutation controls, all of them (the build broken on purpose, one fault at a time) | 21 of 21 caught, including the one for the tap fix | This file |
| Upgrade: 2.4.2 data in the app's own database, then v18 at the same address | Same sessions, weigh-ins, week and training maxes; a copy of the 2.4.2 state is kept. Going back to 2.4.2 after a workout and a weigh-in in v18 also passed | This file |
| Cycle map | Its SVG markup is identical to 2.4.2's on the same data | This file |
| Fit: each of the 16 weeks as the current week, each lift, set list shut and open, plus the odd states | Nothing in the v18 layer cut short, out of its box or wider than the screen, in 2,552 states at 11 screen widths (320 to 1194) | This file |

## Known limitations

- **Not tested on an iPhone or iPad, in Safari, or as an installed home-screen app.** Layout, safe areas, the keyboard over the bodyweight field and the pinned bar were checked in desktop Chrome only. `iPhone-checklist-v18.md` lists what to look at.
- Not tested: a real Hermes send (packets were built and compared, not delivered), VoiceOver, a full 16-week cycle through the screens, import, export, reset and unit conversion (their code is unchanged).
- A Home redraw takes longer than in 2.4.2 in desktop Chrome: 19 ms against 13 ms on the sample data, 26 against 15 with ten times the history. Not measured on a phone.
- Offline reopening through the service worker passed in desktop Chromium on a local address (the verifier's run). It has not been tried in Safari or in the installed app.
- On a 320 px wide phone the card's Start begins under the tab bar. The pinned bar shows its Start there.
- Near the top of Home, tapping a lift that is already done moves the week's row up: its card is 351 px shorter (at 390 px wide) and a page cannot scroll above its top. Everywhere else the tapped tile stays put.
- The other half of the same case: from there, tapping a lift that is still due scrolls the page down by about 350 px to hold the tile where it is, so the header and the card's lift name and weight are above the screen. Start stays visible.
- Below iOS 16.2 some of the new backgrounds and borders do not draw, because they use `color-mix()`: the wave chip's background, the "+1" box's dashed outline and the done tiles' borders. Text, layout and behaviour are unaffected. 2.4.2 already has 18 such uses; v18 adds 8.
- The lifts row's "Next up" can name a different lift from the one on the card, as the Weekly Plan could in 2.4.2: the suggestion never overrides the lift picked.
- On a rest-day suggestion the wording appears twice, in the line under the lifts row and in the note below it. Both are 2.4.2's sentences.
- "Today vs" is left out on test and deload weeks, and when the earlier session was logged in the other unit.
- `v17Hero` (the old readiness block) and the Weekly Plan styles are still in the file, unused, to keep the change small.
- Unchanged from 2.4.2, found by the new fit check: on Program the small captions in the week panel end in an ellipsis on phones ("of training m…"), and the pinned bar's second line is cut short on test and lead-in weeks.
- Text widths were measured in Chrome. Safari's differ slightly; the tightest places have 1 to 3 px to spare.
- The limitations listed for 2.4.1 and 2.4.2 (more than one window, degraded storage) are unchanged.

## Release identity and rollback

HTML SHA-256: `8468785272256b3dbb1d036bb53b195b7d8c5ed795ca2108ee11ad66bba47e0c` (1,424,730 bytes).
Worker SHA-256: `6523411a5fc5aedc09a17b3ddd813ca5907ee040304dab479638e93f8705169f` (unchanged; not part of this change).
Built from: 2.4.2 (17.4.2 r3), commit `092471e73b683fb9379708c531f90d0553c2a7a1`, HTML SHA-256 `e1ba928a9cdf1b0841fe6c3c7b55d78f572c61342a24ddcd9b9f9fd98c4ced27`.

Repository name, Pages address and storage origin are unchanged. Do not clear browser storage or reinstall to update. A copy of the 2.4.2 data is kept automatically the first time v18 opens (Progress › Export recovery copies). Export a backup from Progress before updating when possible. To go back, republish the 2.4.2 `index.html`; reverting the page does not undo anything logged while v18 was in use, and nothing v18 saves is in a form 2.4.2 cannot read.

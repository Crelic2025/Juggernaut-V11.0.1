# Juggernaut v18 — build 18.1.0

Builder's draft for the repository, written by Claude on November 21, 2026. Not published. Checked in desktop Chrome only. Not tested on an iPhone or iPad, in Safari, or in any WebKit browser.

A video tour sits at the top of How to Use, and the "What changed" notes fold into one closed row. Built on the published v18 r2 file. The program, the weights and how they progress, storage, the Hermes bridge and the service worker are unchanged.

## What changed

### Video tour (How to Use)

| Part | What it is |
|---|---|
| Where | A card under the guide's header, above Jump to Section. Title: "See the app in four minutes" |
| Chapters | Seven, 4:25 in all. Each row shows its number, title and length |
| Play | "Play the tour" starts at chapter 1. A chapter row starts at that chapter |
| Player | A full-screen layer over the guide. Chapter number and title, a Close button, the video with the phone's own controls, Previous and Next chapter |
| Moving on | When a chapter ends the next one starts. On chapter 7 the button reads Done and closes the player |
| Sound and captions | A narrator's voice, with the same words in a band under the app's screen. The captions are part of the picture, so they need no setting |
| Read it instead | Under the chapter list. The narration as text, chapter by chapter |
| Sample data | The numbers in the clips are sample data. The card says so |

| # | Chapter | Length |
|---|---|---|
| 1 | How the program works | 0:54 |
| 2 | Home and your check-in | 0:39 |
| 3 | Running a workout | 0:52 |
| 4 | Your week and the cycle map | 0:30 |
| 5 | Test weeks and your training max | 0:32 |
| 6 | Program and Progress | 0:32 |
| 7 | Settings and backup | 0:27 |

Chapter 1 explains the program for someone new to it: the training max, the four waves, and the four-week rhythm of volume, heavy, test and deload. Chapter 2 explains the check-in score, including the dashed green "+1" box (a bonus set offered at 23 or more out of 30). Chapter 3 explains the plus set: at least the target reps, stopping 2–3 reps short of failure on a volume week and 1–2 short on a heavy week.

When a clip cannot be used:

| Case | What the player does |
|---|---|
| The clip is damaged or cut short | Shows "This clip did not play here. Here is what it says." and the chapter's words |
| The browser cannot decode it | The same |
| The browser wants a tap before it plays | Shows a "Play chapter N" button over the picture |
| The page is still arriving and the clip is not in yet | Shows "Loading this chapter…" and starts when it is in |

### "What changed" (How to Use)

| Part | v18 r2 | 18.1.0 |
|---|---|---|
| The notes | Eight sections, open, at the top of the guide | One closed row, "What changed". Inside: one row per version, newest first (v18.1, v18, 2.4.2, 2.4.1, 2.4, 2.3, 2.2, 2.1, 2.0). Tap a row to read its note |
| Space they take between the contents and "What This App Is" (390 px wide) | 8,961 px | 98 px |
| Where "What This App Is" starts | 10,634 px down | 2,139 px down, tour card included |
| Jump to Section | Eight "What Changed in …" links | One "What Changed" link. It opens the row and scrolls to it |
| The eight older notes | | Same words (2,206 words compared). The row ids are the old heading ids (`guide-v18` … `guide-v2`) |

### Names

- Page title and `APP_VERSION` read `18.1.0`. Settings shows "v18.1.0".
- Exports and Hermes packets carry `appVersion` 18.1.0, and the export file is named `juggernaut-v18.1.0-export.json`. In the saved state and the queued packets nothing else differs (eight workouts compared).
- The first launch keeps a copy of the 18.0.0 state (`recovery:preupgrade:18.0.0`), as every new version does.

### File size

| | v18 r2 | 18.1.0 |
|---|---|---|
| `index.html` | 1,424,730 bytes | 13,384,701 bytes |
| If the host compresses it (gzip) | 0.42 MB | 9.2 MB |

- The seven clips are 8,894,840 bytes of MP4, stored in the file as base64 text. That is why it is one file and why the tour plays with no signal.
- The clips are at the end of the file. The app starts before they arrive. Served at 700 KB/s on a test server, Home was on screen 0.2 s after the first byte with 1.6 of 13.4 MB sent, and a lift could be picked while the rest came in.
- Started from memory, the page is ready about 0.3 s later than v18 r2 (461 ms against 148 ms, desktop Chrome).

## What did not change

- The app's own script: one line differs, the version (`const APP_VERSION = '18.1.0';`).
- Styles for every other screen. Each of the 49 added rules names a `.tour-` or `.g181-` class, and those classes are only on the new parts.
- Home, Program, Progress, Coach, Tools and Settings draw the same markup as v18 r2 on the same data (202,502 characters compared).
- Training math, storage keys, the database, export format, the Hermes contract, the content security policy, `sw.js`.
- The tour's script is separate from the app's. It reads no app state, calls no app function and writes no storage.

The build is the published file plus 15 listed text changes. `build/tools/verify.py` undoes them and gets the published file back byte for byte.

## How the tour was made

- Filmed from the app itself at 390 × 844, on the test suite's sample data (week 6 of 16; chapter 5 on a test week). Taps, scrolls and highlights are scripted, so a chapter can be filmed again.
- Voice: Speko, Cartesia voice "Jameson". It is a synthetic voice. 46 lines, 680 words.
- Captions: the narration, sentence by sentence.
- In the app: H.264 High level 3.1, 584 × 1408, 30 frames a second, AAC mono 48 kHz. A sharper copy (780 × 1880, 19.8 MB) was sent to Reese separately and is not in the app.

## Limits

1. The clips show 18.1.0's screens. If a screen changes later, its chapter needs filming again.
2. While the phone's video controls are showing they cover the caption band. They fade after a few seconds.
3. At 390 × 844 the picture is about three quarters of the app's real width (299 px in desktop Chrome; smaller with a notch and home bar). The full-screen button in the video's controls makes it larger.
4. The first launch after the update downloads the larger file once.
5. At 320 px wide the guide scrolls 10 px sideways because of a table under "The 16-Week Program". v18 r2 does the same. Not changed.

## Checks

Desktop Chrome for Testing 153, Playwright 1.63, Node 22, Linux, synthetic data, clock set to Thu Nov 19, 2026 18:00. All run on the final file.

| Check | Result | File |
|---|---|---|
| Static: the build is the published file plus the listed changes; each clip in the file is its clip file, byte for byte | 24 of 24 | `results/02-static-checks.txt` |
| v18's acceptance checks on 18.1.0 (three statements brought up to date: page title, build named in Settings, first entry in Jump to Section) | 142 of 142 | `results/03-v18-acceptance-checks.txt` |
| Tour and guide: card, contents, the folded list, the player, the four fallback cases, a slow load, other screens | 70 of 70 | `results/04-tour-and-guide-checks.txt` |
| The same eight workouts in v18 r2 and 18.1.0: saved state and queued Hermes packet | Identical in all eight | `results/05-same-workouts-in-v18r2-and-18.1.0.txt` |
| Built-in self-tests (`?selftest`) | 90 of 90 in both | `results/06-built-in-self-tests.txt` |
| v18 r2, then 18.1.0 (tour played, weigh-in, workout), then v18 r2 again, on the same storage | 10 of 10 | `results/07-up-to-18.1.0-and-back.txt` |
| Controls: 17 deliberate faults, each run through the checks | 17 of 17 noticed | `results/08-controls-on-the-new-checks.txt` |

Not run on 18.1.0: v18's layout sweep (2,552 states), its mutation controls, and its edge-state, reload, redraw-timing and Start-position stages. They test code and styles that the static check shows are unchanged.

## Not tested

- iPhone, iPad, Safari, the installed home-screen app. No WebKit browser was available where this was built.
- Whether the clips play on a phone, with sound, from the saved copy with no signal.
- Whether the next chapter starts by itself on a phone (if not, the "Play chapter N" button appears).
- The phone's full-screen video mode, AirPlay, Low Power Mode, a phone on its side.
- Delivery from GitHub Pages, and the service worker saving the larger page on a device.
- A live Hermes send.

## Rollback

Republish the v18 r2 `index.html` (SHA-256 `8468785272256b3dbb1d036bb53b195b7d8c5ed795ca2108ee11ad66bba47e0c`). Data stays. v18 r2 opened on everything 18.1.0 saved in the test.

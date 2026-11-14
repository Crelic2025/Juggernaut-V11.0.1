# Juggernaut v15.0.0 — changelog

Presentation-only release on top of v14.0.2. Same five tabs in the same order, same program, same math, same data. The visual system is described in `DESIGN.md`; proof that logic is unchanged is in `reports/BEHAVIOR_PRESERVATION.md`.

## Across the app
- New token set: near-black neutral surfaces instead of pure black with blue-tinted panels, the existing green as the single accent, blue kept for information (current week, ramp sets, tier labels), amber and red for warnings and errors. Purple is retired as a hue.
- No gradients, glows or pulsing badges. One card level; inside a card, hairlines and plain wells replace nested bordered boxes.
- Labels are sentence case and at least 12px. All uppercase label styling and the 9 to 11px text are gone.
- Loads, reps, timers and history figures use tabular numerals.
- Every control is at least 44px in both directions (the "?" and "Why?" buttons keep a small look with a 44px hit area). Visible focus ring on every control; inputs show focus as an inset ring without changing border width.
- Buttons: one filled primary per region; warning and destructive buttons are outlined, and filled only inside a confirm sheet.
- Bottom nav: flat bar, current tab marked by colour plus a top marker; nav and header content are capped and centred on wide screens.
- Motion reduced to short opacity and transform transitions. Performance mode and reduced-motion handling are kept.

## Workout
- **Pre-session.** Week strip cells are 44px. The day card leads with phase, then the lift selector as 44px chips, then the load as the largest figure with scheme, plates and a plain meta line (no pill borders). Start is a 56px primary.
- **Readiness sheet.** Left-aligned title, each factor a row of five 44px number buttons (selected state is filled, low values filled red), Skip and Start as one row with Start the wide primary. Rows wrap on narrow phones.
- **Active session (set workspace).** Readiness strip reads "Readiness 15/30" with the five factor dots. Set label in sentence case, load as the hero figure with a dotted underline to show it can be tapped, plate diagram, instruction line at readable size, rep stepper with 56px buttons and a "Reps" caption, 64px Done, Undo and Rest beneath.
- **Set list.** Rows separated by hairlines instead of ten bordered boxes. The current row is filled, edged and labelled "Now"; the following row is labelled "Next"; finished rows are dimmed, checked and labelled "done". Ramp and lead-in rows keep the blue pill and a blue edge when current. Weight, percent and reps are larger.
- **Wide screens (1024px and up).** Workspace and set list sit side by side; the workspace stays in view while the list scrolls.
- **Rest sheet.** Order is now countdown, up next (load and set detail), sets remaining, then controls with Done as the wide primary. The ring is thinner; the countdown is larger.
- **In-session accessories.** Stepper buttons are 44px (were 28px), two sets per row where there is room, Log is the filled action, logged cards keep their green edge and "Logged" badge, a card ready to progress keeps a green edge. Swap drawer is a neutral well.
- **Completion.** The summary is no longer a card inside a card: title, stats as a two-column list with hairlines, note chips at 44px, notes field, difficulty buttons at 48px (two rows on 320px phones), coach note, weak-point question and accessory targeting as sections separated by rules.
- **Weight sheet and guided warm-up.** Larger figure and 56px steppers on the weight sheet; warm-up load set in the numeric face.

## Accessories
- Exercise list rows are separated by hairlines; each shows name, tier (blue), category, scheme and weight, with last reps at the right.
- Edit form: 44px steppers and reorder arrows, Save Log as the filled action, Deload outlined amber, Delete outlined red.
- Pattern coverage is a plain card with neutral tags. Library chips are 44px.
- "Recalibrate from Training Maxes" is a secondary button so the tab has one filled action at a time.

## History
- Export and Import match in size and style. Weekly figures in wells, sparklines and session log as hairline-separated rows, Rep-Max PRs as neutral tags, coach note toggle as a 44px well.

## Coach
- Message bubbles on the shared surfaces, error bubble in the error colour, suggestion chips at 44px, input and Send aligned, Clear chat as a quiet text button. The conversation area no longer runs under the bottom nav when the header shows two badge rows.

## Settings
- Groups are plain disclosure cards that open without an inner scroll area. Toggles are 48px rows. Lift maxes show TM, 1RM and goal three across; barbell profiles show bar, collar and round three across with plates beneath.
- Save All Settings is its own full-width block. Start next cycle and Wipe history sit under it in a separate red-edged card headed "Cycle and history", with their explanation text unchanged.

## Guide and dialogs
- Guide: table of contents as a list of 44px rows, headings in the ink colour, body at 16px, the program table with rules between rows, Key Terms no longer overflow at 320px. No wording changed.
- All sheets: capped at 560px wide and centred on wide screens, scroll inside when taller than the screen, same handle, title and action treatment.

## Copy changes (every one)
| Where | Before | After |
| --- | --- | --- |
| Page title | Juggernaut Method 2.0 — v14.0.2 | Juggernaut Method 2.0 — v15.0.0 |
| Header sub-label | v14.0.2 — Book Rules + Hermes | v15.0.0 — Book Rules + Hermes |
| Rest sheet label | Up Next | Up next |
| Accessory edit button | Dupe | Duplicate |
| Accessory edit button | Del | Delete |
| Rep stepper (new caption) | (none) | Reps |
| Settings, above the cycle buttons (new heading) | (none) | Cycle and history |
| Set list markers (new, from CSS) | (none) | Now / Next / done |
| In-session readiness score (new suffix, from CSS) | 15 | 15/30 |
| Screen-reader labels (new) | (none) | Exercise help; Move up; Move down |
| Reset button (round 2: icon in the header → labelled button in Settings) | icon only (screen-reader label "Reset app") | Reset Everything |
| Readiness sheet score (round 2: suffix from CSS) | 15 | 15/30 |
| Guide, Guided Warmup section (round 2) | Settings → AI Hybrid Layer | Settings → AI & Readiness |
| Guide, Cycles, Wipe and Reset (round 3) | Reset Everything (the reset icon in the header) | Reset Everything (bottom of Settings, with the cycle buttons) |
| Settings, "Cycle and history" help text (round 3, one sentence added) | (none) | Reset Everything: erases all settings, history, program state and accessories; this cannot be undone. |
| Guide, Settings — Do This First (round 3) | Barbell Profiles and Props & Implements as their own bold entries; no Storage or Bodyweight entry | Barbell Profiles described inside Lifts & Maxes, Props & Implements inside Gym Equipment; new Storage and Bodyweight entries (full text in `reports/BEHAVIOR_PRESERVATION.md`, Round 3) |

Labels that used to be shown in capitals through styling ("SQUAT · SET 1/10", "REST TIMER", "TONNAGE") now appear as they are written in the source. Text that is written in capitals in the source ("DONE", "TEST", "+ SET", "RAMP", "LEAD-IN", "DELETE") is unchanged. Warning, consent and rule text is word for word as in v14.0.2.

## Version
`APP_VERSION` is `15.0.0`. Through existing code the offline cache, export file name and packet metadata carry the new version.

## Not changed
Program tables, percentages, rounding, plate math, readiness scoring, timers, progression and deload rules, state shape, storage, import and export, migrations, the Hermes bridge, the service worker and the self-test.

## Round 2 (Reese's decisions, 2026-11-10)
1. **Accessories phase.** After Complete Session → Continue to Accessories, the finished set workspace and set list no longer sit above the accessories; the screen starts at the accessory list. They return in every other phase, including after Finish, after a reload mid-accessories (still hidden, as the phase is still open) and when a new session starts. Done with markup order and CSS; no script change.
2. **Reset Everything** moved from the header into the red-edged "Cycle and history" block in Settings as a labelled button next to Start next cycle and Wipe history. Same confirm dialog and wording. The header now has two actions (calculator, help).
3. **Guide.** The Guided Warmup section points to "Settings → AI & Readiness".
4. **Readiness sheet** shows the score as "15/30", matching the in-session strip. Before all five factors are rated it shows "—".
5. **Week strip.** Per-wave tint is back and agrees with the Program Overview chart: 10s blue, 8s and 5s amber, 3s red. Upcoming weeks are outlined with a tinted label, done weeks are green with a check mark, the current week has a heavier blue border, ring and bright label.
6. **PR burst.** The grey dot (the retired purple) is now pink (`--spark`), so all four dots are celebration colours.

Not changed, by decision: the selected Session Difficulty text colour, and the "DONE" label.

## Round 3 (Reese's decisions, 2026-11-10)
1. **Guide, Cycles, Wipe and Reset:** Reset Everything is described as being at the bottom of Settings with the cycle buttons, not as a header icon. What it erases is unchanged.
2. **Settings, "Cycle and history":** the help text gains one sentence on what Reset Everything does, matching the confirm dialog.
3. **Confetti:** the grey dot (retired purple) is now pink (`--spark`), as in the PR burst.
4. **Week strip on wide screens:** at 1024px and wider all 16 weeks show without scrolling, in the overview and in a session. In the overview the strip is centred and wider than the 640px column; the cards below keep that column. Phone widths are unchanged.
5. **Guide, Settings — Do This First:** Barbell Profiles and Props & Implements are described as parts of Lifts & Maxes and Gym Equipment; short entries added for the Storage and Bodyweight groups.

## Round 4 (approved 2026-11-11)
- **A. History.** Each session in the log shows its saved difficulty beside readiness ("· Difficulty 8/10") when one was recorded. The changed-weight note lists every distinct reason once, in the order they happened ("2 sets at a changed weight (felt heavy, pain)"); a single reason reads as before. Display only; nothing new is saved.
- **B. Screen readers and keyboard.** The five readiness rows and the Session Difficulty row are radio groups with names ("Sleep Quality", "Session difficulty"), with one tab stop per group and arrow keys to move; Space or Enter selects. Accessory steppers, the "?" help button and the reorder arrows are named with the exercise and set ("Increase reps, Pause Squat set 2", "Help, Pause Squat", "Move Pause Squat up"). RPE steppers and the warm-up rating buttons have names too. Looks and tap behaviour are unchanged.
- **C. Workout, before a session.** Program Overview is a closed disclosure with a 48px header row, so the day's lift, load and Start come first. Tap the row to open the chart; it closes again on the next visit. The chart itself is unchanged.

New visible text in round 4: "Difficulty N/10" in the session log (when recorded); additional reasons inside the changed-weight brackets. No existing text was reworded.

## Round 5 (approved 2026-11-11): the first logic additions in v15
- **End workout early.** Once at least one set is done, an "End early" button appears under Complete Session. It asks for confirmation ("3 of 10 sets done. The 7 sets not done will be recorded as not performed.") and an optional reason: Too difficult, Out of time, Pain or injury, Other.
  - The sets you did are saved as usual. The others are recorded as not performed: never as done, never as 0 reps. They do not count toward tonnage, weekly figures, PRs or anything else.
  - The session counts as that lift's session for the week, and the week advances as usual.
  - Test days: if the test set was done, the TM rule applies as usual. If it was not, the TM holds and it is not a missed standard.
  - Afterwards the usual summary appears, saying the session was ended early, then notes, difficulty and accessories.
  - History shows "Partial" with "Ended early: 3 of 10 sets done (Out of time)".
  - Sessions completed normally are saved exactly as before.
- **Accessory stall hint.** For Tier 2 and 3 accessories, after 3 logs in a row below the rep ceiling at the same weight, the card shows for example "3 logs in a row at 25 lb without reaching 15 reps on every set. Consider Deload." Reaching the ceiling on every set or changing the weight clears it. Deload-week and fatigue-day logs neither count nor show it. Nothing is applied automatically.

New visible text in round 5: "End early"; "End workout early?" and its message; "Reason (optional)" and the four reasons; "Ended early: x of y sets done (reason)"; "The sets not done were recorded as not performed."; "Session ended early."; "Partial"; the stall hint and "The Deload control is on the Accessories tab."

## Round 6 (approved 2026-11-11)
- **Accessory Deload always lowers the weight.** It now rounds down: 90% of the weight, down to the accessory's increment (25 lb with a 5 lb increment goes to 20 lb, where it used to stay at 25). If that is still not lower, it drops one increment.
  - Barbell exercises go to a weight you can actually load: the heaviest one at or below 90% that your bar, collars and the plate sizes switched on in that lift's Barbell Profile can build. With 45/35/25/10 plates on a 45 lb bar: 135 → 115, 95 → 85, 65 → 45.
  - At the lowest weight (one increment, or the bar plus collars) nothing changes and the app says "Already at the lowest weight".
  - The confirmation names the exact weights: "Drop Pause Squat from 135 lb to 115 lb and reset progression? Use when stuck."
  - Normal progression after a ceiling log is unchanged.
- **Test day ended before the test.** The dashboard's "no test since the … wave" warning now also appears when a test day was ended early before its test set, on the same schedule as for a skipped test day. The lift still counts as done for that week.
- **Wording after a session ended early.** The Finish button reads "Finish Session ✓" and the toast "Session ended early — 1 of 6 accessories logged." instead of calling the session full.
- **Toast position.** Toasts appear at the top of the screen, over the header, so they can no longer sit on Done, the rep steppers, Complete Session, End early or Finish.

New or changed visible text in round 6: the Deload confirmation (exact weights instead of "roughly 90% weight"); "Already at the lowest weight (N lb)."; "Finish Session ✓"; "Session ended early — x of y accessories logged."

## Round 7 (decided 2026-11-11)
- **"x of y sets" counts the day's full prescription.** When a session that readiness had shortened is ended early, the count now reads against the full day: "Ended early: 3 of 10 sets done, 2 dropped for readiness", where it used to say "3 of 8". The same number appears in the End early confirmation ("3 of 10 sets done. The 5 sets not done will be recorded as not performed. 2 sets were dropped for readiness."), the completion summary and History.
- The sets dropped for readiness are recorded exactly as before and are not counted as sets you skipped. Days without a reduction, deload weeks and normal completions are unchanged. The in-session "Sets 3 / 8" readout is unchanged. Nothing new is saved.

## Round 8 (approved 2026-11-12): four new views, display only
Nothing in this round changes what is saved, calculated, prescribed or sent to Hermes. Which month, range, lift or sheet is showing is not remembered after a reload.

- **Training calendar (History).** A month grid under Export and Import. A day you trained is filled in its wave's colour (10s blue, 8s and 5s amber, 3s red, deload grey) and marked with the lift (SQ, BP, DL, OHP). A session ended early shows as a dashed outline. Today is ringed. A line under the month says how many sessions it has and how many were ended early. Tap a day to see its sessions as the Session Log shows them.
- **Lift page (History).** Each lift's TM card has "View details". It opens a sheet with the TM, the 1RM and goal as Settings shows them, a dated graph of the TM (3 months, 6 months, 1 year, All), the lift's test days newest first, and its rep-max PRs. Read-only.
- **Readiness card (Workout, before a session).** Once you have a scored check-in: the latest score out of 30, when it was, the change from the check-in before, your last seven scores, and what the app does at that score (below 8 it drops two working sets, below 15 one, at 23 and above it offers an extra set). It has no control that changes training. "How it works" opens the Guide. Deload-week check-ins are left out, as in the Readiness Trend.
- **Weekly volume (History, Progression).** One bar of tonnage per calendar week, coloured by wave, above the per-lift volume sparklines. Ranges: 1 month, 3 months (default), 6 months, 1 year, All. Filter by lift. Tap a bar, or use Earlier and Later, for that week's tonnage and session count. Weeks with no sessions are left empty. Tonnage is worked out as each session's line in the Session Log works it out; sets not performed never count.

Existing screens are unchanged: the TM, volume and readiness sparklines, the Weekly Summary and the Session Log are all still there.

New visible text in round 8: the calendar (month heading, weekday names, "N sessions this month, N ended early", "No sessions this month", "No sessions logged yet", the legend "10s / 8s and 5s / 3s / Deload / Ended early (dashed outline) / Today (ring)", lift marks); "View details ›"; the lift sheet ("Training max", "1RM (TM ÷ 0.9)", "Goal 1RM", "TM over time", the range names, "No TM points in this range.", "N points. Each is the TM going into a test day, placed on that day; the last is the TM now.", "Test days", "N reps · standard N", "Test e1RM", "Rep-Max PRs", "No PRs recorded yet.", "Close"); the readiness card ("Readiness", "How it works", "Last check-in: …", "up N / down N on the check-in before", "same as the check-in before", "First scored check-in", the four verdict lines, "Set drops and the extra set do not apply on test days or deload weeks.", the trend caption); the volume chart ("Weekly volume", "All lifts", the range names, "This chart fills in as weeks are logged.", "No sessions in this range.", "Tap a bar, or use Earlier and Later, for that week's tonnage and sessions. Weeks with no sessions are left empty.", "Week of … : N lb · N sessions (N ended early) · 10s wave", "‹ Earlier", "Later ›", the legend).

Guide copy changes in round 8 (three additions, nothing reworded):
1. Dashboard: a new paragraph, "Readiness card: …".
2. History Tab: a new first paragraph, "Calendar: …".
3. History Tab: two new paragraphs after the sparklines paragraph, "Lift page: …" and "Weekly volume: …".

## Round 9 (approved 2026-11-12): Reese's decisions on the open questions
One new saved field (a custom exercise's "Loaded on a barbell" switch). Training maths, readiness thresholds, progression and the packet shape are unchanged.

- **One tonnage figure everywhere (A).** The Weekly Summary now leaves out lead-in sets as well as ramp sets, like the Session Log, the completion summary, the day card and the weekly volume chart. On a week with lead-in sets its tonnage is lower than before (example from the test data: 11,680 lb becomes 9,985 lb). The per-lift volume sparklines are gone; the weekly volume chart with its lift filter replaces them. TM cards and the Readiness Trend stay.
- **Readiness card says what happened (B1).** In place of the rule for the score, the card reads the saved check-in: "2 working sets were dropped at this check-in.", "Sets were dropped at this check-in, then you restored full volume.", "An extra set was offered and taken.", "An extra set was offered and declined.", "No change: readiness left the session as prescribed.", or "Test day: readiness did not change the session." An older check-in whose record does not say keeps the round 8 sentence and its small print.
- **Half scores show one decimal (B2).** 7.5/30 no longer reads 8/30. Whole scores are unchanged. Applies to the card, the check-in sheet, the in-session strip, the reduced-volume card, the fire-day prompt, the resume prompt, the completion summary, the day card's last session and the Session Log.
- **Hermes hears about a test day ended before its test (C).** The existing `test_missed` lift flag is now also set in that case, as the dashboard has warned since round 6. Contract 1.1, same packet shape.
- **"Loaded on a barbell" on exercises you added (D).** A switch in the exercise's edit form on the Accessories tab, off by default. On: Deload lands on a weight you can load with the bar, collars and plates of the lift the exercise is listed under (135 lb becomes 115 lb with 45/35/25/10 plates). Off: as before (135 becomes 120). Saved in backups; older backups load with it off.
- **Wording for sessions ended early (E).** Day card: "Ended early" in place of "Done". Weekly Plan: "All lifts done this week, 1 ended early." Coach summary: "Ended early after 3 of 10 sets: Out of time." and, for a deload day ended early, "Deload week:" in place of "Deload done:". Test-day warning after a test day ended early: "was not done" in place of "was skipped". Session Log: "Readiness 15/30" in place of "R:15/30". The swap picker has the name "Swap to" for screen readers.
- **Cancel workout (F).** While no set is done, "Cancel workout" sits where "End early" appears later. After a confirmation ("Cancel workout" / "Keep going") the session is discarded: no History entry, the lift stays due, the week does not advance, and that session's readiness check-in is not kept.
- **Stall hint on a Tier 1 exercise you added (G).** Same hint and gates as Tiers 2 and 3. Library Tier 1 exercises, whose weight follows the wave, still never show it.
- **Program Overview closes when a session starts (I).**
- **Weekly volume: no "0" bar (J).** A week whose sessions have no counted set (for example a test day ended after one ramp set) is left empty.
- **Guide and Settings copy (H).** See the list below.

Copy changes in round 9 (every one):
1. Settings, Bodyweight subtitle: "Daily weigh-ins (logged automatically with sessions)" → "Weigh-ins you log here by hand". The app has never logged a weigh-in when a session completes.
2. Guide, Settings — Do This First, Bodyweight: added "A weigh-in is saved only when you tap Log; finishing a session does not add one."
3. Guide, Settings — Do This First: two new one-line paragraphs, "Training Profile: …" and "Coach Actions: …", pointing to their Guide sections.
4. Guide, Dashboard, Readiness card: "what the app does at that score: …" → what that check-in did to its session, the fallback for older check-ins, and the one-decimal rule.
5. Guide, Timeline Bar: added "The chart closes when a session starts."
6. Guide, If You Need to Leave Mid-Workout: a new paragraph on Cancel workout and End early.
7. Guide, History Tab, Weekly Summary: added the one tonnage rule.
8. Guide, History Tab, Sparklines: "chart the TM (green), volume (blue) and readiness (amber) per lift" → "chart the TM per lift (green) and readiness (amber); volume is in the Weekly volume chart, which has a lift filter."
9. Guide, History Tab, Weekly volume: added the week with no counted set.
10. Guide, Accessories, Exercises you added: added the "Loaded on a barbell" switch.
11. Guide, Coach and Hermes, What goes to Hermes: added "A test day ended early before its test is reported to Hermes the same way as a skipped test."
12. Screen text: every string quoted in the bullets above; the confirmation "Cancel workout?" with "No set is logged, so nothing is saved: no History entry, and <lift> stays due this week. The readiness check-in for this session is discarded too."; the toast "Workout cancelled."; the chart note "No counted sets in this range."; the label "Loaded on a barbell".

## Round 10 (decided 2026-11-12): round 9 follow-ups
No new saved field. Training maths, readiness thresholds, progression, flags and the packet shape are unchanged. One thing leaves the screen: the readiness score inside the coach summary (below).

- **Readiness score in the coach summary and digest (A).** A score that is not whole shows one decimal there too: "Readiness 7.5/30, volume trimmed." where it read "Readiness 8/30, volume trimmed." This sentence is saved on the session and sent to Hermes as a coach note, so both change for new sessions with a half score. Whole scores: unchanged, byte for byte. Sessions already saved keep the text they were saved with. The coach digest's per-session readiness reads 7.5 in place of 8; its trend label, the `readiness_downtrend` flag and the deload assessment still work on the whole score, so none of them moves.
- **Readiness card (B).** "An extra set was offered and declined." → "No extra set was taken."
- **Weekly Summary (C).** "Total Sets" leaves out lead-in sets as well as ramp sets, so it agrees with the tonnage beside it and with the Session Log rows (example from the test data: 12 before, 8 now, for two sessions the Session Log shows at 4 sets each). "Avg Readiness" shows one decimal when the average is not whole (19.5/30 where it read 20/30).
- **Weekly Plan tag (D1).** A test day ended early before its test is tagged "TEST NOT DONE". A skipped test is still tagged "SKIPPED TEST".
- **Weekly volume (D2, D3).** A week whose counted sets add up to zero (for example sets logged with 0 reps) is left empty, like a week with no counted set. The line under the chart reads "Weeks with no sessions or no counted sets are left empty."
- **Tidy-up (D4).** Three CSS rules and one SVG gradient that only the retired volume sparklines used are removed. Nothing referenced them.

Copy changes in round 10 (every one):
1. Coach summary: the readiness score with one decimal when not whole.
2. Readiness card: "An extra set was offered and declined." → "No extra set was taken."
3. Weekly Plan: "⚠ TEST NOT DONE" for a test day ended early (was "⚠ SKIPPED TEST").
4. Weekly volume hint: "Weeks with no sessions are left empty." → "Weeks with no sessions or no counted sets are left empty."
5. Guide, Dashboard, Readiness card: "an extra set taken or declined" → "an extra set taken or not taken".
6. Guide, History Tab, Weekly Summary: added "Total Sets counts the same sets, so it agrees with the Session Log rows. An average readiness that is not a whole number shows one decimal."
7. Guide, History Tab, Weekly volume: added "or whose counted sets add up to zero".


## Round 11 (approved 2026-11-12): three display fixes
Display only. Nothing saved, calculated or sent to Hermes changes. Version stays 15.0.0.

- **Readiness Trend heading (A).** The card in Progression follows the rule used everywhere else since round 9: a whole score reads "18/30" (was "18.0/30"), any other "7.5/30". The change beside it follows the same rule: "+3" (was "+3.0"), "+1.5", "-1.5", and "0" at no change (was "0.0"). The sessions counted and the curve are unchanged.
- **"1 set" (B).** A count of exactly one set reads "1 set": Session Log rows and the calendar's day rows ("1075 lb tonnage · 1 set"), the volume status card ("Current: 1 set", and its MEV tooltip), the accessory help sheet ("1 working set") and the fatigue card in a session ("3 → 1 working set"). Every other count, and every "x of y sets" phrase, is unchanged.
- **Start Workout on narrow phones (C).** Below 390 px wide the Start and Skip buttons sit directly under the lift chips, followed by the weight preview, the last-session block and the phase description. At 320×700 Start's bottom edge moves from 779 px (under the tab bar, which starts at 635) to 448 px. No text is hidden and no control or text is smaller. 390 px and wider are unchanged, pixel for pixel. CSS only.

Copy changes in round 11 (every one):
1. Readiness Trend: score and change without ".0" when whole.
2. "1 sets" → "1 set" in the five places above.

## Round 12 (approved 2026-11-13): Start-first layout up to 430 px
Layout only. Nothing saved, calculated or sent to Hermes changes. Version stays 15.0.0.

- **Start Workout on phones up to 430 px wide (A).** The round 11 order (title, lift chips, Start and Skip, weight preview, last-session block, phase description) now applies to every width up to and including 430 px; it stopped at 389 px. At 390×844 Start's bottom edge moves from 737 to 871 px depending on the state (under the tab bar, which starts at 779, in the test week, the deload week and when "Last session for this lift" shows) to 452 px in every state. No text is hidden and no control or text is smaller. 431 px and wider, and everything below 390 px, are unchanged. CSS only: one number in one media query.

Copy changes in round 12: none.

## Round 13 (owner GO 2026-11-13): Hermes is told when a session was ended early
Nothing saved or calculated changes. Version stays 15.0.0.

- **Ended early, in the session packet (A).** When a session is ended early, the packet sent to Hermes after it now says so: how many sets were done, how many the day had (the same two numbers as the "Ended early: x of y sets" label, so a readiness-reduced day counts its dropped sets as planned) and the reason picked, or none. Before, Hermes saw only a shorter list of sets and could read a session ended after 3 of 10 sets as a 3-set day. The coach review request for that session carries the same field. A session completed normally sends exactly what it sent before. The backfill and weekly packets and the coach chat are unchanged. Bridge contract stays 1.1.

Copy changes in round 13 (every one):
1. Settings → Hermes, the sentence on what a packet holds: "…notes and accessories." → "…notes and accessories, and whether you ended the session early."

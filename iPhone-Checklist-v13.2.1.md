# Juggernaut 13.2.1 — iPhone checklist

Use Juggernaut in one place at a time: the home-screen app or one Safari tab. This is a manual checklist, not a record of completed device testing. Exporting a backup before upgrading remains recommended.

Before you install
☐ 1. In 13.2.0: History → Export. Save the file to Files.

Install
☐ 2. Replace the HTML on GitHub Pages. Swipe the home-screen app closed, then reopen it.
Expect: header says "v13.2.1 — Data Safety".
If it still says 13.2.0: open the page in Safari, reload, then reopen the home-screen app.

Your data
☐ 3. Look at Workout, History and Settings.
Expect: same week, same maxes, same number of workouts.
☐ 4. History tab.
Expect: an "Export recovery copies" button (your 13.2.0 copy is kept).
☐ 5. Tap Export recovery copies.
Expect: a file downloads. It never contains your AI key.

Import and undo
☐ 6. History → Import → pick the backup from step 1 → Import.
Expect: "Imported. To undo, use History → Undo import."
☐ 7. Tap Undo import → Restore.
Expect: "Import undone." Everything looks the same.

Units (don't convert your real data)
☐ 8. Settings → Units → kg.
Expect: a choice of Convert / Keep numbers / Cancel. Tap Cancel — it stays lb.

Workout
☐ 9. Start today's workout. Tap the timer to pause it. Swipe the app closed, reopen.
Expect: the workout resumes and the paused timer shows the time so far (not 0:00).
☐ 10. Resume the timer and finish the main lift.
Expect: the summary Duration leaves out the paused time.
☐ 11. Continue to Accessories. Swipe the app closed, reopen.
Expect: the accessory screen comes back.
☐ 12. Accessories tab → pick a different lift → back to Workout → Swap an exercise on the workout card.
Expect: "Swapped to …".
☐ 13. Log an accessory, then Re-log it.
Expect: "Log updated." (one entry, not two).
☐ 14. Finish Full Session.
Expect: back to the dashboard. Tier 1 weights change only if the week turned over.

Other
☐ 15. Accessories tab → delete an accessory → tap Undo within 6 seconds.
Expect: it's back in the same spot.
☐ 16. Coach tab → send a message.
Expect: the AI replies as before.
☐ 17. With the app open, turn on Airplane mode and log a set.
Expect: it saves with no warning.

If anything looks wrong: History → Export recovery copies, then History → Export, and send both files.

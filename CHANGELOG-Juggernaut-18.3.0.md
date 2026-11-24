# Juggernaut v18 — build 18.3.0

Built on **Juggernaut 18.2.0 (packet r3)** with 21 surgical, reversible patches. All 31 protected training-math, progression, storage, and Hermes packet functions remain byte-identical to 18.1.0, and all 7 embedded Olivia tour video clips remain untouched.

## What changed

### iOS Safari & Touch Hardening
- **Hardened "Watch this" tour seeking:** Appends `#t=<seconds>` media fragments and re-verifies the seek once on `playing` so iOS Safari lands on the exact chapter moment without resetting to `0:00`.
- **Wider `+1` tap target:** Widened the `+1` bonus set pill (`min-width: 40px`) with an expanded hit area (`inset: -8px -4px`) without changing Home card height.
- *(Viewport `maximum-scale=1` was intentionally left untouched per request.)*

### UI Updates & Visual Upgrades
- **No duplicate Start button on Home:** An `IntersectionObserver` hides the sticky bottom Start bar (`#v17Strip`) whenever the main card's Start button is already visible, sliding it back in as you scroll down.
- **Synced caption strip below the tour video:** Displays live spoken captions from `tour-timings.json` cleanly below `<video>` so native controls never obscure captions.
- **Bottom-anchored toasts:** Toasts now anchor cleanly above the bottom nav bar instead of overlapping the Progress hero total or Home lift tiles.
- **Tap-to-explain visual affordances:** Subtle dotted underline on `% of TM` and a small `?` indicator on the readiness bar.
- **Daylight / Auto Light-Dark theme:** Added a **Dark / Light / Auto** selector in Settings (`settings.ui.theme`) driving a high-contrast daylight palette via CSS tokens (`html[data-theme="light"]`) and updating `<meta name="theme-color">`.
- **Phase hairline tint, Progress clarity & micro-interactions:** Subtle top-edge phase hairline on Home (`accumulation`, `intensification`, `test`, `deload`), `% of goal` indicator and brighter progress bars on Progress, and gentle expand/tap animations (respecting `prefers-reduced-motion`).

### Rounding Out 18.2.0 Features
- **Edit cues & permanent setup from Home:** Inline editor right on the Home lift card so you don't have to wait for the finish screen.
- **Separate permanent Lift Setup (`settings.setup`) from temporary Form Cue (`settings.cues`):** Rack heights, pins, and belt holes stay saved permanently on Home, Warm-up, Rest Timer, and Finish screens even when you clear a temporary form cue.
- **Show cue & setup in Rest Timer:** Displays your active cue and setup inside the Rest Timer's **Up next** card (works on resumed workouts too).
- **Tighter Progress scorecard:** Excludes test-day ramp/lead-in sets from **Heaviest lifted** and surfaces **Best est. 1RM** when a higher-rep set beats the heaviest raw-weight set's estimated 1RM.

### Gym-Floor Quality-of-Life
- **Rest timer overtime + 3-2-1 pips + visual pulse:** Soft countdown pips at 3-2-1 seconds, visual ring pulse at `0:00`, and a live **overtime counter (`+0:01`, `+0:15`…)** until you tap Done.
- **Edit session notes in History:** Inline **Edit note / + Add note** button on every History card (zero impact on training math).
- **One-tap CSV export:** **Export CSV** button beside JSON Export in History, exporting `date, lift, cycle, wave, week, phase, set_index, role, weight, units, target_reps, performed_reps, e1rm, readiness, notes`.

## Verification Notes
- All static, reversibility, `node --check`, CSP, clip-identity, and 31 protected-function byte-identity checks pass (`build/tools/verify183.py`).
- **Not tested in Safari / iPhone / iPad:** As with 18.2.0, run a quick iOS Safari pass (tap-to-explain, "Watch this" seek + captions, Light theme, Setup/Cue editing, Rest Timer overtime, and CSV export) before publishing to GitHub Pages.

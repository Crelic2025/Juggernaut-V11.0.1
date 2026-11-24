# Juggernaut v18 — build 18.4.0

Built cleanly on **Juggernaut 18.3.0** (preserving all 18.3.0 upgrades and audit fixes). **Home Screen, Cycle Map, all 7 Olivia tour clips, CSP, `maximum-scale=1`, and all 31 protected math/training/Hermes functions remain untouched.**

## What changed

### Active Workout — “Under the Bar” Focus Mode
- **Top Laser Session Progress Bar & Live Tonnage HUD (`#v184SessHud`):** Pinned at the top of active workouts, showing `Set X of Y`, live lifted tonnage, and a glowing blue-to-emerald progress bar.
- **Spotlight Active Set Card & Dimmed Completed Sets:** Subtle blue radial spotlight and crisp accent rim on `#swipeZone` with oversized tabular numbers; completed sets dim gently so the current set stands out immediately.

### Finish Screen — Milestone Trophy Celebration & Trend
- **Metallic Sheen Trophy Card:** Animated diagonal light sweep and radial emerald glow on `.v182-goal-hit` (respecting `prefers-reduced-motion`).
- **Lightweight Ribbon Confetti:** Fires briefly only on real milestones—first time lifting a goal weight or earning a test-week `TM ↑`.
- **Recent Est. 1RM Mini-Sparkline (`#v184FinTrend`):** Displays your lift’s recent estimated 1RM progression and delta directly on the finish screen (whenever ≥2 sessions are logged).

### Native iOS Frosted Sheets, Warm-up Plate Diff & App-Wide Depth
- **Frosted Glass Bottom Sheets:** Blurred backdrop (`backdrop-filter: blur(10px)`) and translucent vibrancy glass cards (`backdrop-filter: blur(22px) saturate(165%)`) on `.modal.bottom-sheet` in both Dark and Daylight Light themes.
- **Warm-up Plate-Change Diff Badge (`#v184WuDiff`):** Shows exactly what plates to load, add, remove, or swap per side between warm-up steps (`Add 25 / side`, `Swap 25 → 45 / side`).
- **Top Safe-Area Fade Scrim & OLED Card Depth:** Subtle gradient scrim across `var(--safe-t)` so scrolled content never clashes with the iOS status bar, plus subtle top specular highlights on non-Home cards.

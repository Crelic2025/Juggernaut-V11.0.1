# Juggernaut v16.0.1 — November 15, 2026

Exact supplied candidate, published without application-code edits.

HTML SHA-256: `7f3162d21a632d5f92d119609174feb940ed123839aff926d7594b1d3b557813` (996555 bytes).
Previous published release: v16.0.0 r3, commit `b6faff666ccc275279e5e53f41252865d472ec34`, SHA-256 `d587eac87a7e302ae742091581b91c6f277330639d48b677cd2464a9bbac47fc`.

## Changes
- Restart with new maxes in Settings → Cycle and history: enter lift 1RMs, choose keep or wipe history, and confirm. Unedited lifts retain their training maxes. Keep starts the next cycle; wipe uses the existing wipe/export-confirmation flow.
- Brighter teal palette, refreshed wave colours, and Sora 800 for the prominent weight numbers. Existing offline font fallback remains.
- Three-button confirmations keep labels unwrapped and place the primary choice on its own row; messages preserve line breaks.
- Previewed weekly plans retain the previous wording. Settings navigation no longer depends on the optional v16 UI binding layer; individual bindings are contained.
- Bridge wire contract remains exactly 1.1. No new packet/event type, persistent field or storage key. No bridge service/configuration changes.

## Independent verification
Claude Fable 5.2 performed separate source review and restart-test development. Hermes independently ran the returned packet checks and final restart suite.

- Safe archive inventory and all 91 supplied checksums passed; bundled published baseline matched the live site.
- Rebuild reproduced exact HTML; extracted inline JavaScript syntax passed.
- All 16 packet scripts executed successfully after a dependency-path correction and a complete rerun of an operator-timeout-interrupted check. Fault-injection result: 42 functions, zero failures.
- Built-in self-test: 90/90.
- Baseline behaviour comparison: MATCH; 77,048 math cases in 12 sections (zero differing sections), 14 persisted-state stages (zero differences), 165 visible-number captures (zero differences), equal final save revisions (48). Both builds retained the same two distinct console-error entries in this harness; this is not a zero-console-error claim.
- Full-cycle UI run: 64/64 sessions, next-cycle transition, 127 synthetic history records, no page errors or reported problems. Existing CSP meta notice remains.
- Upgrade checks from v15 and published v16.0.0 preserved 79 synthetic sessions, device state, backups, TMs and program, and created pre-upgrade recovery copies.
- Independent restart suite: **74 checks: 71 passed, 3 failed, 8 classified observations**. Hermes reproduced the verifier's exact failed IDs: V.5, V.7, S.6. These are documented limitations, not green tests.
- Human-paced keep/wipe/cancel flows, valid-input schema checks, event order, final snapshots and stale-result handling passed. Double-tap probes at 440×956 and 320×568 did not skip the final confirmation at tested intervals.

## Known limitations and practical guidance
- Use realistic lift maxes. The new sheet accepts very small positive 1RMs: 0.56 can save TM 0.5, which normalizes to an older/default max on reload; 0.005 can save TM 0 and create two schema-invalid packets. Existing Settings has the same underlying low-TM handling. A minimum-valid-TM guard is a follow-up, not included here.
- Retyping a displayed rounded 1RM in another textual form (288.9 → 288.90) can propose TM 260.01 instead of 260; display rounding hides the hundredth. Leaving it untouched retains the TM.
- With several changed lifts, intermediate `tm_edited` packets contain snapshots from that point in the edit sequence, unlike Settings' all-edits-first snapshots. They validate for normal inputs; event details/order, final `tm_edited`, cycle/wipe packets and final state match the equivalent two-step flow. Do not claim every intermediate packet is byte-identical.
- The restart sheet is absent from the keyboard focus-trap list; hardware keyboard/screen-reader focus may reach controls behind it. Touch use was the practical release focus.
- On keep-history restarts, missed-standard streaks/TM-cut gates survive; pending test results survive if their lift's TM is unchanged, and become stale if it changes. This matches the previous two-step flow.
- Wipe saves before applying new maxes; interruption between those saves leaves the intended wipe completed with old maxes, requiring re-entry. Code rollback cannot restore deliberately wiped workout history.
- Previous release limitations remain unless explicitly superseded here. Single-window use and regular exports remain recommended.

## Coverage boundaries
Desktop Chromium/headless Chrome with synthetic data and isolated mock bridges only. Real iPhone/Safari, installed-PWA update/cache behaviour, real bridge workout delivery, offline first launch, screen-reader acceptance and cross-window concurrency are not certified. The independent restart suite did not exercise kg; packet checks included a kg layout fixture. The live bridge's authenticated health passed separately, but health is not sync delivery.

Before upgrading when possible, export a backup. Do not clear browser storage or reinstall to troubleshoot sync. Preserve the existing GitHub Pages/Home Screen URL. Previous public commit above is the code rollback point; browser workout data requires its own export/recovery copy.

# Juggernaut v16.0.0 — revision 3

Approved for release November 14, 2026. This is the exact r3 HTML, not a post-review rewrite.

- SHA-256: `d587eac87a7e302ae742091581b91c6f277330639d48b677cd2464a9bbac47fc`
- Previous published baseline: v15.0.0, commit `d16eaa1`, HTML SHA-256 `f876b1ffcd7b59d34c0514cf81496006509a531948174fd52600c460fd471670`.
- Repository name and Pages/Home Screen URL are unchanged.
- Bridge contract remains 1.1. No bridge service, credential or live workout database is shipped or changed by this frontend release.

## Changes

Presentation redesign with the approved next-lift selection rule; preserves the v15 program table and training-max rule. Revision 3 adds containment around v16 display helpers, small-screen layout corrections, landscape timer visibility, accurate Guide wording, Weekly Plan wording consistency, dashboard weight-class refresh and guarded scrolling. Revision 2's final-rest display and completed-week logged-weight corrections remain included.

## Verification and acceptance

- Claude Code verifier and read-only reviewer used Fable 5.2. Both reported no release blockers. Mechanical publication and documentation were separately authorized on Hermes's current model; no app code was changed for publication.
- Packet checks: 12/12 passed on the verification Mac, including the builder's 42-function fault-injection script. Build reproduction was byte-identical.
- Independent round14: **336 checks, 329 passed, 7 failed**, reproduced by Hermes. This is not an all-green test result; the accepted exceptions are below.
- Verifier self-check: 42 cases as required (6 controls and 36 deliberately broken copies caught); this is the verifier's report, not an independently repeated self-check.
- Hermes's v15-to-r3 behavior diff: MATCH.
- Hermes completed rounds 5, 6, 8, 9, 10, 11, 12 and 13 on r3: respectively 115, 89, 297, 152, 162, 109, 211 and 206 passed, zero failed in each. Separately classified by-design/retired assertions are not counted as behavioral passes. Ambiguous/not-tested counts respectively: 2/0, 0/0, 4/0, 3/3, 2/4, 7/6, 1/3, 1/3. Round 7 is not a separately executed suite in this batch.
- Verifier's whole-cycle comparison: 50 packets and 43 review requests identical apart from app version, identical saved state, save counters 650/650.
- All 11 r2 fault-containment failures pass on r3. The no-fault r2/r3 comparison matched in 19,665 cases.
- Guide wording checked over 1,368 cases; Weekly Plan wording checked across 7,938 states.

## Seven accepted round14 failures

- `N.11.text`, `N.11.number`: malformed-date behavior inherited from v15's sort. The broad claim was narrowed rather than changing v15 logic.
- `O.8`: Done overlaps the tab bar by 12 px at 375x667 in the 1000 lb test setup. Ordinary tested training maxes 200–700 clear it; the 440x956 simulated layout clears it.
- `S.8`: Today week strip is hidden at 320x568; the Program grid remains available.
- `F.v16Safe.core`: replacing the safety wrapper itself with a throw prevents startup.
- `F.v16Bind.tabs`, `F.v16$.tabs`: injected binding/helper failure prevents Settings from opening. Other tested session/save flow works.

No natural triggering input was found for the three injected-fault cases. This does **not** prove such failures are impossible, or that every user workflow/device is unaffected.

## Coverage limits and upgrade precautions

Chromium and isolated/stub testing do not establish physical iPhone/Safari, installed PWA, screen-reader, share-sheet, offline-first-load, real-bridge or OpenRouter acceptance. Short-phone layouts with additional dashboard cards and kg were not fully covered. Landscape Done still requires scrolling, as on the baseline. Preserve a data export and use one app window; this release does not certify all historical concurrency/storage risks as fixed.

## Rollback

The previous v15 HTML remains available from Git commit `d16eaa1`. Restore its exact `index.html` in a new forward commit if an approved rollback is needed; do not rewrite history. A frontend rollback does not roll back browser workout data—preserve exports and inspect compatibility separately.

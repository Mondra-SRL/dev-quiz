# Initial visual baseline

- Source branch: `modern-css-implementation`
- Baseline date: 2026-08-12
- Build: passed with Vite 8.0.16
- Lint: passed
- Unit tests: 20 passed
- Browser screenshot capture: pending

These captures represent the approved pre-modernization visual implementation.

## Viewports under test

| Viewport | Dimensions (CSS pixels) | Coverage focus |
|---|---:|---|
| Desktop | 1440 x 900 | Full desktop composition and multi-column layouts |
| Tablet landscape | 1024 x 768 | Wide layouts within a shorter viewport |
| Tablet portrait | 768 x 1024 | Responsive spacing and uncrowded controls |
| Mobile | 390 x 844 | Single-column layout, reachable actions, and no clipping |

Every screen and state below must be captured at all four viewports.

## Screens and states

| Screen or state | Required checks |
|---|---|
| Home | Topic grid, topic labels, paper card, and primary action |
| Quiz | Quiz metadata, answer layout, and actions |
| Results | Score ring, result copy, and actions |
| Quiz validated | Feedback, explanation, and next action remain visible and reachable |
| Exit modal | Dialog content and actions fit without clipping |

## Capture checklist

- [ ] `home-desktop.png`
- [ ] `home-tablet-landscape.png`
- [ ] `home-tablet-portrait.png`
- [ ] `home-mobile.png`
- [ ] `quiz-desktop.png`
- [ ] `quiz-tablet-landscape.png`
- [ ] `quiz-tablet-portrait.png`
- [ ] `quiz-mobile.png`
- [ ] `results-desktop.png`
- [ ] `results-tablet-landscape.png`
- [ ] `results-tablet-portrait.png`
- [ ] `results-mobile.png`
- [ ] `quiz-validated-desktop.png`
- [ ] `quiz-validated-tablet-landscape.png`
- [ ] `quiz-validated-tablet-portrait.png`
- [ ] `quiz-validated-mobile.png`
- [ ] `exit-modal-desktop.png`
- [ ] `exit-modal-tablet-landscape.png`
- [ ] `exit-modal-tablet-portrait.png`
- [ ] `exit-modal-mobile.png`


Use the viewport dimensions and accessibility checks defined in
`docs/css-modernization.md`. Do not mark this baseline approved until every required image has been reviewed.

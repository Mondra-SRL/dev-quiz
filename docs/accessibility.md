# Accessibility

DevQuiz targets WCAG 2.2 AA. Accessibility behavior is implemented in shared tokens and components so every screen receives the same baseline.

## Keyboard and focus

- Every interactive control uses a persistent 2px `:focus-visible` outline with a 3px offset; focus never relies on color change or box shadow alone.
- Buttons have a minimum 44px touch target and default to `type="button"`.
- Each screen begins with a visible-on-focus “Skip to main content” link and exposes one focusable `<main id="main-content">` landmark.
- Radio-card focus is drawn on the visible label rather than the visually hidden input.

## Exit modal

- Opening the modal focuses **Continue Quiz**.
- `Tab` and `Shift+Tab` are contained within the dialog.
- `Escape` dismisses the dialog and continues the quiz.
- The quiz screen is `inert` while the modal is open, preventing pointer, keyboard, and assistive-technology access to background controls.
- Dismissing the modal restores focus to the Exit Quiz trigger when it still exists.


## Contrast and non-color cues

Semantic accessibility tokens live in `src/styles/variables.css`.

| UI text | Foreground/background | Contrast |
|---|---|---:|
| Primary button | Merino / accessible olive | 5.38:1 |
| Secondary action | Accessible mauve / primary surface | 5.89:1 |
| Tertiary action | Brown / primary surface | 5.23:1 |
| Link/focus olive | Accessible olive / canvas | 4.65:1 |

- Correct and incorrect answers include visible ✓/× markers, thicker leading borders, and visually hidden status text; meaning does not depend on green/red alone.
- Selected quiz topics use a badge, thicker border, and screen-reader text in addition to color.
- Links retain underlines.

## User preferences

- `prefers-reduced-motion: reduce` minimizes transitions and disables smooth programmatic scrolling.
- `prefers-contrast: more` strengthens text, borders, focus, and action colors.
- `forced-colors: active` uses system colors for focus, buttons, dialogs, cards, answer states, and progress UI.
- The shared `.visually-hidden` utility uses both `clip` and `clip-path` while preserving content in the accessibility tree.

## Performance-related accessibility

- Fraunces and Space Mono are self-hosted as WOFF2 files with `font-display: swap`; the app does not depend on Google Fonts.
- Timer progress animates with `transform: scaleX()` instead of layout-changing width animation.
- Responsive breakpoints use `em` units so layouts respond to user font-size settings.

Manual checks before release:

1. Navigate every control using only `Tab`, `Shift+Tab`, Enter, Space, and arrow keys.
2. Open the exit modal, verify initial focus, focus containment, Escape dismissal, and focus restoration.
3. Confirm the timer continues and expiration reaches Results while the modal is open.
4. Test at 200% browser zoom and a narrow viewport without horizontal scrolling.
5. Test reduced motion, increased contrast, and Windows High Contrast/forced-colors modes.
6. Verify screen-reader announcements for topic selection, answer status, timer milestones, dialog content, and results.

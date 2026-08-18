# DevQuiz CSS Modernization Guide

## Goal

Update the CSS without changing the approved DevQuiz design. The work should
make styles easier to maintain and layouts more reliable on different screen
sizes, with long content, and at 200% zoom.

Small UI fixes are allowed when they correct a real layout problem. Document
them so they are not mistaken for regressions.

## CSS feature rules

Use CSS features marked
[Baseline Widely available](https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility)
by MDN. These features work across current Chrome, Edge, Firefox, desktop
Safari, and iOS Safari.

Use:

- CSS custom properties
- Flexbox, Grid, and `gap`
- logical properties such as `padding-inline` and `margin-block`
- `calc()`, `min()`, `max()`, and `clamp()`
- standard media queries
- `:focus-visible`
- reduced-motion, increased-contrast, and forced-colors media queries
- global cascade layers

Add a fallback before a dynamic viewport value:

```css
.canvas {
  min-height: 100vh;
  min-height: 100dvh;
}
```

Use an existing color token or an `rgba()` value instead of `color-mix()` when
the result is the same.

## CSS structure

Global styles use four cascade layers:

```css
@layer reset, tokens, base, utilities;
```

| Layer | Contains |
|---|---|
| `reset` | Box sizing and browser default resets |
| `tokens` | Colors, spacing, typography, borders, and shadows |
| `base` | Fonts, body, headings, links, code blocks, and `#root` |
| `utilities` | `.skip-link`, `.visually-hidden`, and similar helpers |

Keep component and screen `*.module.css` files outside these layers. CSS
Modules already separate their styles and should override global defaults.

Do not add `components`, `screens`, `states`, or `overrides` layers. Keep
component states and responsive rules in the related CSS Module.

Global reduced-motion and forced-colors rules may stay outside the layers when
they need to override component styles.

## Implementation steps

1. Group custom properties into primitive and semantic tokens.
2. Remove unused tokens and define any missing tokens.
3. Move global rules into the four agreed layers.
4. Replace physical properties with logical properties where useful.
5. Replace unnecessary fixed sizes with flexible sizing.
6. Add safe wrapping and overflow rules for long content.
7. Keep focus, reduced-motion, contrast, and forced-colors behavior working.
8. Compare the result with the approved screenshots.

## Visual baseline

The initial screenshots and capture checklist are stored in
`docs/visual-baselines/initial/`.

Test every required screen and state at these viewports:

| Viewport | Size |
|---|---:|
| Desktop | 1440 x 900 |
| Tablet landscape | 1024 x 768 |
| Tablet portrait | 768 x 1024 |
| Mobile | 390 x 844 |

Required screens and states:

- Home
- Quiz
- Quiz validated
- Results
- Exit modal

Name screenshots using `<state>-<viewport>.png`, for example:

- `home-desktop.png`
- `quiz-validated-tablet-portrait.png`
- `exit-modal-tablet-landscape.png`
- `exit-modal-mobile.png`

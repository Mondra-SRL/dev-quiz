# DevQuiz Layout and UI Specifications

**Source:** Figma file `Quiz-App`, page "UI Design" that contains Home, Quiz, and Results frames plus the Exit Confirmation modal. [Link](https://www.figma.com/design/bjSH4xpgWptKjggpjRC2y6/Quiz-App?node-id=4-31&p=f&t=zNJawqOzk5e19gVk-0)

**Scope:** Layout structure and UI component patterns, which control type is used for each element and where it sits in the screen.

**Out of scope:** Final styling, colors, typography, spacing, **and responsiveness**. This document describes the layout and pattern decisions.

---

## 1. Global Layout Framework

Every screen is a single centered content panel on a background canvas, with a small decorative triangular motif at opposing corners.

- **Content panel:** one centered card holding all screen content. Children stack in a single vertical column, center-aligned, with consistent gaps between sections.
- **Header:** the `< devquiz >` logo appears at the top of every screen. The Quiz screen extends the header with a timer, progress bar, question counter, and exit control (see §3).
- **Body:** a single column. The only multi-element grids are the topic selector (Home) and the answer options (Quiz).

---

## 2. Home Screen

Order: header (logo + copy) → topic selector → "Start Quiz" button.

### 2.1 Topic Selector — **Decision: selectable cards in a grid**

Cards, not a dropdown, radio list, or plain button row. Each topic is a card containing a topic icon and the topic name.

- **Selection model:** single-select. The chosen card gets a distinct selected treatment plus a check badge pinned to its top-right corner.
- **Affordance:** the whole card is the target; a hover state exists.

**Rationale:** cards give a large touch/click target and a clear visual identity per topic — a dropdown or button row can't do that as cleanly.

**Implementation:** each card is a `<label>` wrapping a visually hidden `<input type="radio">`. The radio group provides native single-select semantics and keyboard navigation; the card visual state is driven by the `:checked` pseudo-class on the input.

### 2.2 Header / Copy

Centered column: logo, a display heading, and a one-line subtitle/instruction.

### 2.3 Start Quiz Button — **Placement: below the grid, centered**

A single primary button ("START QUIZ" + arrow), centered beneath the topic grid. It is the only primary action on the screen. The button is disabled by default and becomes enabled once a topic is selected.

- **Mobile UX:** selecting a topic scrolls the Start button into view so the primary action remains reachable on smaller screens.

---

## 3. Quiz Screen

Order: quiz header → topic context → question → answer options → feedback → Next button.

### 3.1 Timer — **Placement: header, top-right**

A clock icon + countdown, right-aligned on the same row as the logo.

- A single global countdown applies to the complete quiz.
- If the timer expires before the final question is completed, the quiz ends and Results is displayed with an expired status.

### 3.2 Topic Context — **Placement: below the progress bar, left-aligned**

A single inline row serving as the quiz title and displaying the selected topic so the user always knows which quiz they are in. Layout: `[icon] [name] > [description]`

- **Icon:** the topic artwork image in a small bordered square.
- **Name:** the topic name in uppercase text.
- **Separator:** a `>` character between name and description.
- **Description:** a short one-line topic description (e.g. "the standard markup language for structuring web page content using elements and tags.").

### 3.3 Timer Progress Bar — Placement: directly below the header row, full width

A full-width pill track with a fill segment indicating the remaining quiz time. The bar decreases as the global countdown timer decreases.

### 3.4 Question Counter — **Placement: row below the progress bar, left**

"QUESTION X OF Y", left-aligned, opposite the Exit control. `Y` is the total number of questions in the current quiz.

### 3.5 Question Presentation — **Decision: text block in the main container, not a bordered sub-card**

The question is a heading-level text block sitting directly in the panel. It is *not* wrapped in its own card or bordered box, keeping visual weight on the answers.

### 3.6 Answer Options — **Decision: lettered option tiles in a grid**

Each option is a bordered, rounded tile containing a letter chip (A/B/C/D in its own boxed token) plus the answer text.

- **Selection model:** single-select; selecting an option immediately validates the answer and reveals feedback. There is no separate Submit button.
- **States:** default, hover, selected-correct, selected-incorrect. On an incorrect pick, the correct option is also highlighted.

**Implementation:** same pattern as the topic selector — each tile is a `<label>` wrapping a visually hidden `<input type="radio">`. After validation, a `data-state` attribute is set on each `<label>` to drive the post-validation visual states via CSS:

- `data-state="correct"` — the option the user picked and it is right
- `data-state="incorrect"` — the option the user picked and it is wrong
- `data-state="reveal"` — the correct answer, shown when the user picked wrong
- No attribute — untouched option

All inputs receive `disabled` after validation to lock the group.

### 3.7 Feedback & Explanation — **Placement: below the answer grid, above the Next button**

After answering, an in-flow feedback block appears (it pushes the Next button down; it is not an overlay):
1. **Status row:** an icon (correct/incorrect) + a status label ("CORRECT!" / the incorrect equivalent).
2. **Explanation:** a dashed-border box with a "Why:" prefix followed by a one-sentence explanation.

### 3.8 Next Question Button — **Placement: bottom of the body, centered**

A single primary button ("NEXT QUESTION" + arrow), centered below the feedback block. It is visible but disabled when a question first loads, then becomes enabled after the selected answer is validated. On the final question it advances to Results.

- **Mobile UX:** after answer validation, the screen should scroll the Next button into view so the action is accessible without manual scrolling.

### 3.9 Exit Quiz Button — **Placement: question-counter row, right**

A low-emphasis text control ("EXIT QUIZ" + close glyph), right-aligned opposite the counter. Opens the Exit Confirmation modal (§5).

---

## 4. Results Screen

Order: header (logo) → title → score gauge → result copy → Retake Quiz and Return Home buttons.

### 4.1 Results Summary Layout — **Decision: centered single column with a circular score gauge**

1. **Status title** — centered copy based on how the quiz ended: "Quiz completed!" after the final question or "Time's up!" when the timer expires.
2. **Score gauge** — a circular progress ring with the score as a fraction in its center ("7/10") above a "SCORE" label.
3. **Result copy** — a short headline ("Great job!") plus a one–two line encouragement paragraph.
4. **Actions** — Retake Quiz and Return Home buttons.

### 4.2 Results Actions — **Placement: bottom of the body, centered**

Two buttons sit side by side below the result copy:

- **Retake Quiz (primary):** a filled button ("RETAKE QUIZ" + arrow) that starts a new quiz session for the same selected topic without returning Home.
- **Return Home (secondary):** an outlined button ("RETURN HOME" + arrow) that routes back to Home.

---

## 5. Exit Confirmation Modal

- **Trigger:** "EXIT QUIZ" on the Quiz screen.
- **Type:** centered modal dialog over the screen; underlying screen is inert while open.
- **Timer:** the global countdown remains visible behind the modal and continues running while it is open.
- **Structure (single centered column):**
  1. **Logo.**
  2. **Message:** title "Are you sure you want to quit?" + body "Progress will be lost."
  3. **Buttons** — two full-width buttons **stacked vertically**:
     - **Primary / dismiss (filled, top):** "CONTINUE QUIZ →" — closes the modal and resumes the quiz. Emphasized action.
     - **Secondary / confirm (outlined, bottom):** "EXIT QUIZ →" — abandons the quiz and returns Home. De-emphasized.
- **Emphasis:** the safe action (continue) is dominant; the destructive action (exit) is de-emphasized and outlined. Buttons are stacked, not side by side.
- **Confirmed exit:** reset the current quiz state and return the user to Home.

---

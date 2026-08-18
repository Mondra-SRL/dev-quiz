# DevQuiz Architecture

This document describes DevQuiz's runtime boundaries, responsibility ownership,
state model, and shared data contracts. Product behavior, UI specifications,
accessibility, API research, setup, and project progress live in the referenced
documents.

## Architecture Overview

DevQuiz is a React/Vite application with state-based navigation between Home,
Quiz, and Results. `App.jsx` owns shared state, while `QuizScreen.jsx`
coordinates the active quiz session.

Questions come from QuizAPI through a server-side Vercel Function. If the API is
unavailable or returns unusable data, the app uses bundled topic-specific
fallback questions. Both sources pass through the same internal question
contract before a session begins.

The application has no database, authentication, local storage, or client-side
router. React state is the only state-management solution.

## System Boundaries and Dependency Flow

```text
User
  |
React screens and components
  |
App.jsx / QuizScreen.jsx state
  |
src/services/quizApi.js
  |
/api/quiz
  |
QuizAPI
```

When the external source fails validation or cannot be reached:

```text
QuizAPI unavailable or unusable
  |
src/data/fallbackQuestions/
  |
Shared question normalization and validation
  |
Quiz session
```

The browser communicates only with `/api/quiz`. The QuizAPI key is read by
`api/quiz.js` and is never exposed to frontend code.

See [QuizScreen Loading Flow](./quiz-screen-loading-flow.md) and
[DevQuiz User Flow](./user-flow.md) for detailed runtime flows.

## Repository and Module Structure

```text
api/
  quiz.js                 Server-side Vercel Function
src/
  App.jsx                 Shared app state and screen navigation
  main.jsx                React entry point
  screens/                Home, quiz, and results composition
  components/             Reusable presentation and interaction components
  services/               External data access and API mapping
  data/                   Topic configuration, messages, fallback questions
  utils/                  Pure validation, session, and timer logic
  config/                 Shared quiz configuration constants
  styles/                 Global styles and design tokens
  assets/                 Fonts, logos, icons, and topic artwork
```

Screens and reusable components compose UI. Pure calculations and data
transformations belong in `utils/` or `services/`, rather than being
duplicated in screen components.

## Runtime Responsibility Map

| Area | Owner | Responsibility |
| --- | --- | --- |
| Shared navigation and session summary | `App.jsx` | Screen, topic, score, total questions, status, shared actions |
| Active quiz session | `QuizScreen.jsx` | Loading, progression, validation, timer, exit confirmation |
| Home composition | `HomeScreen.jsx` | Topic selection and starting a quiz through callbacks |
| Results composition | `ResultsScreen.jsx` | Final state display and reset/retake actions |
| Reusable UI | `src/components/` | Focused visual units driven by props and callbacks |
| External question loading | `quizApi.js` | Requesting, mapping, validating, and returning API questions |
| Session preparation | `quizQuestionSession.js` | Shuffling questions, selecting session size, shuffling answers |
| Question contract | `normalizeQuizQuestion.js` | Normalizing and validating every question source |
| Timer calculations | `quizTimer.js` | Formatting, progress calculation, and announcements |
| Server-side API access | `api/quiz.js` | Reading the secret key and proxying QuizAPI |

Presentational components receive data and event handlers through props. They do
not own cross-screen state or communicate directly with QuizAPI.

## State Ownership and Navigation

`App.jsx` uses the screen values `home`, `quiz`, and `results`. It owns:

- `currentScreen`
- `selectedTopic`
- `score`
- `totalQuestions`
- `quizStatus` (`completed`, `expired`, or `null`)

`QuizScreen.jsx` owns active-session state:

- Prepared `questions`
- `currentQuestionIndex`
- `selectedAnswer`
- Validation state
- `secondsRemaining`
- Loading, error, and exit-modal state

The quiz screen reports score increments, prepared question count, completion,
expiration, and cancellation to `App.jsx`. A retake preserves
`selectedTopic` but creates a fresh session. Returning Home resets shared
quiz state. There is no React Router.

## Question Data Contract

All sources must be converted to this shape before use:

```json
{
  "id": "question-id",
  "question": "Question text",
  "answers": ["Answer A", "Answer B", "Answer C", "Answer D"],
  "correctAnswer": "Answer A",
  "explanation": "Explanation text"
}
```

The contract requires a non-empty ID and question, answer options, exactly one
matching correct answer, and a non-empty explanation after normalization.
Sources are validated as complete sets; the app does not start from partially
valid data. A source must provide at least the configured session size.

`quizApi.js` maps QuizAPI responses into this shape. Fallback questions are
authored in the same shape. Answer validation compares values rather than
indexes because options are shuffled before display.

See [QuizAPI Integration Guide](./quizapi-integration-guide.md) for upstream mapping,
pinned resources, review criteria, and fallback content rules.

## External Integration Architecture

1. `QuizScreen.jsx` requests questions for the selected topic.
2. `src/services/quizApi.js` calls `/api/quiz`, maps the response, and
   applies the shared validation contract.
3. `api/quiz.js` calls QuizAPI with server-side `QUIZ_API_KEY` and returns
   the upstream response.

Failed, empty, invalid, or undersized API data causes a fallback to the local
topic data. If neither source is valid, the app shows an error and does not
start the timer.

QuizAPI endpoint details and resource selection belong in
[QuizAPI Integration Guide](./quizapi-integration-guide.md).

## Styling Architecture Boundary

- `src/styles/globals.css` contains global reset and base styles.
- `src/styles/variables.css` contains shared design tokens.
- Component-specific styles live in co-located CSS Modules.
- Screen-level layout styles live in co-located screen CSS Modules.

See [CSS Modernization Guide](./css-modernization-guide.md) for CSS rules,
[Layout and UI Specifications](./layout-and-ui-specifications.md) for approved layout patterns, and
[Accessibility Guidelines](./accessibility-guidelines.md) for accessibility behavior.

## Testing Boundaries

Automated tests protect the boundaries where invalid data or pure logic could
break a session:

- Normalization tests protect the shared question contract.
- API service tests protect mapping, response validation, and source size.
- Fallback-data tests protect topic coverage and local question validity.
- Utility tests protect session preparation, shuffling, formatting, and timers.

Integration and manual checks should cover API-backed, fallback, completed,
expired, retake, and exit flows. Commands are documented in the
[README](../README.md); detailed flow diagrams are in [user-flow.md](./user-flow.md).

## Operational Constraints

- The API key remains server-side and must not use a `VITE_` prefix.
- API and fallback questions satisfy the same internal contract.
- The timer starts only after a valid prepared session exists.
- QuizAPI failure must not prevent play when fallback data is valid.
- The timer is cleaned up when a quiz ends, is cancelled, or unmounts.
- No quiz state is persisted after the application session ends.
- Navigation remains state-based rather than route-based.

## References

- [README](../README.md): installation, development, environment setup, and commands.
- [Product Requirements](./product-requirements.md): product goals, features, screen behavior, and MVP scope.
- [Layout and UI Specifications](./layout-and-ui-specifications.md): approved UI patterns.
- [QuizAPI Integration Guide](./quizapi-integration-guide.md): API research, quiz IDs,
  mapping, and fallback authoring.
- [QuizScreen Loading Flow](./quiz-screen-loading-flow.md): loading and fallback sequence.
- [DevQuiz User Flow](./user-flow.md): complete Home, Quiz, and Results journey.
- [CSS Modernization Guide](./css-modernization-guide.md): CSS layers, responsive rules, and visual checks.
- [Accessibility Guidelines](./accessibility-guidelines.md): keyboard, focus, contrast, and preference requirements.
- [Initial Visual Baseline](./visual-baselines/initial/README.md): screenshots and viewports.
- [Roadmap](./roadmap.md): implementation phases and project status.

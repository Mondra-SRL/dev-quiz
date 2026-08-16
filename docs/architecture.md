# DEVQUIZ - ARCHITECTURE

## OVERVIEW

DevQuiz uses a React frontend built with Vite and a lightweight Node.js Vercel Function backend proxy for QuizAPI requests. Users select a programming topic, complete a timed quiz, receive immediate answer validation, view feedback and explanations, and then see a final results summary. From the Results screen, users can retake the same topic without returning to Home.

MVP exclusions:

- No database
- No authentication
- No local storage
- No React Router

Core architectural decisions:

- `App.jsx` owns app-level navigation and shared quiz session state
- `QuizScreen.jsx` owns the active quiz session UI and local interaction state
- React state is the only state management solution
- QuizAPI access is isolated behind a Vercel Function, while `src/services/quizApi.js` communicates with the local `/api/*` endpoint
- QuizAPI is the primary question source, with bundled fallback/mock questions used when API data is unavailable or unusable
- Questions and answer options are randomized in the UI layer

## DEVELOPMENT ENVIRONMENT

Contributors must have the following installed to run the project locally:

- Node.js
- npm
- Vercel CLI (installed as a development dependency for local backend-proxy development)

All project dependencies should be installed and managed using npm.

Alternative package managers (Yarn, pnpm, Bun, etc.) are currently out of scope unless the team agrees otherwise.

Testing uses Node's built-in test runner via `npm test`.

## APP STRUCTURE

```txt
project-root/
|-- api/
|   `-- quiz.js
|-- docs/
|   |-- PRD.md
|   |-- accessibility.md
|   |-- architecture.md
|   |-- css-modernization.md
|   |-- mermaid.md
|   |-- quiz-screen-loading-flow.md
|   |-- quizapi-research.md
|   |-- roadmap.md
|   |-- specifications.md
|   `-- visual-baselines/
|       `-- initial/
|           |-- README.md
|           `-- *.png
|-- src/
|   |-- assets/
|   |   |-- fonts/
|   |   |-- png/
|   |   `-- svg/
|   |-- config/
|   |   `-- quiz.js
|   |-- components/
|   |   |-- AnswerOption/
|   |   |-- ArrowRightIcon/
|   |   |-- Button/
|   |   |-- ExitQuizModal/
|   |   |-- ExplanationBox/
|   |   |-- FeedbackMessage/
|   |   |-- FormattedText/
|   |   |-- QuestionCard/
|   |   |-- QuizSelector/
|   |   |-- ResultsCard/
|   |   |-- ScreenLayout/
|   |   `-- TimerBar/
|   |-- screens/
|   |   |-- HomeScreen/
|   |   |-- QuizScreen/
|   |   `-- ResultsScreen/
|   |-- services/
|   |   |-- quizApi.js
|   |   `-- quizApi.test.js
|   |-- data/
|   |   |-- fallbackQuestions/
|   |   |   |-- css.js
|   |   |   |-- html.js
|   |   |   |-- index.test.js
|   |   |   |-- javascript.js
|   |   |   |-- python.js
|   |   |   |-- react.js
|   |   |   |-- typescript.js
|   |   |   `-- index.js
|   |   |-- quizTopics.js
|   |   `-- resultsMessages.js
|   |-- utils/
|   |   |-- formatCodeBlock.js
|   |   |-- formatCodeBlock.test.js
|   |   |-- normalizeQuizQuestion.js
|   |   |-- normalizeQuizQuestion.test.js
|   |   `-- shuffleArray.js
|   |-- styles/
|   |   |-- globals.css
|   |   `-- variables.css
|   |-- App.jsx
|   `-- main.jsx
|-- .env
|-- .env.example
`-- .gitignore
```

See `docs/css-modernization.md` for the CSS rules, layer structure, visual
checks, and implementation steps.

### Configuration

- `config/quiz.js`: Stores shared quiz timing and question-count rules.
  - `QUESTIONS_PER_QUIZ`: Number of questions required from a source and selected for one quiz session after the valid source questions are shuffled.

### Components

Each component lives in its own folder (`ComponentName/`) containing the `.jsx` file, a `.module.css` file, and an `index.js` barrel export.

- `Button`: shared button component used across screens and other components
- `QuizSelector`: topic selection UI
- `QuestionCard`: current question container and related content
- `AnswerOption`: individual answer option UI
- `FeedbackMessage`: correct/incorrect feedback after validation
- `ExplanationBox`: question explanation after validation
- `TimerBar`: countdown display and progress bar
- `ScreenLayout`: shared layout wrapper for screens with decorative canvas/card framing
- `ExitQuizModal`: exit confirmation dialog
- `ResultsCard`: final results summary

### Screens

Each screen lives in its own folder (`ScreenName/`) containing the `.jsx` file, a `.module.css` file, and an `index.js` barrel export.

- `HomeScreen`: Initial screen where users select a topic and start the quiz.
- `QuizScreen`: Main quiz screen handling questions, answers, timer, and quiz progression.
- `ResultsScreen`: Final screen displaying the user's score and feedback.

### Services

- `quizApi.js`: Handles fetching and formatting quiz data through the local backend proxy (`/api/*`).

### Vercel Functions

- `api/quiz.js`: Vercel Function that proxies requests to QuizAPI.

### Data

- `quizTopics.js`: Stores the available quiz topics and their metadata.
- `fallbackQuestions/`: Stores bundled fallback/mock questions in one file per topic, plus an `index.js` export for lookup by topic. These files are authored in the app's internal question format.

Each topic object contains the information required by the Home screen and Quiz screen, such as:

- Topic id
- Topic name
- Topic artwork/icon
- The QuizAPI quiz id used to fetch that topic's questions
- Any additional topic-specific configuration required by the quiz

### Utilities

- `normalizeQuizQuestion.js`: Normalizes and validates questions that are already in the app's internal question format. This shared validation contract applies to fallback questions and to API questions after `quizApi.js` maps the raw API response into the internal shape.
- `shuffleArray.js`: Randomizes question and answer order.
- `getValidQuizQuestions()` requires an array, normalizes every question, and throws if any question is invalid. It never returns a partially valid question set. Source modules require at least `QUESTIONS_PER_QUIZ` questions after normalization and validation.

## TESTING PURPOSE

The current automated tests focus on protecting the quiz data contract rather than UI rendering. This is intentional because the app depends on a strict internal question shape before quiz state, answer validation, scoring, and timing can work reliably.

- `src/utils/normalizeQuizQuestion.test.js` protects the shared normalization layer. It confirms valid questions pass, malformed questions are rejected, fallback explanation text is added when needed, and question arrays are validated without mutating source data.
- `src/services/quizApi.test.js` protects the API service boundary. It confirms the frontend rejects QuizAPI responses that do not meet `MIN_QUESTIONS` and accepts responses that do, so the quiz never starts from an undersized API source.
- `src/data/fallbackQuestions/index.test.js` protects bundled offline content. It confirms every supported topic has enough usable fallback questions and that unsupported topic lookups fail with clear errors.

Together, these tests ensure both question sources, remote API data and bundled fallback data, satisfy the same validation rules before `QuizScreen.jsx` starts a session.

### Root Files

- `App.jsx`: Main application controller responsible for shared state and screen navigation.
- `main.jsx`: Application entry point that renders the React application.

### Assets

Static assets live in `src/assets/`. Current contents:

- `logo-desktop-on-dark.svg`, `logo-desktop-on-light.svg`: desktop logo variants
- `logo-mobile-on-dark.svg`, `logo-mobile-on-light.svg`: mobile logo variants
- `badge-icon.svg`, `checked-badge.svg`, `star-icon.svg`, `clock-icon.svg`: UI icons
- `card-decor-bottom-left.svg`, `card-decor-top-right.svg`: decorative card corner elements
- `topic-css-retro-logo.png`, `topic-html-retro-logo.png`, `topic-javascript-retro-logo.png`, `topic-python-retro-logo.png`, `topic-react-retro-logo.png`, `topic-typescript-retro-logo.png`: topic artwork for the quiz selector

### App Controller

`App.jsx` is the main wrapper and controller. It:

- Controls screen navigation with `currentScreen`
- Stores the selected quiz topic
- Stores the total number of questions for the active quiz
- Stores the final score
- Stores overall quiz status
- Exposes shared actions:
  - `handleSelectTopic`
  - `startQuiz`
  - `incrementScore`
  - `finishQuiz`
  - `retakeQuiz`
  - `resetQuiz`

Navigation is state-based rather than route-based. Valid screen values are:

- `home`
- `quiz`
- `results`

## STYLING ARCHITECTURE

### Global Styles

- `globals.css`
  - Contains global reset rules, typography defaults, body styles, and shared layout rules applied across the application.

- `variables.css`
  - Contains reusable CSS custom properties such as colors, spacing, font sizes, border radius values, shadows, and other design tokens.

### Component Styles

Each component has its own `.module.css` file co-located inside the component folder.

Examples:

- `Button/Button.module.css`
- `QuizSelector/QuizSelector.module.css`
- `QuestionCard/QuestionCard.module.css`
- `AnswerOption/AnswerOption.module.css`
- `FeedbackMessage/FeedbackMessage.module.css`
- `ExplanationBox/ExplanationBox.module.css`
- `TimerBar/TimerBar.module.css`
- `ExitQuizModal/ExitQuizModal.module.css`
- `ResultsCard/ResultsCard.module.css`

These files contain styles specific to their component only.

### Screen Styles

Each screen has its own `.module.css` file co-located inside the screen folder.

Examples:

- `HomeScreen/HomeScreen.module.css`
- `QuizScreen/QuizScreen.module.css`
- `ResultsScreen/ResultsScreen.module.css`

These files are responsible for screen-level layout and positioning.

## CSS ORGANIZATION RULES

- Keep global styles inside `globals.css`.
- Keep reusable design values inside `variables.css`.
- Keep component-specific styles inside the component's CSS file.
- Keep screen-specific layout styles inside the screen's CSS file.
- Avoid large centralized CSS files containing styles for unrelated components.
- Avoid styling a component from another component's CSS file.
- Reuse CSS variables whenever possible instead of hardcoding values.
- Use clear and consistent class names.
- Keep styles modular and easy to maintain.

## DESIGN SYSTEM USAGE

All components and screens should use the shared design tokens defined in `variables.css`.

Examples include:

- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Transitions

This ensures visual consistency across the application and simplifies future design updates.

## STATE MANAGEMENT

### App.jsx State

`App.jsx` owns shared state used across screens:

### `currentScreen`

- Controls the active screen
- Values: `home`, `quiz`, `results`

### `selectedTopic`

- Stores the topic selected on the Home screen
- Contains the topic metadata required during the quiz session
- Used to fetch quiz questions and configure the quiz

### `totalQuestions`

- Stores the number of normalized questions loaded for the current quiz
- Used on the Results screen
- Reset before a new quiz session starts from either Home or Retake Quiz

### `score`

- Stores the number of correct answers
- Only correct answers increase the score

### `quizStatus`

- Stores how the quiz ended.
- Used by ResultsScreen to display the appropriate status message.
- Values:
  - `completed`: all questions were answered before time expired
  - `expired`: the global timer reached zero

The value should start as `null` for a new session and remain `null` while the quiz is in progress.
It is reset to `null` when a new quiz session begins, including a Retake Quiz action from the Results screen.
`App.jsx` owns the state, `QuizScreen.jsx` updates it through a passed-down setter or callback, and `ResultsScreen.jsx` only reads it.

### QuizScreen.jsx State

`QuizScreen.jsx` owns active-session state:

### `questions`

- Stores normalized quiz questions for the active session
- Questions are randomized once after loading and remain fixed for that session

### `currentQuestionIndex`

- Tracks which question is currently displayed

### `selectedAnswer`

- Stores the answer value selected for the current question

### `hasAnswered`

- Indicates whether the current question has been answered
- Used to lock answers, show feedback, show explanation, and enable the Next Question button

### `remainingTime`

- Stores the global countdown timer value for the full quiz
- Drives the timer display, progress bar, and expiration behavior

### `isExitModalOpen`

- Controls the exit confirmation modal
- The global timer continues running while this modal is open

### `isLoading`

- Tracks question loading state while the app resolves either API data or fallback/mock questions
- Keeps a successful loading state visible for at least `MIN_LOADING_DISPLAY_MS` (currently 1 second), preventing a brief loader flash when questions resolve immediately
- Shows a Return Home action while questions are loading
- Returning Home unmounts `QuizScreen.jsx`; the effect cleanup aborts the active API request so it cannot update the screen afterward
- The global timer remains stopped until a ready question set is stored and `isLoading` becomes `false`

### `error`

- Stores loading or API errors
- API-related errors should not block quiz play if fallback/mock questions are available

### `quizStatus` updates

- `QuizScreen.jsx` should set `quizStatus` to `completed` when the user finishes the last question before time expires
- `QuizScreen.jsx` should set `quizStatus` to `expired` when the global timer reaches zero
- `ResultsScreen.jsx` should not mutate `quizStatus`

## SCREEN RESPONSIBILITIES

### HomeScreen.jsx

- Displays the app title or logo, welcome text, topic selector, and Start Quiz button
- Lets the user choose a topic
- Calls `handleSelectTopic()` on each topic card selection to update `selectedTopic` in `App.jsx`
- Triggers `startQuiz()` and moves the user to the quiz screen

### QuizScreen.jsx

- Displays the quiz title or app title, timer, progress bar, question indicator, current question, answer options, feedback, explanation, Next Question button, Exit Quiz button, and exit modal
- Receives `selectedTopic` from `App.jsx`
- Resolves quiz questions for the selected topic
- Uses QuizAPI as the primary source and falls back to bundled mock questions if the API is unavailable, errors, or returns an unusable question set, including invalid questions or fewer than `QUESTIONS_PER_QUIZ`
- Reports `totalQuestions` to `App.jsx`
- Calls `incrementScore()` on each correct answer to update `score` in `App.jsx`
- Updates `quizStatus` in `App.jsx` when the quiz is completed or expired
- Manages question progression, answer validation, timer behavior, and exit confirmation
- Redirects to Results when the quiz is completed or expired

### ResultsScreen.jsx

- Receives `score`, `totalQuestions`, and `quizStatus`
- Displays the final score
- Displays a performance message based on the user's final score
- Displays a status message based on quizStatus (e.g. completed or expired)
- Lets the user return Home and reset the quiz
- Lets the user retake the quiz for the same topic without returning to Home

## DATA FLOW

### Ownership

- `App.jsx` owns cross-screen state and navigation
- `QuizScreen.jsx` owns in-progress quiz interaction state
- Presentational components receive data and callbacks via props
- `quizApi.js` communicates with the local backend proxy and maps raw API data into the app's internal question format before validation
- The shared question normalization utility validates internal-format questions before they are used in a quiz session
- The quiz session can continue with bundled fallback/mock questions if API data is unusable

### Flow Between Layers

1. `HomeScreen.jsx` calls `handleSelectTopic()` on each topic card selection, updating `selectedTopic` in `App.jsx`.
2. `App.jsx` switches `currentScreen` from `home` to `quiz`.
3. `QuizScreen.jsx` requests questions through `quizApi.js`.
4. `quizApi.js` calls the local `/api/quiz` Vercel Function.
5. The Vercel Function requests quiz data from QuizAPI and returns the response to the frontend.
6. `quizApi.js` validates and formats the response for the UI, or signals that fallback/mock questions should be used if the proxy or API response is unavailable or unusable.
7. `QuizScreen.jsx` stores randomized questions locally and sends `totalQuestions` upward to `App.jsx`.
8. Quiz interactions update local quiz state; `QuizScreen.jsx` calls `incrementScore()` on each correct answer and updates `quizStatus` through the setter or callback passed down from `App.jsx`.
9. `App.jsx` switches to `results` when the quiz finishes or expires.
10. `ResultsScreen.jsx` reads final shared state and offers either reset navigation back to `home` or a retake action that starts a new quiz session for the same topic.

## QUIZ FLOW

### Session Start

1. The user lands on `HomeScreen.jsx`.
2. The user selects a topic and starts the quiz.
3. `App.jsx` stores `selectedTopic` and switches `currentScreen` to `quiz`.
4. `QuizScreen.jsx` requests questions for the selected topic.
5. If QuizAPI returns valid questions, `quizApi.js` maps them into the internal question format and validates them.
6. If QuizAPI is unavailable, errors, or returns no valid questions, bundled fallback/mock questions are loaded. Fallback questions are already authored in the internal format and are normalized/validated with the same shared rules before session use.
7. While loading, the screen shows a loader and a Return Home action. Returning Home cancels the active API request through the loading effect's cleanup.
8. The valid source questions are shuffled. QuizScreen.jsx selects 10 questions and shuffles their answer options.
9. If necessary, the successful path waits until the minimum loading display time has elapsed before storing the session questions and reporting 10 as totalQuestions.
10. `QuizScreen.jsx` sets `isLoading` to `false`, and the global timer starts only after the questions are ready.
11. The first question appears with Next Question disabled.

### Answer Validation

Answer validation is immediate. There is no Submit Answer button in the MVP.

When the user selects an answer:

1. Store the selected answer in `selectedAnswer`.
2. Set `hasAnswered` to `true`.
3. Compare the selected answer value with `currentQuestion.correctAnswer`.
4. If correct, increment `score`.
5. Show visual feedback:
   - Correct selection turns green
   - Incorrect selection turns red
   - Correct answer turns green when the selected answer is wrong
6. Show the feedback message.
7. Show the explanation.
8. Lock all answer options.
9. Enable Next Question.

### Question Progression

When the user clicks Next Question:

1. If another question exists, increment `currentQuestionIndex`.
2. Reset `selectedAnswer`.
3. Reset `hasAnswered`.
4. Hide feedback and explanation by returning the next question to its initial state.
5. Disable Next Question until the next answer is validated.

If the current question is the last one:

1. Finish the quiz.
2. Set `quizStatus` to `completed`.
3. Move to the Results screen.

### Timer Behavior

The quiz uses one global countdown timer for the entire session.

Rules:

- The timer starts when `QuizScreen.jsx` mounts and the questions are ready to display
- The timer remains visible during the quiz
- The progress bar decreases with `remainingTime`
- The timer does not control question progression
- The timer continues running while confirmation modals are open
- The timer is implemented as an interval and must be cleaned up with `clearInterval(...)` when the quiz ends, the user exits, or the screen unmounts

When `remainingTime` reaches zero:

1. Stop and clean up the interval.
2. Prevent `remainingTime` from going below zero.
3. Set `quizStatus` to `expired`.
4. Count unanswered questions as incorrect.
5. Move the user to the Results screen.

No additional score adjustment is required because only correct answers increase `score`.

When the user finishes the last question before time expires:

1. Stop and clean up the interval.
2. Set `quizStatus` to `completed`.
3. Move the user to the Results screen.

When the user exits the quiz:

1. Stop and clean up the interval.
2. Reset the shared quiz state in `App.jsx`.
3. Return to the Home Screen.

When the user retakes the quiz:

1. `QuizScreen.jsx` unmounts and mounts again as a fresh screen.
2. `remainingTime` resets automatically because it is local state inside `QuizScreen.jsx`.
3. The timer starts again only after the new quiz session is ready.

### Exit Flow

When the user clicks Exit Quiz:

1. Set `isExitModalOpen` to `true`.
2. Show the confirmation modal.
3. Keep the timer running.

Modal actions:

- Continue Quiz: close the modal and resume the current session with the timer still running
- Exit Quiz:
  1. Reset the quiz session
  2. Clear the timer
  3. Clear `selectedTopic`
  4. Reset `score` to `0`
  5. Set `currentScreen` to `home`

### Results Flow

The Results screen is shown when:

- All questions are answered
- The timer reaches zero

It receives:

- Final `score`
- `totalQuestions`
- `quizStatus`

### Retake Quiz Flow

When the user clicks Retake Quiz on the Results screen:

1. Keep the current `selectedTopic`.
2. Reset `score` to `0`.
3. Reset `totalQuestions` to `0` until the new session loads.
4. Set `quizStatus` to `null`.
5. Switch `currentScreen` back to `quiz`.
6. Reinitialize `QuizScreen.jsx` as a fresh session for the same topic.
7. Load a new question set for that topic and begin the normal quiz flow again.

## API LOGIC

Quiz questions are requested by the frontend through `src/services/quizApi.js`, which calls the local `/api/quiz` Vercel Function.

That service is responsible for:

- Resolving the selected topic to its QuizAPI quiz id
- Requesting that quiz's questions through the Vercel Function proxy
- Formatting API data into the app's internal shape
- Handling API response errors
- Rejecting invalid or incomplete question data
- Signaling when fallback/mock questions should be used instead

### Question Source

Each topic is served by one specific QuizAPI quiz, selected and reviewed by the
team in advance. Questions are requested by that quiz's id, not by category.
Fetching by category would return questions from any contributed quiz, with no
control over language or quality.

The quiz id is configuration, not derived at runtime. It is stored on each
topic entry in `data/quizTopics.js` alongside that topic's name and artwork, so
everything describing a topic stays in one place.

The selected quiz ids and the criteria used to choose them are recorded in
`docs/quizapi-research.md`.

API and fallback sources must contain at least `QUESTIONS_PER_QUIZ` valid questions.
The UI selects exactly `QUESTIONS_PER_QUIZ` questions for each session.

### Request

The frontend calls the local `/api/quiz` endpoint through `quizApi.js`.
The Vercel Function then requests `GET /questions` from QuizAPI and sends the API key in the `Authorization` header using `Bearer` authentication.

Parameters sent on every request:

| Parameter         | Value               | Purpose                                         |
| ----------------- | ------------------- | ----------------------------------------------- |
| `quiz_id`         | the topic's quiz id | Selects the reviewed quiz                       |
| `include_answers` | `true`              | Returns answer text and which answer is correct |

These are the only parameters the endpoint accepts when a quiz id is given.
Category, difficulty, type, tag, and pagination parameters apply only when
browsing questions across quizzes, which the app never does.

Every topic uses the same upstream QuizAPI request, differing only in `quiz_id`:

`GET /questions?quiz_id=<topic quiz id>&include_answers=true`

A request by `quiz_id` returns the whole quiz, and every returned question is
used for the session. Session length is therefore the quiz's own question
count, which is 10 for each selected quiz.

### Response Handling

A successful proxy response returns a `data` array of questions. The service must
distinguish three outcomes:

- Questions returned: validate, normalize, and use them
- Empty result: the request succeeded but returned no questions, so fallback
  questions are used
- Quiz not found: the configured quiz id no longer resolves, so fallback
  questions are used and the configuration needs updating

Because the request cannot filter by question type, every question is validated
after it arrives. A question is unusable if it is not multiple choice, has no
single correct answer, or is missing required fields. A quiz whose questions no
longer all pass has drifted from the version that was reviewed, so the response
is treated as unusable and fallback questions are used for that session.

An empty result arrives with a success status, so it cannot be detected from
the HTTP status alone.

### Internal Question Format

```json
{
  "id": "question-id",
  "question": "What does HTML stand for?",
  "answers": [
    "HyperText Markup Language",
    "Home Tool Markup Language",
    "Hyper Transfer Markup Link",
    "HyperText Machine Language"
  ],
  "correctAnswer": "HyperText Markup Language",
  "explanation": "HTML stands for HyperText Markup Language. It is used to structure content on web pages."
}
```

Each question must include:

- `id`
- `question`
- `answers`
- `correctAnswer`
- `explanation`

`explanation` may be missing or empty in source data. Normalization always adds a non-empty `explanation` to the internal question format.

If a question has no explanation, show a fallback message such as:

`No explanation available for this question.`

The same explanation is shown whether the answer is correct or incorrect.

## ENVIRONMENT VARIABLES

### Required Variables

```env
QUIZ_API_KEY=your_api_key_here
```

Notes

- `QUIZ_API_KEY` is read only by the Vercel Function and must not be exposed to frontend code.
- This key must not use the `VITE_` prefix.
- API keys should not be hardcoded in source files.
- `.env` should be included in `.gitignore`.
- `.env.example` should be committed to the repository.

## QUIZ LOGIC RULES

### Question Randomization

- A source must provide at least `QUESTIONS_PER_QUIZ` valid questions. The complete valid set is shuffled, and the first `QUESTIONS_PER_QUIZ` questions are selected for the session.
- Questions are randomized once at quiz start
- The randomized order stays fixed for that session
- Once the session’s questions are selected, they are not removed, replaced, or reshuffled during that session
- Fallback/mock questions follow the same session rules as API questions

### Answer Randomization

- Answer options are randomized before display
- The correct answer position must not be fixed
- Validation must compare answer values, not indexes

Correct approach:

`selectedAnswer === currentQuestion.correctAnswer`

Avoid:

`selectedAnswerIndex === correctAnswerIndex`

Example:

`const randomizedAnswers = shuffleArray(question.answers);`

### Navigation and Validation Rules

- One question is displayed at a time
- Questions are answered sequentially
- Only one answer can be selected per question
- There is no previous-question navigation
- Answers cannot be edited after validation
- Next Question stays disabled until validation completes

## ERROR HANDLING

The app should handle:

- API request failure
- Empty question response
- Invalid or incomplete question data
- Missing explanation
- Timer errors

If the API response cannot provide a valid question set:

- Use bundled fallback/mock questions
- Continue into the quiz without blocking normal play
- Start the timer only after the fallback/mock questions are ready

If no valid question source is available at all:

- Show an error message
- Allow the user to return Home
- Do not start the timer

## MVP DECISIONS

- Use React
- Use JavaScript
- Use CSS
- Use Vite
- Use React state only
- Use a lightweight Node.js Vercel Function proxy for QuizAPI requests
- Use bundled fallback/mock questions when API data is unavailable, errors, or is invalid
- No React Router
- No database
- No authentication
- No local storage
- No saved results
- One question displayed at a time
- Global countdown timer
- Timer progress bar
- Timer continues running while confirmation modals are open
- Immediate answer validation
- No Submit Answer button
- Answers locked after validation
- No previous question navigation
- No answer editing
- Feedback message shown after validation
- Explanation shown after validation
- Same explanation shown for correct and incorrect answers
- Next Question button disabled until answer validation
- Questions randomized at quiz start
- Answer options randomized before display
- API logic separated from UI logic

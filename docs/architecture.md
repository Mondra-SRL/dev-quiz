# QUIZ APP - ARCHITECTURE

## OVERVIEW

The Quiz App is a frontend-only React application built with Vite. Users select a programming topic, complete a timed quiz, receive immediate answer validation, view feedback and explanations, and then see a final results summary. From the Results screen, users can retake the same topic without returning to Home.

MVP exclusions:

- No backend
- No database
- No authentication
- No local storage
- No React Router

Core architectural decisions:

- `App.jsx` owns app-level navigation and shared quiz session state
- `QuizScreen.jsx` owns the active quiz session UI and local interaction state
- React state is the only state management solution
- API access is isolated in `src/services/quizApi.js`
- QuizAPI is the primary question source, with bundled fallback/mock questions used when API data is unavailable or unusable
- Questions and answer options are randomized in the UI layer

## DEVELOPMENT ENVIRONMENT

Contributors must have the following installed to run the project locally:

- Node.js
- npm

All project dependencies should be installed and managed using npm.

Alternative package managers (Yarn, pnpm, Bun, etc.) are currently out of scope unless the team agrees otherwise.

## APP STRUCTURE

```txt
project-root/
|-- src/
|   |-- assets/
|   |-- components/
|   |   |-- AnswerOption/
|   |   |-- Button/
|   |   |-- ExitQuizModal/
|   |   |-- ExplanationBox/
|   |   |-- FeedbackMessage/
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
|   |   `-- quizApi.js
|   |-- data/
|   |   |-- fallbackQuestions/
|   |   |   |-- css.js
|   |   |   |-- html.js
|   |   |   |-- javascript.js
|   |   |   |-- python.js
|   |   |   |-- react.js
|   |   |   |-- typescript.js
|   |   |   `-- index.js
|   |   `-- quizTopics.js
|   |-- utils/
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

- `quizApi.js`: Handles fetching and formatting quiz data from QuizAPI.

### Data

- `quizTopics.js`: Stores the available quiz topics and their metadata.
- `fallbackQuestions/`: Stores bundled fallback/mock questions in one file per topic, plus an `index.js` export for lookup by topic.

Each topic object contains the information required by the Home screen and Quiz screen, such as:

- Topic id
- Topic name
- Topic artwork/icon
- Any additional topic-specific configuration required by the quiz

### Utilities

- `shuffleArray.js`: Randomizes question and answer order.

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
- Uses QuizAPI as the primary source and falls back to bundled mock questions if the API is unavailable, errors, or returns no valid questions
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
- `quizApi.js` fetches and formats API data before the UI uses it
- The quiz session can continue with bundled fallback/mock questions if API data is unusable

### Flow Between Layers

1. `HomeScreen.jsx` calls `handleSelectTopic()` on each topic card selection, updating `selectedTopic` in `App.jsx`.
2. `App.jsx` switches `currentScreen` from `home` to `quiz`.
3. `QuizScreen.jsx` requests questions through `quizApi.js`.
4. `quizApi.js` fetches, validates, and formats the API response.
5. `QuizScreen.jsx` stores randomized questions locally and sends `totalQuestions` upward to `App.jsx`.
6. Quiz interactions update local quiz state; `QuizScreen.jsx` calls `incrementScore()` on each correct answer and updates `quizStatus` through the setter or callback passed down from `App.jsx`.
7. `App.jsx` switches to `results` when the quiz finishes or expires.
8. `ResultsScreen.jsx` reads final shared state and offers either reset navigation back to `home` or a retake action that starts a new quiz session for the same topic.

## QUIZ FLOW

### Session Start

1. The user lands on `HomeScreen.jsx`.
2. The user selects a topic and starts the quiz.
3. `App.jsx` stores `selectedTopic` and switches `currentScreen` to `quiz`.
4. `QuizScreen.jsx` requests questions for the selected topic.
5. If QuizAPI returns valid questions, they are normalized and used for the session.
6. If QuizAPI is unavailable, errors, or returns no valid questions, bundled fallback/mock questions are used instead.
7. The resolved questions are randomized, stored in `questions`, and counted in `totalQuestions`.
8. The global timer starts only after questions are ready.
9. The first question appears with Next Question disabled.

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

Quiz questions are fetched from QuizAPI through `src/services/quizApi.js`.

That service is responsible for:

- Fetching questions from QuizAPI
- Filtering by selected topic if needed
- Excluding questions from known non-English quizzes
- Formatting API data into the app's internal shape
- Handling API response errors
- Rejecting invalid or incomplete question data
- Signaling when fallback/mock questions should be used instead

### Endpoint and Authentication

Base endpoint:

`GET https://quizapi.io/api/v1/questions`

The API key must be sent in one of two ways:

- `Authorization` header, with the key as the value preceded by the word "Bearer"
- `api_key` query parameter

An `X-Api-Key` header is not recognized and returns `401 Unauthorized`.

Supported query parameters:

`quiz_id`, `include_answers`, `category`, `difficulty`, `type`, `tags`, `limit`, `offset`, `random`

There is no `language`, `lang`, or `locale` parameter.

### Topic to Category Mapping

All six topics are fetched from QuizAPI. The five language topics use existing public quizzes filtered by category. HTML is fetched from a dedicated quiz created by the team in QuizAPI and targeted by its `quiz_id`.

| App topic | QuizAPI filter | Source |
| --- | --- | --- |
| `javascript` | `category=javascript` | Existing public quizzes |
| `typescript` | `category=typescript` | Existing public quizzes |
| `python` | `category=python` | Existing public quizzes |
| `react` | `category=react` | Existing public quizzes |
| `css` | `category=css` | Existing public quizzes |
| `html` | `quiz_id=<team HTML quiz id>` | Team-created quiz |

HTML has no dedicated category and too little existing content to fill a session, so the team creates its own HTML quiz in QuizAPI and the app fetches it by `quiz_id`. That `quiz_id` must be recorded in configuration once the quiz exists.

**Mixed question language.** QuizAPI content is contributed per quiz, and language is a property of the individual quiz rather than a request option. One non-English quiz is currently known:

- Title: `Javascript Quiz`
- `quiz_id`: `cmpqioi8p04tbqxutobezhcgb`
- Tags: `basic`, `javascript`, `web`
- 5 questions, in Indonesian

This quiz sorts early in the `javascript` category, so an unfiltered request is likely to include it. Quizzes carrying specific tags such as `interview`, `debugging`, `hooks`, or `async` `promises` were consistently English, while the generic `basic` and `web` tags identified the non-English quiz.

**Thin existing HTML coverage.** The existing public HTML content is only 10 questions from a single quiz (`CSS & HTML Mastery`, `quiz_id` `cmmdjge3c00fcutgryuk42tht`), with no HTML category. Rather than depend on that, the team creates a dedicated HTML quiz in QuizAPI and the app fetches HTML from it by `quiz_id`, as described in Topic to Category Mapping. As with the other topics, `data/fallbackQuestions/html.js` remains the fallback used when the API is unavailable or returns unusable data.

### Postman API Requests

These requests are used to validate the API in Postman before and during service-layer integration. They mirror the requests `quizApi.js` makes at runtime.

Authentication is the same for every request. Add one header:

| Key | Value |
| --- | --- |
| `Authorization` | `Bearer <api_key>` |

The `api_key` query parameter also works as an alternative to the header. Requests below show the header form.

**Per-topic question requests.** Method `GET`, base URL `https://quizapi.io/api/v1/questions`, `limit=10` to match the session size.

| Topic | Request URL |
| --- | --- |
| `javascript` | `https://quizapi.io/api/v1/questions?category=javascript&limit=10` |
| `typescript` | `https://quizapi.io/api/v1/questions?category=typescript&limit=10` |
| `python` | `https://quizapi.io/api/v1/questions?category=python&limit=10` |
| `react` | `https://quizapi.io/api/v1/questions?category=react&limit=10` |
| `css` | `https://quizapi.io/api/v1/questions?category=css&limit=10` |
| `html` | `https://quizapi.io/api/v1/questions?quiz_id=<team HTML quiz id>&limit=10` |

**Supporting requests.**

| Purpose | Request |
| --- | --- |
| List categories (no auth required) | `GET https://quizapi.io/api/v1/categories` |
| List metadata: categories, tags, difficulties (no auth required) | `GET https://quizapi.io/api/v1/metadata` |
| Auth failure check, expect `401` | `GET https://quizapi.io/api/v1/questions?category=javascript&limit=10` with no key |
| Unknown category check, confirm empty vs error response | `GET https://quizapi.io/api/v1/questions?category=nonsense&limit=10` |

**Expected success response.** HTTP `200` with a JSON body of the form `{ "success": true, "data": [ ... ] }`, where each item in `data` contains `id`, `text`, `answers` (each with `text` and `isCorrect`), and `explanation`. This is the shape `quizApi.js` normalizes into the internal question format below.

**Testing checklist.**

- Each of the six per-topic requests returns `200` with a non-empty `data` array
- Every returned question has answers with exactly one `isCorrect` answer
- The auth failure request returns `401`
- The unknown category request returns a defined result (empty array or error), matching the fallback behavior in Error Handling

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

If a question has no explanation, show a fallback message such as:

`No explanation available for this question.`

The same explanation is shown whether the answer is correct or incorrect.

## ENVIRONMENT VARIABLES

### Required Variables

```env
VITE_QUIZ_API_KEY=your_api_key_here
```

Notes
- Environment variables are accessed through import.meta.env.
- API keys should not be hardcoded in source files.
- .env should be included in .gitignore.
- .env.example should be committed to the repository.

## QUIZ LOGIC RULES

### Question Randomization

- All questions returned for the selected topic are included in the session
- Questions are randomized once at quiz start
- The randomized order stays fixed for that session
- Questions are not removed or replaced during the session
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
- Use QuizAPI
- Use bundled fallback/mock questions when API data is unavailable, errors, or is invalid
- No React Router
- No backend
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

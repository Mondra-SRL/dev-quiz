# QUIZ APP - ROADMAP

This roadmap reflects the agreed implementation order, the current repository state, and the existing GitHub issues.

Use the GitHub issues as the source of truth for detailed task requirements and acceptance criteria.

Status key: Completed | In progress | Pending

## Phase 1 - Project Initialization [Completed]

- React and Vite are set up and the initial boilerplate has been cleaned.
- Base project configuration, `.gitignore`, and `.env.example` are in place.
- Local setup documentation exists for contributors.

## Phase 2 - Project Structure [Completed]

- The app structure is established for screens, components, data, services, utilities, assets, and styles.
- Core files and folders from the agreed architecture are already present.
- Shared component and screen entry points are in place.

## Phase 3 - Global Styles and Design Tokens [Completed]

- `src/styles/globals.css` is connected and provides the global styling foundation.
- `src/styles/variables.css` defines the shared design tokens.
- CSS Modules are being used for component and screen styling.

## Phase 4 - UI Specifications and Visual Assets [Completed]

- The MVP UI flow and layout patterns are defined in the Figma-based specifications.
- Shared logos, topic artwork, icons, and decorative assets are already in the repo.
- Screen layout decisions are established and reflected in the current UI build.

## Phase 5 - App State and Navigation [Completed]

- `App.jsx` owns the shared quiz state and state-based screen navigation.
- The main quiz actions exist for selecting a topic, starting a quiz, finishing a quiz, retaking, and resetting.
- The app currently moves between Home, Quiz, and Results without React Router.

## Phase 6 - Home Screen [Completed]

- Topic selection is implemented from `quizTopics.js`.
- The Start Quiz flow is wired into shared app state.
- The Home screen UI is built and connected to the current quiz flow.

## Phase 7 - Quiz Screen with Mock Data [Completed]

- The Quiz screen UI is implemented around the agreed component structure.
- The current quiz flow uses hardcoded mock questions with immediate validation, feedback, explanation, score updates, and question progression.
- Timer and Exit Quiz behavior are still placeholder-level at this stage.

## Phase 8 - Results Screen [Completed]

- The Results screen exists and is connected to the shared quiz flow.
- Return Home and Retake Quiz actions are present.
- Most of the Results UI structure is already built, but final result logic is still pending.

## Phase 9 - QuizAPI Configuration and Quiz Selection [Pending]

- Finish QuizAPI research, account configuration, and API validation.
- Select one QuizAPI quiz per topic against the criteria in `quizapi-research.md`, and create the HTML quiz, which has no public equivalent.
- Record the chosen quiz ids in `quizTopics.js` and in the research registry.
- Confirm the required question fields, especially explanations, before UI integration.

## Phase 10 - Fallback Questions [Pending]

- Copy each selected quiz into a topic-based fallback question file in `src/data/fallbackQuestions/`.
- Use the normalized internal question structure defined in `architecture.md`.
- Replace the inline mock question source with topic-based fallback loading in the Quiz screen.

## Phase 11 - QuizAPI Service and Quiz Screen Integration [In progress]

- `src/services/quizApi.js` exists but is still a stub and needs the full service-layer logic from `architecture.md`.
- Fetch, validate, and normalize QuizAPI responses before the Quiz screen uses them.
- Connect API questions to the Quiz screen and fall back to bundled local questions when API data is unavailable or unusable.

## Phase 12 - Results Screen Finalization [In progress]

- Replace placeholder result content with the final score, total questions, performance messaging, and quiz status.
- Ensure Return Home and Retake Quiz follow the final quiz data flow.
- Align the Results screen with the completed and expired quiz outcomes.

## Phase 13 - Global Timer [Pending]

- Implement the real countdown timer and timer progress bar.
- Start the timer only after valid questions are ready.
- Handle expiration through the shared `quizStatus` flow.

## Phase 14 - Question and Answer Randomization [Pending]

- Randomize questions once per session.
- Randomize answers while preserving correct-answer validation by value.
- Reuse the shared shuffle utility as part of the final question-loading flow.

## Phase 15 - Exit Quiz Modal [In progress]

- Replace the current direct exit action with the confirmation modal flow.
- Support Continue Quiz and Exit Quiz actions with the correct reset behavior.
- Keep the timer running while the modal is open.

## Phase 16 - Error and Empty States [Pending]

- Add loading, API error, invalid response, and unavailable-question states.
- Prevent the quiz from continuing when no valid question source is available.
- Allow the user to return Home if neither API nor fallback questions can be used.

## Phase 17 - UI Polish and Responsiveness [In progress]

- Refine the existing UI to match the approved visual direction across all screens.
- Complete responsive behavior and consistency passes.
- Improve accessibility and interaction clarity where needed without changing the agreed layout flow.

## Phase 18 - Testing and Refactoring [Pending]

- Test the full application flow from Home to Quiz to Results and back.
- Test both API-backed and fallback-question flows.
- Fix bugs, edge cases, and refactor where needed after the remaining MVP features are in place.

## Phase 19 - Deployment [Pending]

- Deployment is currently out of scope.
- The app will not be deployed while the QuizAPI key must be exposed in the frontend.
- Deployment can be reconsidered later only if the architecture changes.

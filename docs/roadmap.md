# DEVQUIZ - ROADMAP

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
- The current quiz flow supports immediate validation, feedback, explanation, score updates, and question progression.
- Timer and Exit Quiz confirmation behavior are still placeholder-level at this stage.

## Phase 8 - Results Screen [Completed]

- The Results screen exists and is connected to the shared quiz flow.
- Return Home and Retake Quiz actions are present.
- Final score display and performance messaging are implemented.

## Phase 9 - QuizAPI Configuration and Quiz Selection [Completed]

- QuizAPI research, topic selection, and topic quiz ids are recorded in the repo.
- One QuizAPI quiz is configured per topic in `quizTopics.js`.
- The selected quiz data and validation notes are tracked in `quizapi-research.md`.

## Phase 10 - Fallback Questions [Completed]

- Topic-based fallback question files exist in `src/data/fallbackQuestions/`.
- The fallback questions use the shared internal question structure.
- The Quiz screen can load bundled fallback questions when API data is unavailable or unusable.

## Phase 11 - QuizAPI Service and Quiz Screen Integration [Completed]

- `src/services/quizApi.js` fetches, validates, and normalizes QuizAPI responses.
- The Quiz screen loads API-backed questions through the service layer.
- Local fallback questions are used when API data is unavailable or unusable.

## Phase 12 - Backend Proxy for QuizAPI [Pending]

- Introduce a lightweight Node.js Vercel Function backend proxy to protect the QuizAPI key.
- Create the `api/` Vercel Function and update the frontend to call the local `/api/*` endpoint.
- Configure local full-stack development with `vercel dev`.

## Phase 13 - Results Screen Finalization [In progress]

- Final score display and performance messaging are in place.
- Align the Results screen with completed and expired quiz outcomes.
- Ensure the final results flow includes the intended quiz status handling.

## Phase 14 - Global Timer [Pending]

- Implement the real countdown timer and timer progress bar.
- Start the timer only after valid questions are ready.
- Handle expiration through the shared `quizStatus` flow.

## Phase 15 - Question and Answer Randomization [Completed]

- Questions are randomized once per session.
- Answer options are randomized while preserving correct-answer validation by value.
- The shared shuffle utility is part of the current question-loading flow.

## Phase 16 - Exit Quiz Modal [In progress]

- Replace the current direct exit action with the confirmation modal flow.
- Support Continue Quiz and Exit Quiz actions with the correct reset behavior.
- Keep the timer running while the modal is open.

## Phase 17 - Error and Empty States [In progress]

- Loading and no-valid-question error states are present in the Quiz screen.
- The quiz already falls back to bundled questions when API data is unavailable or unusable.
- Expand error handling to cover the full final API and proxy flow.

## Phase 18 - UI Polish and Responsiveness [In progress]

- Refine the existing UI to match the approved visual direction across all screens.
- Complete responsive behavior and consistency passes.
- Improve accessibility and interaction clarity where needed without changing the agreed layout flow.

## Phase 19 - Testing and Refactoring [Pending]

- Test the full application flow from Home to Quiz to Results and back.
- Test both API-backed and fallback-question flows.
- Add coverage for the backend proxy flow once it is implemented.
- Fix bugs, edge cases, and refactor where needed after the remaining MVP features are in place.

## Phase 20 - Deployment [Pending]

- Deployment becomes viable once the backend proxy is implemented and the QuizAPI key is no longer exposed to frontend code.
- Deploy the app with the frontend and Vercel Function working together.
- Confirm the deployed environment variables and API-backed quiz flow before release.

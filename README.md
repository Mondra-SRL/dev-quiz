# DevQuiz

DevQuiz is a React application for practicing programming concepts in HTML, CSS, JavaScript, TypeScript, React, and Python. Choose a topic, answer a timed ten-question quiz, get immediate feedback and explanations, and review your final score.

[🔗 Try the live demo](https://dev-quiz-roan.vercel.app/)


## Features

- Six quiz topics: HTML, CSS, JavaScript, TypeScript, React, and Python
- Ten-minute quizzes with shuffled questions and answer options
- Immediate answer validation, feedback, and explanations
- Results for completed or expired quizzes, with retake and return-home actions
- QuizAPI questions with bundled fallback questions when the API is unavailable
- Responsive and accessible interface

## Tech Stack

- React
- Vite
- JavaScript
- CSS Modules
- Vercel Functions
- [QuizAPI](https://quizapi.io/)

## Run locally

Requirements: Node.js and npm.

1. Clone the repository and install dependencies:

   ```bash
   git clone <repository-url>
   cd quiz-app
   npm install
   ```

2. Create `.env` from `.env.example` and add your QuizAPI key:

   ```env
   QUIZ_API_KEY=your_api_key_here
   ```

   The key is used only by the server-side Vercel Function. Never expose it with a `VITE_` prefix or commit `.env`.

3. Start the full local application:

   ```bash
   npm run dev:vercel
   ```

   This starts the Vite frontend and the `/api/quiz` Vercel Function together. Open the local URL shown in the terminal. This requires a Vercel project that you own or can access.

If you only want to view the frontend, use `npm run dev`. API requests will not be available, but the app can use its bundled fallback questions.

### Vercel environment

`npm run dev:vercel` uses the Vercel CLI to run the Vite frontend and the `api/quiz.js` serverless function together. It must be linked to a Vercel project that you own or can access so the CLI can use that project's configuration and environment variables.

The live demo belongs to a free-plan Vercel account that cannot add collaborators. As a result, other contributors cannot link their Vercel CLI to that project. To test the full Vercel environment:

1. Fork this repository.
2. Create a Vercel project from your fork.
3. Add `QUIZ_API_KEY` to the project's environment variables.
4. Clone your fork, run `npm install`, and link it to your Vercel project with `vercel link`.
5. Run `npm run dev:vercel`.

If you do not need to test the API proxy, use `npm run dev` and the app's bundled fallback questions instead.

## How it works

The frontend requests questions from `/api/quiz`. The Vercel Function keeps the QuizAPI key on the server, requests the selected quiz, and returns the data to the frontend. Questions are normalized and validated before use. If the request fails or does not return enough valid questions, the app loads the matching bundled fallback set from `src/data/fallbackQuestions/`.

```text
React frontend -> /api/quiz -> api/quiz.js -> QuizAPI
```

## Project structure

```text
api/                  # Server-side Vercel Functions
public/               # Public assets and favicons
src/
  assets/             # Fonts, logos, icons, and topic artwork
  components/         # Reusable UI components
  data/               # Topics, result messages, and fallback questions
  screens/            # Home, quiz, and results screens
  services/           # API client and question validation
  styles/             # Global styles and design tokens
  utils/              # Shared utilities

docs/                 # Product, architecture, accessibility, and research docs
.env.example          # Environment variable template
package.json          # Scripts and dependencies
```

Additional commands:

```bash
npm run build        # Create a production build
npm run preview      # Preview the production build
npm run lint         # Run ESLint
npm test             # Run automated tests
```
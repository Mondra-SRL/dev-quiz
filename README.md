# Quiz App

A programming quiz application built with React and Vite.

Users select a programming topic, complete a quiz, receive immediate feedback, and view their final score.

## Documentation

Project documentation can be found in the `docs` folder:

* PRD (Product Requirements Document)
* Architecture
* Roadmap

Please review these documents before starting work on any issue.

## Tech Stack

* React
* Vite
* CSS
* Node.js
* Vercel Functions
* QuizAPI

## Requirements

* Node.js
* npm

This project uses `npm` as the package manager.

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root using `.env.example` as a reference.

```env
QUIZ_API_KEY=your_api_key_here
```

Note:

* `QUIZ_API_KEY` is read by the local `/api/quiz` backend proxy.
* Never expose this key to frontend code or prefix it with `VITE_`.
* Never commit your `.env.local` file.

### Start the Development Server

```bash
npm run dev
```

This is enough to develop and test the app locally, including requests to the `/api/quiz` endpoint. The `api/` folder is handled automatically during local development, so installing the Vercel CLI or running `npm run dev:vercel` is not required for the normal workflow.

Optional Vercel runtime emulation:

```bash
npm run dev:vercel
```

Use `npm run dev:vercel` only if you specifically want to emulate the Vercel runtime more closely.

To test the app from another device on the same local network, start the dev server with host binding:

```bash
npm run dev -- --host
```

### Backend Proxy Flow

Request flow:

```text
React frontend
    -> /api/quiz
    -> Vercel Function
    -> QuizAPI
```

In this setup, the frontend calls the local `/api/quiz` endpoint without receiving the QuizAPI key.

The Vercel Function reads `QUIZ_API_KEY` from the server environment, requests data from QuizAPI, and returns the response to the frontend.

This allows the same relative `/api/*` route to be used locally and after deployment.

## Project Structure

```txt
docs/
api/
src/
public/
.env.example
package.json
vite.config.js
```

`api/` contains the backend proxy endpoint used during local development and deployment.

For the full application structure, refer to the Architecture document.

## Contributing

Before starting work:

1. Review the PRD, Architecture, and Roadmap documents.
2. Pick or assign yourself an issue.
3. Create a feature branch.
4. Open a Pull Request linked to the corresponding issue.

Please keep implementations aligned with the agreed scope and architecture.

## Current Scope

The current project state includes:

* Topic selection for HTML, CSS, JavaScript, TypeScript, React, and Python
* Quiz flow from Home to Results
* Question loading from QuizAPI with bundled fallback question sets per topic
* Ten-question quiz sessions with shuffled questions and answer options
* Immediate answer validation with per-question feedback
* Question explanations, including a default fallback message when none is provided
* Score tracking, final results, and retake or return-home actions
* A direct exit-to-home action during the quiz
* The timer is implemented and starts only after loading succeeds
* Backend proxy requests through the local `/api/quiz` endpoint

For the complete scope, refer to the PRD.
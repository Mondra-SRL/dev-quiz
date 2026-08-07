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

* `QUIZ_API_KEY` is intended for the planned backend-proxy setup and must be read only by the Vercel Function.
* Never expose this key to frontend code or prefix it with `VITE_`.
* Never commit your `.env` file.

### Vercel CLI

The planned backend proxy uses the Vercel CLI locally so the frontend and Vercel Functions can run together in one development environment.

Add it as a project development dependency with:

```bash
npm install --save-dev vercel
```

Contributors who clone the repository normally only need to run `npm install`, because this dependency should already be declared in `package.json` as part of the required backend-proxy setup.

### Start the Development Server

Use one development mode at a time. Do not run both commands together.

```bash
npm run dev
```

Use this for frontend-only development. It starts only the Vite development server, so local `/api/*` Vercel Functions are not available.

Planned backend-proxy development command:

```bash
npm run dev:vercel
```

Use this when developing or testing the complete application with the backend proxy.

As part of the required backend-proxy setup, `npm run dev:vercel` should run `vercel dev`, which:

* starts the Vite frontend;
* serves the local Vercel Functions from the `api/` directory;
* routes frontend `/api/*` requests to those functions;
* provides a local environment similar to the deployed Vercel application.

When this script is added, there is no need to run `npm run dev` in a second terminal because `vercel dev` starts the frontend itself.

To test the app from another device on the same local network, start the dev server with host binding:

```bash
npm run dev -- --host
```

This is for frontend-only network testing and does not test the planned Vercel Function proxy.

### Backend Proxy Flow

Planned request flow:

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

`api/` is the planned location for the Vercel Functions used by the backend proxy.

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
* Timer countdown behavior 
* Planned backend proxy work
  
For the complete scope, refer to the PRD.


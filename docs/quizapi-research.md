# QuizAPI Integration Guide

## Purpose

This document explains how DevQuiz should use QuizAPI.

Use it when you need to:

- choose the quiz used for each topic
- implement or review `src/services/quizApi.js`
- create or refresh fallback question files
- validate that the selected QuizAPI quizzes still work for the app

This is not just general API research. It is an implementation guide for this
project.

### Simple Example

If you are working on the `react` topic, you would use this doc like this:

1. Check the quiz-selection section to find or shortlist candidate React quizzes.
2. Review the candidate quiz questions and confirm the quiz has exactly 10 usable questions.
3. Record the chosen `quiz_id` in the topic registry.
4. Use the internal question-shape section when implementing or reviewing the mapping in `quizApi.js`.
5. Write or refresh `src/data/fallbackQuestions/react.js` as separate team-authored questions for the same topic.
6. Run the validation checklist to confirm the quiz behaves the way the app expects.

That same workflow applies to every topic.

---

## What The App Depends On

The app does not fetch questions by category at runtime. Instead, each topic is
tied to one specific QuizAPI quiz by `quiz_id`.

That means:

- each topic uses one pinned quiz
- the app expects that pinned quiz to contain 10 questions, because the quiz-based endpoint returns the quiz's full question set
- the fallback file for that topic is separate team-authored content, not a copy
  of the quiz
- if the pinned quiz becomes unusable, the app falls back to local data until
  the team chooses a replacement

The main runtime call is:

`GET /questions?quiz_id=<id>&include_answers=true`

---

## Runtime Rules

At runtime, the app should request:

| Parameter | Value | Why it matters |
| --- | --- | --- |
| `quiz_id` | one pinned quiz per topic | Keeps each topic tied to a reviewed quiz |
| `include_answers` | `true` | Required to get answer text and correctness data |

Notes:

- `include_answers=true` affects `answers`, not whether `explanation` exists
- the API returns an `explanation` field either way, but it may be an empty
  string
- when fetching by `quiz_id`, the docs currently describe the endpoint as
  returning that quiz's ordered questions rather than supporting `type` or
  pagination filters on the same request
- because of that, each pinned quiz must itself contain the 10 questions the
  app session is meant to use

---

## Internal Question Shape

The app uses a simpler question shape than the raw API response.

| App field | QuizAPI source | Rule |
| --- | --- | --- |
| `id` | `id` | Must be non-empty |
| `question` | `text` | Use the question text directly |
| `answers` | `answers[].text` | Group the API answer texts into one array of strings |
| `correctAnswer` | the one `answers[].text` where `isCorrect === true` | Reject the question unless there is exactly one |
| `explanation` | `explanation` | Use fallback text if the value is empty/falsy |

The app expects:

- one correct answer as a string
- answer options as plain strings
- answer validation by value, not by original index
- explanations after submission

Because answers are shuffled in the UI, answer text within a single question
must be unique.

---

## What To Review Before Pinning A Quiz

Each topic should be assigned one quiz that passes all of the following checks:

- exactly 10 questions
- English throughout
- all questions usable as `MULTIPLE_CHOICE`
- exactly one correct answer per question
- no duplicate answer text within a question
- no position-dependent answers such as "All of the above" or "Both A and C"
- explanations on most questions
- reasonable factual quality on a manual skim

These are not nice-to-haves. With one quiz per topic, a bad quiz breaks that
topic.

---

## How To Find Candidate Quizzes

Use QuizAPI discovery endpoints only during selection, not at runtime.

### Step 1

List candidate quizzes for a category:

`GET /quizzes?category=<slug>&limit=50`

Use this to inspect:

- quiz ids
- quiz titles
- `questionCount`

Discard anything that does not have exactly 10 questions.

### Step 2

Inspect remaining candidates with:

`GET /questions?quiz_id=<id>&include_answers=true`

Read the returned questions and apply the review criteria above.

### Step 3

Record the chosen quiz for the topic in the registry below.

Important constraint:

- QuizAPI does not provide a `language`, `lang`, or `locale` filter for this
  use case
- language must therefore be checked manually before pinning a quiz

---

## Topic Registry

Fill this in once the team agrees on the final quizzes.

It is also worth copying the final quiz ids into `architecture.md` so the main
project docs show exactly which QuizAPI resources the app depends on.

| Topic | `quiz_id` | Title | Date selected | Notes |
| --- | --- | --- | --- | --- |
| `html` | `cms3lywwh0luafbutet1php2w` | HTML Quiz: Intermediate Level | `2026-07-27`| |
| `css` | `cmnzv5hc400y32iutw5ywxii1` | CSS Layout & Flexbox | `2026-07-27` | |
| `javascript` | `cmptrjx7502d07gut7cba4vvg` | JavaScript Async Interview Questions for Frontend Developers | `2026-07-27` | |
| `typescript` | `cmnzuhit0000d2iutbobr9vzj` | TypeScript Type System Fundamentals | `2026-07-27` | |
| `react` | `cmnzuhl2400c52iuti6q4juba` | React Hooks Deep Dive | `2026-07-27` | |
| `python` | `cmnzsb1zq001jruuto53x368j` | Python Data Types & Conversions | `2026-07-27` | |

Note:

- there is no useful public HTML category for this project, so `html` is
  expected to use a team-authored quiz

---

## How A Quiz Session Works

1. The user selects a topic.
2. The app looks up that topic's pinned `quiz_id`.
3. The app sends the runtime request.
4. Returned questions are mapped into the internal question format.
5. Question order and answer order are shuffled in the UI.
6. If the API result is unusable, the app uses the local fallback file instead.

Retake behavior:

- a retake refetches the same pinned quiz
- the content should be the same quiz, only reshuffled

Failure behavior:

- no sibling quiz is tried at runtime
- if the request fails, returns empty, returns invalid data, or returns too few
  usable questions, the topic should fall back to bundled local content

---

## Fallback Files

Fallback files exist so a topic can still run if QuizAPI is unavailable or the
selected quiz becomes unusable.

Location:

`src/data/fallbackQuestions/<topic>.js`

Fallback questions are **separate content**, not a copy of the pinned quiz.
Each file is written by the team for that topic.

Nothing depends on the two sets matching. The app maps both into the same
internal format, so the quiz screen cannot tell which source it received. What
a fallback file must match is the contract, not the content:

- fallback files currently contain exactly 10 questions. At runtime, API and fallback sources are accepted when they contain at least MIN_QUESTIONS. The screen selects exactly QUESTIONS_PER_QUIZ questions.
- the same internal format used for API questions
- the same review criteria applied to pinned quizzes
- comparable difficulty and tone, so a topic does not change character
  depending on whether the API was reachable

Writing them independently means the questions are the team's own, which
removes any question over reusing third-party content, and gives a user who
plays a topic online and later hits the fallback a set they have not seen.

Suggested header:

```js
// Topic: react — team-authored fallback, written YYYY-MM-DD
export default [ /* 10 questions */ ];
```

Use `GET /questions?quiz_id=<id>&include_answers=true` on the pinned quiz as a
reference for format, difficulty, and explanation style — not as text to copy.

After writing a fallback file, verify that every question has:

- a `correctAnswer` string matching exactly one value in `answers`
- no duplicate answer strings
- non-empty `id`
- non-empty `question`
- non-empty `explanation`, or the standard fallback explanation behavior clearly
  accounted for

---

## Response Cases The App Must Handle

The service should distinguish between these outcomes:

| Case | Meaning | Expected behavior |
| --- | --- | --- |
| `200` with populated `data` | usable result | map and use the questions |
| `200` with `data: []` | request succeeded, but no usable questions matched | treat as application failure and fall back |
| `404` with `success: false` | the pinned `quiz_id` is invalid or dead | fall back and update the registry later |
| network/auth/server failure | request failed | fall back |

Important detail:

- `response.ok` alone is not enough
- an empty `data` array is still an application-level failure for this app

---

## Validation Checklist

Run this against each pinned quiz before relying on it.

Runtime request:

`{{base_url}}/questions?quiz_id=<id>&include_answers=true`

Edge-case requests:

| Case | Request or setup | Expected result |
| --- | --- | --- |
| Auth failure | same request with auth disabled | `401` |
| Unknown quiz id | `?quiz_id=nonexistent&include_answers=true` | `404`, `success: false` |
| Rate limit | repeat the runtime request several times | record any throttling behavior |

Checklist:

- [ ] the pinned quiz returns `200`
- [ ] exactly 10 questions are returned, because the pinned quiz itself contains 10 questions
- [ ] every question is usable for the app's internal format
- [ ] every question has exactly one correct answer
- [ ] no duplicate answer text appears within a question
- [ ] explanation content is acceptable, or fallback explanation behavior is confirmed
- [ ] auth failure returns `401`
- [ ] invalid quiz id returns `404`
- [ ] any nullable or inconsistent fields are recorded
- [ ] rate-limit behavior is checked
- [ ] each teammate has created the agreed team-authored HTML quiz in their own QuizAPI account and recorded their own valid `quiz_id`

---

## Quick Start

If you are using this doc for the first time, do the work in this order:

1. Choose one quiz per topic and fill in the registry.
2. Add the agreed quiz ids to the app config and to `architecture.md`.
3. Implement or review `quizApi.js` mapping and validation rules.
4. Write the team-authored fallback file for each topic.
5. Run the validation checklist against every pinned quiz.

If these five steps are complete, the QuizAPI integration is in a solid state.
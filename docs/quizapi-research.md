# QuizAPI Research and Validation

**Implementation.** Each topic is served by **one** selected QuizAPI quiz, pinned
by `quiz_id`. A session fetches that quiz with `limit=10`. 
The fallback file for a topic is a copy of that same quiz.

---

## 1. Setup

Postman environment `QuizAPI`: `base_url` = `https://quizapi.io/api/v1`,
`api_key` = your key (secret). Set Bearer auth once at collection level with
`{{api_key}}` so every request inherits it.

**Select the `QuizAPI` environment before sending anything.** With "No
environment" chosen, `{{base_url}}` and `{{api_key}}` resolve to empty and
requests fail in ways that look like API errors.

---

## 2. Endpoints

| Endpoint | Auth | App uses | Purpose |
| --- | --- | --- | --- |
| `GET /categories` | no | no | Category slugs, discovery only |
| `GET /questions` | yes | **yes** | The only runtime call |
| `GET /quizzes` | yes | no | Discover ids, titles, and `questionCount` |

---

## 3. Parameters

Sent on every runtime request:

| Parameter | Value | Why |
| --- | --- | --- |
| `quiz_id` | the topic's quiz | Serves the reviewed quiz for that topic; fetching by category gives no control over language or quality |
| `include_answers` | `true` | Required for answer text and correctness |
| `type` | `MULTIPLE_CHOICE` | Internal format has one `correctAnswer` string |
| `limit` | `10` | Every returned question is used, so this *is* session size |

---

## 4. Requirements Traced to Project Docs

| Requirement | Source | Consequence |
| --- | --- | --- |
| `correctAnswer` is one string | `architecture.md` question format | `type=MULTIPLE_CHOICE`; reject zero or multiple correct answers |
| `answers` are plain strings | same | Map `answers[].text` |
| Validation compares values, not indexes | `architecture.md` answer randomization | Answer text must be unique within a question |
| `explanation` required, message if absent | `architecture.md`, `PRD.md` | `include_answers=true`; coverage is a selection criterion |
| All returned questions used, none trimmed | `architecture.md`, `PRD.md` | `limit` sets session length |
| Retake reloads the topic's questions | `architecture.md` retake flow | Same quiz, same 10 questions; only question and answer order differ |
| Handle failure, empty, invalid data | `architecture.md` error handling | Plus a dead pinned quiz (section 6) |

---

## 5. Response Shape

```json
{ "success": true, "data": [ /* questions */ ], "meta": { /* pagination */ } }
```

Question: `id, text, answers, explanation`
Answer: `id, text, isCorrect` (boolean)

`include_answers=true` is what causes `answers` to be returned at all; without
it there is no answer text and no `isCorrect`.

| Internal | Source |
| --- | --- |
| `id` | `id` |
| `question` | `text` |
| `answers` | `answers[].text` |
| `correctAnswer` | `answers.find(a => a.isCorrect).text` — reject unless exactly one |
| `explanation` | `explanation`, or the standard message when empty, the API returns `""`, not `null`, so test for falsiness rather than null |

`meta` is pagination for the response, not a property of the quiz: `total`
counts everything matching the filter, `limit` is the page size, `offset` the
starting position. A quiz's own size is `questionCount` on the quiz object
returned by `/quizzes`.

Three outcomes the service must tell apart:

| Outcome | Response |
| --- | --- |
| Questions found | `200`, `success: true`, populated `data` |
| Nothing matched | `200`, `success: true`, `data: []`, `meta.total: 0` |
| Unresolvable quiz id | `404`, `success: false`, `error: "Quiz not found"` |

An empty result is a **transport success and an application failure**:
`response.ok` is true and nothing throws, so the service must detect it by
inspecting `data` rather than by status, then route it to the fallback path
like any other unusable response. `404` means the pinned id is dead and the
registry needs fixing; `data: []` means the quiz exists but yielded nothing,
most likely `type=MULTIPLE_CHOICE` excluding everything — a selection miss.

---

## 6. Quiz Selection

### Config

One quiz id per topic:

```js
html:       '<team-authored-quiz-id>',
css:        '<quiz-id>',
javascript: '<quiz-id>',
typescript: '<quiz-id>',
react:      '<quiz-id>',
python:     '<quiz-id>',
```

There is no `html` category on QuizAPI and public HTML content is thin, so HTML
is served by a quiz the team authored. The other five come from public quizzes.

### Registry

| Topic | `quiz_id` | Title | Questions | Date of selection |
| --- | --- | --- | --- | --- |
| `html` | | *team-authored* | | |
| `css` | | | | |
| `javascript` | | | | |
| `typescript` | | | | |
| `react` | | | | |
| `python` | | | | |

### Selection criteria

- [ ] At least 10 questions
- [ ] English throughout
- [ ] All `MULTIPLE_CHOICE`, exactly one `isCorrect` per question
- [ ] No duplicate answer text within a question
- [ ] No position-dependent answers — "All of the above", "None of the above",
      "Both A and C". Answer order is randomized, so these become incoherent
- [ ] Explanations on most questions
- [ ] Factually correct on a skim

With one quiz per topic these are not preferences — a quiz failing any of them
breaks that topic outright, with no sibling to fall back to.

### Discovery

`GET /quizzes?category=<slug>&limit=50` for ids, titles, and `questionCount`.
Discard anything under 10 questions, then read the remainder with
`GET /questions?quiz_id=<id>&include_answers=true&limit=10` and apply the
criteria. Record the chosen quiz above.

Quizzes on the platform hold 10 questions, which matches the session size
exactly. The request returns the whole quiz and nothing is left unused.

### Language

Language is a property of the quiz, not a request option. There is no
`language`, `lang`, or `locale` parameter. At least one non-English quiz exists
(`Javascript Quiz`, `cmpqioi8p04tbqxutobezhcgb`, 5 questions, Indonesian), and
it passed QuizAPI's `approved` moderation, so that step does not screen
language. Reading a quiz before pinning it is the only safeguard.

### Maintenance

Pinned ids rot: owners can edit, unpublish, or delete quizzes. With one quiz
per topic there is no redundancy: if a pinned quiz dies, that topic serves
bundled fallback until someone picks a replacement. Re-verify the registry
periodically, and re-capture a fallback file when the quiz it was copied from
changes.

---

## 7. Session

1. User selects a topic; the app looks up that topic's `quiz_id`.
2. `?quiz_id=<id>&include_answers=true&type=MULTIPLE_CHOICE&limit=10`
3. All returned questions become the session, with question order and answer
   order shuffled in the UI layer.

**Retake.** The same quiz is refetched and reshuffled, so a retake presents the
same questions in a different sequence — exactly what `PRD.md` describes under
Question Randomization. Serving different questions on retake would require
more than one quiz per topic.

**Failure.** If the request fails, returns empty, or returns a short set, the
topic falls back to its bundled questions. There is no sibling quiz to try.

---

## 8. Fallback Content

The fallback exists so a quiz can still start when the API is unusable. Each
topic's file is a copy of that topic's pinned quiz, so online and offline
content are identical by construction.

`src/data/fallbackQuestions/<topic>.js`, a flat array in the internal format of
section 5, plus the `index.js` lookup `architecture.md` specifies:

```js
// Source: quiz <id> "<title>", captured YYYY-MM-DD
export default [ /* 10 questions */ ];
```

Capture with the runtime request, so the copy matches what the app would have
served:

`GET /questions?quiz_id=<id>&include_answers=true&type=MULTIPLE_CHOICE&limit=10`

Copy the captured JSON into the structure by hand, following the internal
question format. Sixty questions across six files is a one-off pass, and
reading each question while placing it doubles as a content review. The runtime
mapping stays inside `quizApi.js`, where `architecture.md` assigns it.

**Verify once written.** Reshaping `answers: [{text, isCorrect}]` into plain
strings plus a separate `correctAnswer` fails silently — a mistyped correct
answer scores that question wrong forever and nothing errors. Check that every
question has:

- a `correctAnswer` string exactly matching one entry in its `answers`
- no duplicate entries in `answers`
- non-empty `id`, `question`, and `explanation`

The same assertions apply to API responses at runtime, so this is validation
`quizApi.js` needs anyway.


---

## 9. Validation

Runtime request, run against each pinned quiz:

`{{base_url}}/questions?quiz_id=<id>&include_answers=true&type=MULTIPLE_CHOICE&limit=10`

Edge cases, each a variation of that request:

| Case | Request |
| --- | --- |
| Auth failure | same request, `Authorization` disabled — expect `401` |
| Unknown quiz id | `?quiz_id=nonexistent&limit=10` |
| Rate limit | send the runtime request repeatedly; record any throttling |

- [ ] Each pinned quiz returns `200` with exactly 10 questions
- [ ] Every question `MULTIPLE_CHOICE`, exactly one correct answer
- [ ] No duplicate answer text within a question
- [ ] Explanation present, or the fallback message path exercised
- [ ] Auth failure returns `401`
- [x] Unknown quiz id returns `404` with `success: false` (section 5)
- [ ] Nullable fields recorded below
- [ ] Rate limits checked
- [ ] HTML quiz readable with a key that did not create it — only published
      **and approved** quizzes are visible to other keys, and the owner sees
      their own either way, so testing with the creating key proves nothing

### Recorded results

```json
![alt text](image.png)
```
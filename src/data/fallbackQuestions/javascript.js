// Sourced from quizapi.io (quiz_id in src/data/quizTopics.js).
// Used when the live API call fails.
const jsQuestions = [
  {
    id: 'javascript-1',
    question: "A click handler calls an async function but does not use `await`. What happens to the returned promise?",
    answers: [
      "The function is skipped until the next click",
      "The promise is created and ignored by the caller",
      "The browser blocks rendering until it settles",
      "The promise is automatically retried on failure",
    ],
    correctAnswer: "The promise is created and ignored by the caller",
    explanation: "Calling an async function always returns a promise. If the caller does not await or return it, the work still starts, but errors can become unhandled rejections."
  },
  {
    id: 'javascript-2',
    question: "In browser JavaScript, which queue is usually drained before the next rendering opportunity after the current call stack finishes?",
    answers: [
      "The animation frame callback list",
      "The network request queue",
      "The microtask queue",
      "The idle callback queue",
    ],
    correctAnswer: "The microtask queue",
    explanation: "Promise callbacks run as microtasks, and the microtask queue is drained before the browser moves on to rendering and later macrotasks. A long chain of microtasks can delay paint."
  },
  {
    id: 'javascript-3',
    question: "A developer writes `items.forEach(async item => await save(item))` and expects the outer function to wait for all saves. What is the issue?",
    answers: [
      "`forEach` ignores the returned promises from the async callback",
      "`await` cannot be used inside arrow functions",
      "Async callbacks always run in reverse order",
      "The saves run only after a page reload",
    ],
    correctAnswer: "`forEach` ignores the returned promises from the async callback",
    explanation: "`forEach` does not await the promises returned by its callback. Use `for...of` for sequential work or `Promise.all(items.map(...))` for concurrent work."
  },
  {
    id: 'javascript-4',
    question: "A search box fires `fetch` on every keypress. Older responses sometimes overwrite newer results. Which fix targets the race most directly?",
    answers: [
      "Wrap every fetch in `setTimeout(..., 0)`",
      "Convert every response to text before JSON",
      "Move the fetch call outside the event handler",
      "Abort or ignore stale requests before updating the UI",
    ],
    correctAnswer: "Abort or ignore stale requests before updating the UI",
    explanation: "Request order and response order can differ. Aborting stale requests or checking a request id before updating state prevents older work from winning the UI."
  },
  {
    id: 'javascript-5',
    question: "`Promise.all([a(), b(), c()])` rejects. Which statement is correct?",
    answers: [
      "It waits for all promises and returns only the rejected ones",
      "It rejects when the first input promise rejects",
      "It converts every rejection into `undefined`",
      "It cancels all remaining promises by default",
    ],
    correctAnswer: "It rejects when the first input promise rejects",
    explanation: "`Promise.all` rejects as soon as one input rejects, using that rejection reason. The other async operations are not automatically canceled unless they support cancellation and you trigger it."
  },
  {
    id: 'javascript-6',
    question: "A component needs to show three independent dashboard widgets as soon as each finishes loading. Which promise helper is often a better fit than `Promise.all`?",
    answers: [
      "`Promise.race`, because it returns every result in finish order",
      "`Promise.resolve`, because it retries failed work",
      "`Promise.allSettled`, because each result keeps its own status",
      "`queueMicrotask`, because it stores network responses",
    ],
    correctAnswer: "`Promise.allSettled`, because each result keeps its own status",
    explanation: "`Promise.allSettled` lets you inspect every fulfillment or rejection after all inputs settle. It is useful when one failure should not hide every other result."
  },
  {
    id: 'javascript-7',
    question: "A long async loop uses `await Promise.resolve()` inside every iteration to keep the UI responsive, but the page still feels frozen. Why can that happen?",
    answers: [
      "Microtasks can run before rendering, so the loop may still starve paint",
      "Promises always run on a separate CPU thread",
      "`await` disables browser painting until page unload",
      "Resolved promises are illegal inside loops",
    ],
    correctAnswer: "Microtasks can run before rendering, so the loop may still starve paint",
    explanation: "Awaiting an already resolved promise yields to the microtask queue, not necessarily to rendering. Yielding with a timer or another task boundary can give the browser a paint opportunity."
  },
  {
    id: 'javascript-8',
    question: "Inside an async function, a `try` block starts `const p = fetch(url)` and later awaits `p`. Where should a network rejection be caught?",
    answers: [
      "Only around the `const p = fetch(url)` line",
      "Only in a global `window.onerror` handler",
      "Only inside the server response body",
      "Around the `await p` expression or with `p.catch(...)`",
    ],
    correctAnswer: "Around the `await p` expression or with `p.catch(...)`",
    explanation: "The rejection is observed at the await point. A `try...catch` must cover the `await` or handle the promise with `.catch()`."
  },
  {
    id: 'javascript-9',
    question: "A helper returns `fetch(url).then(r => r.json())`. What common misconception can cause bad error handling here?",
    answers: [
      "`r.json()` always returns plain text",
      "`fetch` does not reject for HTTP 404 or 500 responses by default",
      "A promise chain cannot throw from JSON parsing",
      "The browser caches every failed request forever",
    ],
    correctAnswer: "`fetch` does not reject for HTTP 404 or 500 responses by default",
    explanation: "Fetch rejects on network failures, but HTTP error statuses still resolve to a Response object. Code usually needs to check `response.ok` before parsing or returning data."
  },
  {
    id: 'javascript-10',
    question: "A frontend interview asks why `setTimeout(fn, 0)` is not a guarantee that `fn` runs immediately after the current line. Which answer is best?",
    answers: [
      "Zero-delay timers are syntax errors in modern browsers",
      "Timer callbacks run before promise callbacks by definition",
      "The callback waits for the stack, microtasks, and scheduler timing",
      "The callback is inserted directly into the current call stack",
    ],
    correctAnswer: "The callback waits for the stack, microtasks, and scheduler timing",
    explanation: "A timer callback is queued as a task after the current stack and pending microtasks. Browser scheduling, timer clamping, and other tasks can delay it."
  },
];

export default jsQuestions;

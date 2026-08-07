# QuizScreen Loading Flow

This diagram describes how `QuizScreen` loads, validates, and prepares questions before starting the quiz timer.

```mermaid
flowchart TD
    LOAD_START[Set isLoading to true<br/>Clear previous questions and errors] --> SHOW_LOADING[Show loader and Return Home action<br/>Keep timer stopped]
    SHOW_LOADING --> FETCH_API[Fetch questions from QuizAPI for selected topic]
    SHOW_LOADING -- Return Home --> CANCEL_LOADING[Unmount QuizScreen<br/>Abort active API request]
    CANCEL_LOADING --> END_CANCELLED([Return Home])

    FETCH_API -- Response received --> MAP_API[Map API questions into the internal format]
    FETCH_API -- Request failed --> LOAD_FALLBACK
    MAP_API --> VALIDATE_API[Normalize and validate the complete API set]
    VALIDATE_API --> API_READY{All API questions valid and<br/>at least MIN_QUESTIONS available?}
    API_READY -- Yes --> USE_API[Use API question set]
    API_READY -- No --> LOAD_FALLBACK[Load bundled fallback questions for selected topic]

    LOAD_FALLBACK --> VALIDATE_FALLBACK[Normalize and validate the complete fallback set]
    VALIDATE_FALLBACK --> FALLBACK_READY{All fallback questions valid and<br/>at least MIN_QUESTIONS available?}
    FALLBACK_READY -- No --> LOAD_ERROR[Set error<br/>Set isLoading to false<br/>Allow user to return Home<br/>Do not start timer]
    FALLBACK_READY -- Yes --> USE_FALLBACK[Use fallback question set]

    USE_API --> SHUFFLE_QUESTIONS[Randomize question order]
    USE_FALLBACK --> SHUFFLE_QUESTIONS
    SHUFFLE_QUESTIONS --> SELECT_QUESTIONS[Select QUESTIONS_PER_QUIZ questions]
    SELECT_QUESTIONS --> SHUFFLE_ANSWERS[Randomize answer options for each selected question]
    SHUFFLE_ANSWERS --> MIN_LOADING_TIME[If needed, wait until MIN_LOADING_DISPLAY_MS has elapsed]
    MIN_LOADING_TIME --> ABORTED{Request aborted?}
    ABORTED -- Yes --> END_CANCELLED
    ABORTED -- No --> STORE_QUESTIONS[Store questions in QuizScreen state<br/>Set totalQuestions in App state]
    STORE_QUESTIONS --> LOAD_SUCCESS[Set isLoading to false]
    LOAD_SUCCESS --> START_TIMER[Start global timer]
    START_TIMER --> READY([Display first question])
```

For the complete user journey, see the [Quiz App user flow](./mermaid.md).

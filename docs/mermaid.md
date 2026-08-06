# DevQuiz User Flow

```mermaid
flowchart TD
    A([App start]) --> B[Show Home Screen]
    B --> C{Topic selected?}
    C -- No --> B
    C -- Yes --> D[Enable Start Quiz button]
    D --> E[User clicks Start Quiz]
    E --> F[App state switches to Quiz Screen]
    F --> G[Fetch questions from QuizAPI for selected topic]
    G --> H{Valid API questions loaded?}
    H -- Yes --> I[Normalize question data]
    H -- No --> J[Load bundled fallback/mock questions for selected topic]
    J --> K{Fallback questions available?}
    K -- No --> L[Show error state<br/>Allow user to return Home<br/>Do not start timer]
    K -- Yes --> M[Use fallback/mock question set]
    I --> N[Randomize question order]
    M --> N
    N --> O[Randomize answer options for each question]
    O --> P[Store questions in QuizScreen state<br/>Set totalQuestions in App state]
    P --> Q[Start global timer]
    Q --> R[Display first question<br/>Next Question disabled]

    R --> S{Timer expired?}
    S -- Yes --> T[Set quizStatus to expired<br/>Count unanswered as incorrect<br/>Force Results Screen]
    S -- No --> U[Display current question and answer options]

    U --> V{User clicks Exit Quiz?}
    V -- Yes --> W[Open exit confirmation modal<br/>Timer keeps running]
    W --> X{Exit confirmed?}
    X -- No --> Y[Close modal and continue quiz]
    Y --> S
    X -- Yes --> Z[Reset quiz session state<br/>Clear selected topic<br/>Reset score<br/>Return Home Screen]
    Z --> B
    V -- No --> AA[User selects one answer]

    AA --> AB[Immediately validate answer]
    AB --> AC{Answer correct?}
    AC -- Yes --> AD[Highlight selected answer as correct<br/>Increment score<br/>Show positive feedback]
    AC -- No --> AE[Highlight selected answer as incorrect<br/>Reveal correct answer<br/>Show incorrect feedback]
    AD --> AF[Display explanation<br/>Lock answers<br/>Enable Next Question]
    AE --> AF
    AF --> AG{Timer expired before next action?}
    AG -- Yes --> T
    AG -- No --> AH[User clicks Next Question]
    AH --> AI[Reset local question state<br/>Clear selectedAnswer<br/>Clear hasAnswered<br/>Hide feedback and explanation]
    AI --> AJ{Last question?}
    AJ -- No --> AK[Increment currentQuestionIndex]
    AK --> S
    AJ -- Yes --> AL[Set quizStatus to completed<br/>Move to Results Screen]

    T --> AM[Display Results Screen]
    AL --> AM
    AM --> AN{Results state}
    AN -- Completed quiz --> AO[Show final score<br/>Show completed status message<br/>Show performance feedback]
    AN -- Timer expired --> AP[Show final score<br/>Show time expired status message<br/>Show performance feedback]
    AO --> AQ{User action}
    AP --> AQ
    AQ -- Return Home --> AR[Reset app state<br/>Clear selected topic<br/>Reset score and totals<br/>Set quizStatus to null<br/>Return Home Screen]
    AQ -- Retake Quiz --> AS[Reset session state for same topic<br/>Reset score and totals<br/>Set quizStatus to null<br/>Switch to Quiz Screen]
    AR --> B
    AS --> F
```

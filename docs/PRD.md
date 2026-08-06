# DEVQUIZ - PRODUCT REQUIREMENTS

## GOAL
Create a programming quiz application where users can practice programming concepts through topic-specific quizzes.

The application should be simple, responsive, and easy to use without requiring authentication.

---

## TARGET USERS

- Beginner developers
- Programming students
- Self-taught learners

---

## CORE FEATURES

### QUIZ SELECTION
Users can select a programming topic before starting a quiz.

Initial categories:

- HTML
- CSS
- JavaScript
- React
- Python
- TypeScript

Questions are fetched from QuizAPI based on the selected category when available.
If the API is unavailable, returns an error, or provides no valid questions, the app falls back to bundled mock questions for that topic so the quiz can still start normally.

### QUIZ FLOW

- User selects a quiz topic.
- User starts the quiz.
- A global countdown timer starts after valid questions are ready.
- Questions are displayed one at a time.
- User selects an answer.
- The answer is immediately validated.
- If the answer is correct:
    - Selected answer turns green.
    - A positive feedback message appears.
- If the answer is incorrect:
    - Selected answer turns red.
    - Correct answer turns green.
    - An error feedback message appears.
- A brief explanation is displayed below the feedback message.
- The Next Question button becomes enabled.
- The user clicks Next Question to continue.
- The process repeats until all questions are answered or the timer reaches zero.
- Questions are randomized when the quiz starts.
- Answer options are randomized before being displayed.


### GLOBAL TIMER

- A single countdown timer applies to the entire quiz.
- The timer starts when the quiz begins with either API questions or fallback/mock questions.
- The timer remains visible during the quiz.
- A progress bar is linked to the timer and represents the remaining quiz time.
- As time decreases, the progress bar decreases.
- If the user completes all questions before the timer expires, the quiz ends normally.
- If the timer reaches zero before the quiz is completed, the quiz ends immediately.
- All unanswered questions are counted as incorrect.
- The user is automatically redirected to the Results screen.
- The timer continues running while confirmation modals are open.

### ANSWER RULES

- Only one answer can be selected per question.
- Questions are answered sequentially.
- Answers are locked after validation.
- Previous questions cannot be revisited.
- Answers cannot be edited after validation.

### QUIZ FEEDBACK

After submitting an answer:

Correct Answer

- Selected answer turns green.
- Positive feedback message appears.
- Brief explanation is displayed.

Examples:
- Correct!
- Great answer!
- Well done!

Incorrect Answer

- Selected answer turns red.
- Correct answer turns green.
- Error feedback message appears.
- Brief explanation is displayed.

Examples:
- Incorrect answer.
- Not quite.
- Good try.

Feedback messages appear above the explanation.

### QUESTION EXPLANATIONS

Each question includes a short and straightforward explanation displayed after answer validation.

Explanation behavior:

- The explanation is shown after the user answers the question.
- The same explanation is displayed whether the user answers correctly or incorrectly.
- The explanation appears below the feedback message and below the answer options.
- The explanation remains visible until the user moves to the next question.

Purpose:

- Reinforce learning
- Explain why the answer is correct
- Provide additional context when relevant

### QUESTION RANDOMIZATION

- All questions returned for the selected quiz are included in the quiz session.
- Questions are displayed in a random order each time the quiz starts.
- No questions are removed or replaced during the session.
- Starting the same quiz again may present the same questions in a different sequence.

### ANSWER RANDOMIZATION

- Answer options are displayed in a random order each time a question is shown.
- The position of the correct answer is not fixed.
- Randomization applies independently to each question.
- The correct answer remains associated with the same option regardless of its displayed position.


### RESULTS

After completing the quiz:

- Final score is shown (example: 7/10)
- A performance message is displayed based on the score achieved (e.g. Great job! - Nice progress, keep practicing! - You should review the basics a bit more.)
- The screen may display a different status message depending on how the quiz ended:
  - Quiz completed (e.g. Quiz completed!)
  - Time expired (e.g. Time's up!)
- The Results screen includes a Retake Quiz button that starts a new quiz session for the same topic without returning to Home
  

## SCREENS

### HOME SCREEN

- App logo/title
- Welcome message and/or brief app explanation
- Quiz topic selector
- Start quiz button

The Start Quiz button is disabled by default and becomes enabled once the user selects a quiz topic.

### QUIZ SCREEN

- Quiz title
- Global countdown timer
- Timer progress bar
- Question indicator (Example: Question 4 of 10)
- Current question
- Answer options
- Feedback message
- Question explanation
- Next Question button
- Exit Quiz button

The quiz does not include a Submit button.

Selecting an answer automatically validates it and displays feedback.

The Next Question button is disabled when a question first loads.

After an answer is validated:
- Feedback message appears
- Explanation appears
- Answer options become locked
- Next Question becomes enabled

### EXIT QUIZ

When the user clicks Exit Quiz:

A confirmation modal appears.

The global timer continues running while the modal is open.

"Are you sure you want to leave the quiz?
Your current progress will be lost."

Options:

- Continue Quiz
- Exit Quiz

If confirmed:

- Quiz state is reset
- User returns to the Home screen

### RESULTS SCREEN

- Circular score gauge showing the final score (example: 7/10)
- Final score
- Quiz status message
- Feedback message
- Return Home button
- Retake Quiz button

---

## TECHNICAL SCOPE

### FRONTEND

- React
- JavaScript
- CSS
- Vite
- Node.js
- Vercel Functions

### API

- QuizAPI
- React frontend calls a local /api/* endpoint
- Node.js Vercel Function backend proxy requests questions from QuizAPI and returns the response to the frontend
- Vercel Function securely reads QUIZ_API_KEY from environment variables
- QuizAPI key is never exposed to browser code
- Bundled fallback/mock questions are used when QuizAPI is unavailable or returns unusable data

### STATE MANAGEMENT
React state manages:

- selectedTopic
- questions
- currentQuestionIndex
- score
- remainingTime
- quizStatus
- totalQuestions

---

## MVP SCOPE

### INCLUDED

- Topic selection
- QuizAPI integration
- Fallback/mock question support for API failure, API errors, and empty invalid responses
- One-question-at-a-time flow
- Global quiz timer
- Timer progress bar
- Immediate answer validation
- Locked answers
- Correct/incorrect visual feedback
- Question explanations
- Exit quiz functionality
- Retake Quiz from the Results screen
- Score calculation
- Results screen
- Responsive design

### NOT INCLUDED

- Authentication
- Database
- Saved scores
- Local storage
- Leaderboards
- Difficulty levels
- Multiplayer


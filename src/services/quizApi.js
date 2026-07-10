

export async function fetchQuizQuestions() {
  const res = await fetch("https://quizapi.io/api/v1/questions?quiz_id=cmrfg1u8c0grjfbutigvbsp7f&include_answers=true", {
    headers: { "X-API-Key": import.meta.env.VITE_QUIZ_API_KEY },
  });
  if (!res.ok) {
    throw new Error(`QuizAPI request failed: ${res.status} ${res.statusText}`);
  }
  const questions = await res.json();
  return questions;
}
